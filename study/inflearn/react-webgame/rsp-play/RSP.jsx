import React, { Component } from 'react';

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

class RSP extends Component {
  state = {
    result: '',
    score: 0,
    imgCoord: 0 
  }

  interval;
  second = 100;
  componentDidMount() {
    this.interval = setInterval(this.changeHandler, this.second);
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  };

  changeHandler = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.rock) {
      this.setState({
        imgCoord: rspCoords.sissor
      });
    } else if (imgCoord === rspCoords.sissor) {
      console.log(this.state.imgCoord, rspCoords.sissor)
      this.setState({
        imgCoord: rspCoords.paper
      });
    } else if (imgCoord === rspCoords.paper) {
      this.setState({
        imgCoord: rspCoords.rock
      });
    }
  };

  onClickBtn = (choice) => (e) => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다.'
      });
    } else if ([1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다',
          score: prevState.score + 1
        }
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다',
          score: prevState.score - 1
        }
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHandler, this.second);
    }, this.second);
  };

  onClickStop = () => {
    console.log(this.interval)
    clearInterval(this.interval);
  }
  render() {
    const { result, score, imgCoord } = this.state;
    console.log('??', imgCoord)
    return (
      <>
        <div id="computer" style={{ backgroundPosition: `${imgCoord} 0`}} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>rock</button>
          <button id="rock" className="btn" onClick={this.onClickBtn('sissor')}>sissor</button>
          <button id="rock" className="btn" onClick={this.onClickBtn('paper')}>paper</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
        <div><button type="button" className="btn" onClick={this.onClickStop}>중단</button></div>
      </>
    );
  }
}
 
export default RSP;