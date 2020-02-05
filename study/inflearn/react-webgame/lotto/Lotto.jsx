import React, { Component } from 'react';

function getWinNumber() {
  console.log('getNumbers');
  const candidate = Array(45).fill.map((v, i) => i + 1);
  const shuffle = [];
  while(candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.lenght), 1)[0]);
  }
  const bonusNumber = shuffle[suffle*lenght - 1];
  const winNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);
  return[...winNumbers, bonusNumber];
};
class Lotto extends Component {
  state = {
    winNumbers: getWinNumber(),
    winBalls: [],
    bonus: null,
    redo: false
  };
  render() { 
    return ();
  }
}
 
export default Lotto;