import './App.css';
import NumberNode from './components/NumberNode'
import React from 'react';
import { ANIMATION_TYPE } from './contants';

const bigState = {
  finished: false,
  swapIndex: -2,
  currentPos: 0,
  perFormSwap: false
}

function Container({ dataSource }) {
  const [bState, setBState] = React.useState({
    ...bigState,
    numbers: dataSource,
    lockIndex: dataSource.length
  })

  const renderNodes = () => {
    return bState.numbers.map((num, index) => {
      let type = ANIMATION_TYPE.NONE;
      if (index === bState.swapIndex){
        type = ANIMATION_TYPE.MOVE_RIGHT;
      }else if (index === bState.swapIndex + 1) {
        type = ANIMATION_TYPE.MOVE_LEFT;
      }
      const key = Math.floor(Math.random() * 10e6);
      return <NumberNode key={key} number={num} type={type} lock={index >= bState.lockIndex} />
    })
  }

  const sortProcess = () => {
    for (let i = bState.currentPos ; i < bState.lockIndex - 1 ; i++){
      if (bState.numbers[i] > bState.numbers[i + 1]){
        setBState({
          ...bState,
          swapIndex: i
        })
        setTimeout(() => {
          const temp = bState.numbers[i];
          bState.numbers[i] = bState.numbers[i + 1];
          bState.numbers[i + 1] = temp;
          setBState({
            ...bState,
            swapIndex: -2,
            numbers: [...bState.numbers],
            perFormSwap: !bState.perFormSwap,
            currentPos: i
          })
        }, 750);
        return;
      }
    }
    bState.lockIndex -= 1;
    if (bState.lockIndex > 0){
      bState.currentPos = 0;
      bState.perFormSwap = !bState.perFormSwap;
    }
    setBState({
      ...bState
    })
  }

  React.useEffect(() => {
    sortProcess();
  }, [bState.perFormSwap]);

  return (
    <div className='container'>
      {renderNodes()}
    </div>
  );
}

export default Container;