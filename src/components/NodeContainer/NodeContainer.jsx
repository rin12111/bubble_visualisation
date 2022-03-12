import './style.css';
import NumberNode from '../NumberNode'
import React from 'react';
import { v4 } from 'uuid';
import { ANIMATION_TYPE, TRANSITION_DURATION } from '../../contants';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const NONE_SWAP_INDEX = -2;

function NodeContainer({ dataSource, sorting, reloading, step }) {
  const [bState, setBState] = React.useState({
    swapIndex: NONE_SWAP_INDEX,
    currentPos: 0,
    numbers: dataSource,
    lockIndex: dataSource.length,
    step: 0,
  });

  React.useEffect(() => {
    setBState({
      swapIndex: NONE_SWAP_INDEX,
      currentPos: 0,
      numbers: dataSource,
      lockIndex: dataSource.length,
      step: 0
    })
  }, [dataSource]);

  const renderNodes = () => {
    if (reloading) { return; }
    return bState.numbers.map((num, index) => {
      let type = ANIMATION_TYPE.NONE;
      if (index === bState.swapIndex){
        type = ANIMATION_TYPE.MOVE_RIGHT;
      }else if (index === bState.swapIndex + 1) {
        type = ANIMATION_TYPE.MOVE_LEFT;
      }else if ((index === bState.currentPos || index === bState.currentPos + 1) && bState.lockIndex > 1){
        type = sorting || bState.step !== step ? ANIMATION_TYPE.FLASHING : ANIMATION_TYPE.SELECTING;
      }
      return <NumberNode key={v4()} number={num} type={type} lock={index >= bState.lockIndex} />
    })
  }

  React.useEffect(() => {
    if (!sorting && (!step || step === bState.step)){ return; }
    const index = bState.currentPos;
    if (bState.numbers[index] > bState.numbers[index + 1]){
      setBState({
        ...bState,
        swapIndex: index,
      })
      setTimeout(() => {
        const temp = bState.numbers[index];
        bState.numbers[index] = bState.numbers[index + 1];
        bState.numbers[index + 1] = temp;
        setBState({
          ...bState,
          swapIndex: NONE_SWAP_INDEX,
          numbers: [...bState.numbers],
          currentPos: index + 1,
          step: step
        })
      }, TRANSITION_DURATION * 3);
    }else if (index + 1 < bState.lockIndex){
      setBState({
        ...bState,
      })
      setTimeout(() => {
        setBState({
          ...bState,
          currentPos: index + 1,
          step: step
        })
      }, TRANSITION_DURATION * 3);
    }else {
      bState.lockIndex -= 1;
      if (bState.lockIndex > 0){
        bState.currentPos = 0;
      }
      setBState({
        ...bState,
        step: step
      })
    }
  }, [bState.currentPos, sorting, step]);

  return (
    <div className='wrapper'>
      <div className='container'>
        {renderNodes()}
      </div>
      {reloading && <LoadingIndicator />}
    </div>
  );
}

export default NodeContainer;