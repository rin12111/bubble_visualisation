import { animated, useSpring } from '@react-spring/web'
import React from 'react';
import { ANIMATION_TYPE, TRANSITION_DURATION } from '../../../contants';

function Node({ highlight, number, type }) {
    const style = { config: { duration: TRANSITION_DURATION } };

    if (type === ANIMATION_TYPE.MOVE_LEFT){
        style.from = {
            y: 0, x: 0
        };
        style.to = [
            { y: 60 },
            { x: -60 },
            { y: 0 }
        ];
    }else if (type === ANIMATION_TYPE.MOVE_RIGHT) {
        style.from = {
            y: 0, x: 0
        };
        style.to = [
            { y: -60 },
            { x: 60 },
            { y: 0 }
        ];
    }else if (type === ANIMATION_TYPE.FLASHING){
        style.from = {
            opacity: 0
        };
        style.to = [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
        ];
    }

    const styles = useSpring(style);
    const className = highlight ? 'number-node-orange' : (type !== ANIMATION_TYPE.NONE ? 'number-node-green' : 'number-node');
    return (
        <>
            <animated.div className={className} style={styles}>
                {number}
            </animated.div>
        </>
    );
}

export default Node;
