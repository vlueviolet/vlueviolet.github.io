import React, { Component } from 'react';
import TOC from './components/TOC.js';
import Subject from './components/Subject.js';
import Content from './components/Content.js';
import './App.css';

class App extends Component {
  // render 보다 먼저 실행되고, 초기화 시켜주는 함수
  constructor(props) {
    super(props);
    this.state = {
      mode: 'welcome',
      welcome: {title: 'Welcome', desc: 'hello, react!'},
      subject: {
        title : 'WEB',
        sub: 'World Wide Web'
      },
      contents: [
        {
          id: 1,
          title: 'HTML',
          desc: 'HTML....'
        },
        {
          id: 2,
          title: 'HTML2',
          desc: 'HTML2....'
        },
        {
          id: 3,
          title: 'HTML3',
          desc: 'HTML3....'
        }
      ],
      selectedContentId: 2
    }
  }
  render() {
    let _title, _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      this.state.contents.forEach(el => {
        if (el.id === this.state.selectedContentId) {
          _title = el.title;
          _desc = el.desc;
        }
      });
    }
    const _this = this;
    return (
      <div className="App">
        <Subject title={this.state.subject.title}
          onChangePage={function () {
            _this.setState({
              mode: 'welcome'
            });
          }} />
        <TOC
          onChangePage={function (num) {
            console.log(num)
            _this.setState({
              mode: 'read',
              selectedContentId: Number(num)
            });
          }}
          data={this.state.contents} 
        />
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;