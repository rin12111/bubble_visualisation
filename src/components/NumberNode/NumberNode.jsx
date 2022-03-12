import './style.css';
import { animated, useSpring } from '@react-spring/web'
import React from 'react';
import { ANIMATION_TYPE, TRANSITION_DURATION } from '../../contants';

function NumberNode({ lock, number, type }) {
    let style = {};

    if (type === ANIMATION_TYPE.MOVE_LEFT){
        style = {
            from: {
              y: 0, x: 0
            },
            to: [
                { y: 60 },
                { x: -60 },
                { y: 0 }
            ],
            config: { duration: TRANSITION_DURATION }
        }
    }else if (type === ANIMATION_TYPE.MOVE_RIGHT) {
        style = {
            from: {
              y: 0, x: 0
            },
            to: [
                { y: -60 },
                { x: 60 },
                { y: 0 }
            ],
            config: { duration: TRANSITION_DURATION }
        }
    }else if (type === ANIMATION_TYPE.FLASHING){
        style = {
            from: {
              opacity: 0
            },
            to: [
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 }
            ],
            config: { duration: TRANSITION_DURATION }
        }
    }
    const styles = useSpring(style);
    const className = lock ? 'number-node-orange' : (type !== ANIMATION_TYPE.NONE ? 'number-node-green' : 'number-node');
    return (
        <>
            <animated.div className={className} style={styles}>
                {number}
            </animated.div>
        </>
    );
}

export default NumberNode;
