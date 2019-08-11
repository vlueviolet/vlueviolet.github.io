import React, { Component } from 'react';
class Subject extends Component {
  render() {
    const _this = this;
    return (
      <header>
        <h1><a href="#" onClick={function (e) {
          e.preventDefault();
          _this.props.onChangePage();
        }}>{this.props.title}</a></h1>
        world wide web!
      </header>
    );
  }
}

export default Subject;