import React from 'react';
import Container from './Container.js';

function App() {
  const [numberOfNode, setNumberOfNode] = React.useState(10);
  const [reset, setReset] = React.useState(false);

  const dataSource = [];
  for (let i = 1 ; i <= numberOfNode ; i++) {
    dataSource.push(Math.floor(Math.random() * 200));
  }
  const randomNumber = [];
  while (dataSource.length > 0){
    const index = Math.floor(Math.random() * dataSource.length);
    randomNumber.push(dataSource.splice(index, 1)[0]);
  }

  return (
    <>
      <Container dataSource={randomNumber} />
    </>
  )
}

export default App;
