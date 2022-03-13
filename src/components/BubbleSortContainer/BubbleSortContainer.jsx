import Node from './Node'
import React from 'react';
import { v4 } from 'uuid';
import { ANIMATION_TYPE, TRANSITION_DURATION } from '../../contants';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { limiter } from '../../util';

const NONE_SWAP_INDEX = -2;
const initialState = {
  swapIndex: NONE_SWAP_INDEX,
  currentPos: 0,
  step: 0,
}

function BubbleSortContainer({ dataSource, sorting, reloading, step }) {
  const [bState, setBState] = React.useState({
    ...initialState,
    lockIndex: dataSource.length,
  });

  //Reset main state when data source change.
  React.useEffect(() => {
    setBState({
      ...initialState,
      lockIndex: dataSource.length,
    })
  }, [dataSource]);

  const renderNodes = () => {
    if (reloading) { return; }
    return dataSource.map((num, index) => {
      let type = ANIMATION_TYPE.NONE;
      if (index === bState.swapIndex){
        type = ANIMATION_TYPE.MOVE_RIGHT;
      }else if (index === bState.swapIndex + 1) {
        type = ANIMATION_TYPE.MOVE_LEFT;
      }else if ((index === bState.currentPos || index === bState.currentPos + 1) && bState.lockIndex > 0 && index < bState.lockIndex){
        type = sorting || bState.step !== step ? ANIMATION_TYPE.FLASHING : ANIMATION_TYPE.SELECTING;
      }
      
      return <Node key={v4()} number={num} type={type} highlight={index >= bState.lockIndex} />
    })
  }

  // Sorting process
  React.useEffect(() => {
    if (!sorting && (!step || step === bState.step)){ return; }
    
    const index = bState.currentPos;
    if (dataSource[index] > dataSource[index + 1]){
      //Found a node that need to swap

      //Trigger change swapIndex state to apply animation for current nodes
      setBState({
        ...bState,
        swapIndex: index,
      })

      //Shift to next number node when swap animation stop.
      limiter(() => {
        const temp = dataSource[index];
        dataSource[index] = dataSource[index + 1];
        dataSource[index + 1] = temp;
        setBState({
          ...bState,
          swapIndex: NONE_SWAP_INDEX,
          currentPos: index + 1,
          step: step
        })
      });
    }else if (index + 1 < bState.lockIndex){
      //Found a node that doesn't need to swap.

      //Shift to next number node when flashing animation stop.
      limiter(() => {
        setBState({
          ...bState,
          currentPos: index + 1,
          step: step
        })
      });
    }else {
      //Reach the end of the loop

      //Shift to next number node when flashing animation stop.
      limiter(() => {
        bState.lockIndex -= 1;

        //Validate if the array has sorted completely
        if (bState.lockIndex > 0){
          bState.currentPos = 0;
        }
        setBState({
          ...bState,
          step: step
        })
      });
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

export default BubbleSortContainer;