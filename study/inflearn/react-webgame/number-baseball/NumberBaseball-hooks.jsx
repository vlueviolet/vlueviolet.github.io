import React, { useState } from 'react';
import Try from './Try-hooks';

// 숫자 4개를 랜덤하게 겹치지 않게 뽑는 함수
function getNumbers() {
  const candidate = [1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9];
  const array = [];
  for (let i = 0; i < 4 ; i++) {
    const number = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(number);
  }
  return array;
}
const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(value === answer.join('')) {
      setResult('홈런');
       
      setTries((prevTries) => [...prevTries, { try: value, result: '홈런'}]);
      
      alert('게임을 다시 시작합니다.');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArray = value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { // 10번 이상 틀렸을때
        setResult(`10번 넘께 틀려서 실패! 답은 ${answer.join(',')} 였습니다.`);
        alert('게임을 다시 시작합니다.');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0 ; i < 4 ; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }
        setTries((prevTries) => {
          return [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼`}];
        });
        setValue('');
      }
    }
  };
  // react에서 제공하는 함수가 아닌, 내가 만든 함수는 화살표 함수로 적어야 함
  // 안그러면, constructor를 써야함
  const onChangeInput = (e) => {
    console.log(answer);
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input type="text" maxLength={4}
          value={value} onChange={onChangeInput}
        />
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
      {tries.map((v, i) => <Try key={`${i}차 시도`} tryInfo={v} />)}
      </ul>
    </>
  );
}

export default NumberBaseball;