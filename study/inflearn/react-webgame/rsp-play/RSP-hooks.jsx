import React, { useState, useRef, useEffect } from 'react';

const rspCoords = {
  rock: 0,
  sissor: '-142px',
  paper: '-284px'
};

const scores = {
  rock: 1,
  sissor: 0,
  paper: -1
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState();
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const interval = useRef();
  const second = useRef(100);

  useEffect(() => { // componentDidMount, componentDidUpdate의 역할 (1:1 대응은 아님)
    interval.current = setInterval(changeHandler, second.current);
    return () => {  // componentWillUnmount 역할
      clearInterval(interval.current);
    }
  }, [imgCoord]);

  const changeHandler = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.sissor);
    } else if (imgCoord === rspCoords.sissor) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비겼습니다.');
    } else if ([1, 2].includes(diff)) {
      setResult('이겼습니다.');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다.');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHandler, second.current);
    }, second.current);
  }; 

  const onClickStop = () => {
    clearInterval(interval.current);
  }

  return (
    <>
      <div id="computer" style={{ backgroundPosition: `${imgCoord} 0`}} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('rock')}>rock</button>
        <button id="rock" className="btn" onClick={onClickBtn('sissor')}>sissor</button>
        <button id="rock" className="btn" onClick={onClickBtn('paper')}>paper</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
      <div><button type="button" className="btn" onClick={onClickStop}>중단</button></div>
    </>
  );
};

export default RSP;