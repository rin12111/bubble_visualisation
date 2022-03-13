import Node from './Node'
import React from 'react';
import { v4 } from 'uuid';
import { ANIMATION_TYPE, TRANSITION_DURATION } from '../../contants';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const NONE_INDEX = -2;

function InsertionSortContainer({ dataSource, sorting, reloading, step }) {
  const [bState, setBState] = React.useState({
    swapIndex: NONE_INDEX,
    traversePos: NONE_INDEX,
    currentPos: 0,
    step: 0,
  });

  React.useEffect(() => {
    setBState({
        swapIndex: NONE_INDEX,
        traversePos: NONE_INDEX,
        currentPos: 0,
        step: 0
    })
  }, [dataSource]);

  const renderNodes = () => {
    if (reloading) { return; }
    return dataSource.map((num, index) => {
      let type = ANIMATION_TYPE.NONE;
      let distance = 1;
      if (bState.swapIndex !== NONE_INDEX){
        if (index >= bState.swapIndex && index < bState.currentPos){
          type = ANIMATION_TYPE.MOVE_RIGHT;
        }else if (index === bState.currentPos) {
          type = ANIMATION_TYPE.MOVE_LEFT;
          distance = bState.currentPos - bState.swapIndex;
        }
      }else {
        if (bState.traversePos !== NONE_INDEX){
          if (index > bState.traversePos && index < bState.currentPos){
            type = ANIMATION_TYPE.SELECTING;
          }else if (index === bState.traversePos) {
            type = ANIMATION_TYPE.FLASHING;
          }
        }
      }
      return <Node key={v4()} number={num} type={type} selected={index === bState.currentPos} highlight={index <= bState.currentPos} distance={distance} />
    })
  }

  React.useEffect(() => {
    if (!sorting && (!step || step === bState.step)){ return; }
    if (bState.currentPos >= dataSource.length) { return; }
    const index = bState.currentPos;
    const traversePos = bState.traversePos === NONE_INDEX ? index - 1 : bState.traversePos - 1;
    if (traversePos < 0 || dataSource[traversePos] < dataSource[index]){
      const distance = index - traversePos - 1;
      if (distance >= 1){
        setBState({
          ...bState,
          swapIndex: traversePos + 1,
        });
        setTimeout(() => {
          const temp = dataSource[index];
          for (let i = index; i >= traversePos + 1 ; i--){
            dataSource[i] = dataSource[i-1];
          }
          dataSource[traversePos + 1] = temp;
          setBState({
            ...bState,
            currentPos: bState.currentPos + 1,
            swapIndex: NONE_INDEX,
            traversePos: NONE_INDEX,
            step: step
          })
        }, TRANSITION_DURATION * 3);
      }else if (bState.currentPos + 1 < dataSource.length) {
        setTimeout(() => {
          setBState({
            ...bState,
            currentPos: bState.currentPos + 1,
            traversePos: NONE_INDEX,
            step: step
          });
        }, TRANSITION_DURATION * 3);
      }
    }else {
      setTimeout(() => {
        setBState({
          ...bState,
          traversePos,
          step: step
        });
      }, TRANSITION_DURATION * 3);
    }
  }, [bState.currentPos, bState.traversePos, sorting, step]);

  return (
    <div className='wrapper'>
      <div className='container'>
        {renderNodes()}
      </div>
      {reloading && <LoadingIndicator />}
    </div>
  );
}

export default InsertionSortContainer;