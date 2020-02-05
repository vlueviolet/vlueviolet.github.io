import React, { Component, createRef } from 'react';
import Try from './Try';

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
class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: []
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const { result, value, answer, tries } = this.state;
    if(value === answer.join('')) {
      this.setState((prevState) => {
        return {
          result: '홈런',
          tries: [...prevState.tries, { try: value, result: '홈런'}]
        }
      });
      alert('게임을 다시 시작합니다.');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: []
      });
      this.inputRef.current.focus();
    } else {
      const answerArray = value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { // 10번 이상 틀렸을때
        this.setState({
          result: `10번 넘께 틀려서 실패! 답은 ${answer.join(',')} 였습니다.`
        });
        alert('게임을 다시 시작합니다.');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: []
        });
        this.inputRef.current.focus();
      } else {
        for (let i = 0 ; i < 4 ; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼`}],
            value: ''
          }
        });
        this.inputRef.current.focus();
      }
    }
  };
  // react에서 제공하는 함수가 아닌, 내가 만든 함수는 화살표 함수로 적어야 함
  // 안그러면, constructor를 써야함
  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value
    });
  };

  inputRef = createRef();

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input type="text" maxLength={4}
            value={value}
            ref={this.inputRef}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도 : {tries.length}</div>
        <ul>
        {tries.map((v, i) => <Try key={`${i}차 시도`} tryInfo={v} />)}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;