import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    helloArray: [1,2,3,4],
    helloObject: {
      hi: 'hello',
      hello: 'hi'
    }
  };


  handleClickArray  = () => {
    this.setState({
      helloArray: [...this.state.helloArray, 5,6]
    }, () => {
      console.log('call back func', this.state.helloArray);
    });
  };
  
  hendelClickObject = () => {
    this.setState({
      helloObject: {
        ...this.state.helloObject,
        hello: 'hello'
      }
    }, () => {
      console.log('callback2 func', this.state.helloObject);
    });
  }
  
  render() {
    return (
      <div className="App">
        <p>My name is {this.state.helloArray}</p>
        <button onClick={this.handleClickArray}>Click Me</button>
        <button onClick={this.handleClickObject}>Click Me</button>
      </div>
    );
  }
}

export default App;
