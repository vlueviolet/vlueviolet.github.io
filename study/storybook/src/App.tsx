import React from 'react';
import Header from './component/Header/Header';

function App() {
  const gnb = [{ label: 'home' }, { label: 'mail' }];
  return (
    <>
      <Header gnbList={gnb} />
    </>
  );
}

export default App;
