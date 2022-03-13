import { animated, useSpring } from '@react-spring/web'
import React from 'react';
import { ANIMATION_TYPE, TRANSITION_DURATION } from '../../../contants';

const NODE_WIDTH = 50;
const MARGIN_LEFT = 10;

function Node({ selected, highlight, number, type, distance }) {
    let style = { config: { duration: TRANSITION_DURATION } };

    if (type === ANIMATION_TYPE.MOVE_LEFT){
        style.from = {
            y: 0, x: 0
        };
        style.to = [
            { y: 60 },
            { x: -(NODE_WIDTH + MARGIN_LEFT) * distance },
            { y: 0 }
        ];
    }else if (type === ANIMATION_TYPE.MOVE_RIGHT) {
        style.from = {
            y: 0, x: 0
        };
        style.to = [
            { x: (NODE_WIDTH + MARGIN_LEFT) * distance },
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
    let className = 'number-node';
    if (selected){
        className = 'number-node-red';
    }else if (type === ANIMATION_TYPE.SELECTING || type === ANIMATION_TYPE.FLASHING || type === ANIMATION_TYPE.MOVE_RIGHT){
        className = 'number-node-green';
    }else if (highlight){
        className = 'number-node-orange';
    }
    return (
        <>
            <animated.div className={className} style={styles}>
                {number}
            </animated.div>
        </>
    );
}

export default Node;
