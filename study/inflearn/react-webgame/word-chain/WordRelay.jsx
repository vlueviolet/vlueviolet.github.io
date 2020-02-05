const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '제로초',
    value: '',
    result: ''
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: ''
      })
      this.input.focus();
    } else {
      this.setState({
        result: '땡',
        value: ''
      });
      this.input.focus();
    }
  };

  
  onChangeInput = (e) => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
  }
  
  input;
  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
      <div>{this.state.word}</div>
      <form onSubmit={this.onSubmitForm}>
        <input type="text" ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
        <button type="submit">입력</button>
      </form>
      <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;