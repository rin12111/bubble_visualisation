import React from 'react';
import BubbleSortContainer from './components/BubbleSortContainer';
import './App.css';
import { TRANSITION_DURATION } from './contants';

const DEFAULT_NUMBER_OF_NODE = 10;
const MININUM_NODE = 5;
const MAXIMUM_NODE = 20;

function App() {
  const [bState, setBState] = React.useState({
    numberOfNode: DEFAULT_NUMBER_OF_NODE,
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

  const timeoutRef = React.useRef(null);
  const processingStep = React.useRef(false);

  const stepButtonClick = () => {
    if (bState.sorting || processingStep.current) { return; }
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); }
    processingStep.current = true;
    timeoutRef.current = setTimeout(() => {
      processingStep.current = false;
    }, TRANSITION_DURATION * 3);
    setBState({
      ...bState,
      step: bState.step + 1
    });
  }

  const inputRef = React.useRef(null);

  const setNumberNodeButtonClick = () => {
    let newNumberOfNode = parseInt(inputRef.current.value);
    if (Number.isNaN(newNumberOfNode)){
      newNumberOfNode = DEFAULT_NUMBER_OF_NODE;
    }else if (newNumberOfNode < MININUM_NODE) {
      newNumberOfNode = MININUM_NODE;
    }else if (newNumberOfNode > MAXIMUM_NODE){
      newNumberOfNode = MAXIMUM_NODE;
    }
    inputRef.current.value = newNumberOfNode;
    setBState({
      numberOfNode: newNumberOfNode,
      resetCount: bState.resetCount,
      sorting: false,
      reloading: true
    });
    setTimeout(() => {
      setBState({
        numberOfNode: newNumberOfNode,
        resetCount: bState.resetCount + 1,
        sorting: false,
        reloading: false,
        step: 0
      });
    }, TRANSITION_DURATION * 3);
  }

  React.useEffect(() => {
    inputRef.current.value = bState.numberOfNode;
  }, []);
  
  return (
    <>
      <BubbleSortContainer dataSource={dataSource} sorting={bState.sorting} reloading={bState.reloading} step={bState.step} />
      <label className="label" for="node-input">Number of nodes ({MININUM_NODE} ~ {MAXIMUM_NODE}): </label>
      <input id="node-input" className='input' ref={inputRef} /> 
      <input className='button' type="button" value="Set" onClick={setNumberNodeButtonClick} />

      <div className='action-view'>
        <input className='button' type="button" value={bState.sorting ? 'Stop': 'Start'} onClick={startButtonClick} />
        <input className='button' type="button" value="Reset" onClick={resetButtonClick} />
        <input className='button' type="button" value="Step" onClick={stepButtonClick} />
      </div>
    </>
  )
}

export default App;
