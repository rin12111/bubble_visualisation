import React from 'react';
import NodeContainer from './components/NodeContainer';
import './App.css';
import { TRANSITION_DURATION } from './contants';

function App() {
  const [bState, setBState] = React.useState({
    numberOfNode: 15,
    resetCount: 0,
    sorting: false,
    reloading: false,
    step: 0
  });

  const dataSource = React.useMemo(() => {
    const source = [];
    for (let i = 1 ; i <= bState.numberOfNode ; i++) {
      source.push(Math.floor(Math.random() * 200));
    }
    return source;
  }, [bState.numberOfNode, bState.resetCount])

  const startButtonClick = () => {
    if (!bState.sorting){
      setBState({
        ...bState,
        sorting: true
      });
    }else {
      setBState({
        ...bState,
        sorting: false
      });
    }
  }

  const resetButtonClick = () => {
    setBState({
      numberOfNode: bState.numberOfNode,
      resetCount: bState.resetCount,
      sorting: false,
      reloading: true
    });
    setTimeout(() => {
      setBState({
        numberOfNode: bState.numberOfNode,
        resetCount: bState.resetCount + 1,
        sorting: false,
        reloading: false,
        step: 0
      });
    }, TRANSITION_DURATION * 3);
  }

  const stepButtonClick = () => {
    if (bState.sorting) { return; }
    setBState({
      ...bState,
      step: bState.step + 1
    });
  }
  
  return (
    <>
      <NodeContainer dataSource={dataSource} sorting={bState.sorting} reloading={bState.reloading} step={bState.step} />
      <div className='action-view'>
        <input className='button' type="button" value={bState.sorting ? 'Stop': 'Start'} onClick={startButtonClick} />
        <input className='button' type="button" value="Reset" onClick={resetButtonClick} />
        <input className='button' type="button" value="Step" onClick={stepButtonClick} />
      </div>
    </>
  )
}

export default App;
