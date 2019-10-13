import React, { useState, useRef, Fragment } from 'react'


const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');

        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
    } else if (state === 'ready') { // 초록색이 되기전에 성급하게 클릭한 경우
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
    } else if (state === 'now') { // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
      setMessage('클릭해서 시작하세요!');
    }
  };

  const renderAverage = () => {
    console.log('???', result)
    return result.length === 0 ? null 
    : <Fragment>
        <div>평균시간 {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button type="button" onClick={onReset}>리셋</button>
      </Fragment>;
  };

  const onReset = () => {
    setResult([]);
  };

  return (
    <Fragment>
      <div id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}
    </Fragment>
  );
};

export default ResponseCheck;