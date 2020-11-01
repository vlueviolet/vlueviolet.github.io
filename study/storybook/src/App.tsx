import React from 'react';
import Header from './component/Header/Header';

function App() {
  const gnb = [{ label: 'Home' }, { label: 'Mail' }];
  return (
    <>
      <Header gnbList={gnb} />
    </>
  );
}

export default App;
