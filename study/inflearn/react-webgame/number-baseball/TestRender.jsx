import React, { PureComponent } from 'react';

class TestRender extends PureComponent {
  state = {
    count: 0,
    array: []
  };

  onClick = () => {
    this.setState({
      array: [...this.state.array, 1]
    });  // 아무런 값을 변경해주지 않는다. 그러면 렌더링이 발생할까? yes.
  }

  render() {
    console.log('렌더링', this.state);
    return (
      <>
        <button type="button" onClick={this.onClick}>클릭</button>
      </>
    );
  }
};

export default TestRender;