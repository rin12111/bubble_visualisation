import './style.css';
import { animated, useSpring } from '@react-spring/web'
import React from 'react';
import { ANIMATION_TYPE } from '../../contants';

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
            config: { duration: 250 }
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
            config: { duration: 250 }
        }
    }
    const styles = useSpring(style);
    const className = lock ? 'number-node-orange' : 'number-node';
    return (
        <>
            <animated.div className={className} style={styles}>
                {number}
            </animated.div>
        </>
    );
}

export default NumberNode;
