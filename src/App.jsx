import React from 'react';
import BubbleSortContainer from './components/BubbleSortContainer';
import InsertionSortContainer from './components/InsertionSortContainer';
import { limiter } from './util';
import './App.css';
import { ALGORITHM, DEFAULT_NUMBER_OF_NODE, MAXIMUM_NODE, MININUM_NODE } from './contants';

const initialState = {
  sortAlgo: ALGORITHM.BUBBLE_SORT,
  numberOfNode: DEFAULT_NUMBER_OF_NODE,
  resetCount: 0,
  sorting: false,
  reloading: false,
  step: 0
}

function App() {
  const [bState, setBState] = React.useState(initialState);

  //Init data source (array of number), re-trigger when one of the following dependency change.
  const dataSource = React.useMemo(() => {
    const source = [];
    for (let i = 1 ; i <= bState.numberOfNode ; i++) {
      source.push(Math.floor(Math.random() * 200) + 1);
    }
    return source;
  }, [bState.numberOfNode, bState.resetCount, bState.sortAlgo])

  //Handle start button click, begin the sorting process
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

  //Handle reset button click, trigger reload + refetch datasource
  const resetButtonClick = () => {
    setBState({
      ...bState,
      sorting: false,
      reloading: true
    });
    limiter(() => {
      setBState({
        ...bState,
        resetCount: bState.resetCount + 1,
        sorting: false,
        reloading: false,
        step: 0
      });
    });
  }

  const processingStep = React.useRef(false);

  //Handle step button click, animate sorting process step by step
  const stepButtonClick = () => {
    if (bState.sorting || processingStep.current) { return; }
    processingStep.current = true;
    limiter(() => {
      processingStep.current = false;
    });
    setBState({
      ...bState,
      step: bState.step + 1
    });
  }

  const inputRef = React.useRef(null);

  //Handle changing number of node
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
      ...bState,
      numberOfNode: newNumberOfNode,
      sorting: false,
      reloading: true
    });
    // Call limiter to present reload animation before rerender
    limiter(() => {
      setBState({
        ...bState,
        numberOfNode: newNumberOfNode,
        resetCount: bState.resetCount + 1,
        sorting: false,
        reloading: false,
        step: 0
      });
    });
  }

  //Handle sort button click, changing the sort algorithm
  const onSortChange = (sortType) => {
    return () => {
      if (sortType !== bState.sortAlgo){
        setBState({
          ...initialState,
          sortAlgo: sortType,
          numberOfNode: bState.numberOfNode,
          reloading: true
        });
        limiter(() => {
          setBState({
            ...initialState,
            numberOfNode: bState.numberOfNode,
            sortAlgo: sortType,
          });
        });
      }
    }
  }

  //Set default number of node for input, trigger one time only
  React.useEffect(() => {
    inputRef.current.value = bState.numberOfNode;
  });

  return (
    <>
      {
        bState.sortAlgo === ALGORITHM.BUBBLE_SORT ? (
          <BubbleSortContainer dataSource={dataSource} sorting={bState.sorting} reloading={bState.reloading} step={bState.step} />
        ) : (
          <InsertionSortContainer dataSource={dataSource} sorting={bState.sorting} reloading={bState.reloading} step={bState.step} />
        )
      }
      <label className="label" htmlFor="node-input">Number of nodes ({MININUM_NODE} ~ {MAXIMUM_NODE}): </label>
      <input id="node-input" className='input' ref={inputRef} /> 
      <input className='solid-button' type="button" value="Set" onClick={setNumberNodeButtonClick} />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '50px'}}>
        <label className="label">Algorithm: </label>
        <input style={{ marginLeft: '50px'}} className={bState.sortAlgo === ALGORITHM.BUBBLE_SORT ? 'solid-button' : 'button'} type="button" value="Bubble Sort" onClick={onSortChange(ALGORITHM.BUBBLE_SORT)} />
        <input style={{ marginLeft: '20px'}} className={bState.sortAlgo === ALGORITHM.INSERTION_SORT ? 'solid-button' : 'button'} type="button" value="Insertion Sort" onClick={onSortChange(ALGORITHM.INSERTION_SORT)} />
      </div>
      <div className='action-view'>
        <input className='solid-button' type="button" value={bState.sorting ? 'Stop': 'Start'} onClick={startButtonClick} />
        <input className='solid-button' type="button" value="Reset" onClick={resetButtonClick} />
        <input className='solid-button' type="button" value="Step" onClick={stepButtonClick} />
      </div>
    </>
  )
}

export default App;
