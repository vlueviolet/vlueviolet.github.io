# 웹 게임을 만들며 배우는 React

- 강사 : 조현영
- 링크 : https://www.inflearn.com/course/web-game-React#

```html
<!-- React 핵심 코드, 실제 배포시에는 production으로 바꿔야 함-->
<script
  crossorigin
  src="https://unpkg.com/react@16/umd/react.development.js"
></script>
<!--React가 웹에 표현될 수 있게 해줌 -->
<script
  crossorigin
  src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
></script>
```

### 빈태그

```javascript
render () {
  return(
    <>
    </>
    // 또는
    <React.Fragment>
    </React.Fragment>
  );
}
```

### 그룹 연산자 : ()

우선순위를 높일때 쓰는데, 대개 보기좋기 위해 쓴다.

### 화살표 함수 사용 여부

```javascript
// methods로 뺐을 때는 화살표 함수를 꼭 쓰자, this가 달라지기 때문
constructor(props) {
  ...
}
onChange = e => {
  this.setState({ value: e.target.value });
};
```

```javascript
render () {
  // render 안에 있을 때는 화살표 함수를 쓰지 않아도 된다.
}
```

### constructor

constructor는 실무에서는 대개 안쓴다.
state를 constructor에 쓰지 않아도 된다.

```javascript
constructor(props) {
  super(props);
  this.state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
    value2: '',
    result: ''
  };
}
// 생략 버전
state = {
  first: Math.ceil(Math.random() * 9),
  second: Math.ceil(Math.random() * 9),
  value: '',
  value2: '',
  result: ''
};
```

### 함수형 setState

이전 상태값을 현재에 반영하려고 할때는 preveState를 사용해야함

```javascript
// class형
// prevState 이전 상태값
// setState가 method안에 들어갈 때는 아래와 같이 함수 형태로 쓰자
this.setState(prevState => {
  return {
    result: '정답' + prevState.value,
    first: Math.ceil(Math.random() _ 9),
    second: Math.ceil(Math.random() _ 9),
    value: ''
  };
});
```

```javascript
// 함수형
setTries(prevTries => [...prevTries, { try: value, result: '홈런' }]);
// 또는
setTries(prevTries => {
  return [...prevTries, { try: value, result: '홈런' }];
});
```

### ref

vue의 `$refs`와 같이 DOM에서 element를 선택할 때 사용

```javascript
<input
  type="number"
  value={this.state.value}
  onChange={this.onChange}
  ref={c => {
    this.input = c;
  }}
/>;

// 다른 메소드에서
this.input.focus();
```

```javascript
// class 방식
class NumberBaseball extends Component {

  inputRef = createRef();

  onInputRef = (c) => { this.inputRef = c; };

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <input type="text" maxLength={4}
          value={value}
          ref={this.onInputRef}
          onChange={this.onChangeInput}
        />
      </>
    );
}
```

```javascript
// hooks 방식
const { useState, useRef } = React;

const inputRef = useRef(null);

inputRef.current.focus();

return (
  <>
    <input
      type="text"
      id="txt-word"
      ref={inputRef}
      value={value}
      onChange={onChangeInput}
    />
  </>
);
```

### setState를 사용하면 render()가 실행된다.

setState가 발생할 때마다 render()가 발생하기 때문에
이를 염두하고 개발해야 한다.
render()에 함수를 코딩하면 계속 함수가 새로 생긴다. 그렇기 때문에 method르 따로 빼주자.

### React Hooks

함수형 컴포넌트에 setState, ref를 사용할 수 있는 것
컴포넌트 안에서만 선언이 가능하다.
state 변경시 함수 자체가 통째로 다시 렌더링 된다.
setState는 비동기이기때문에 이걸 모아서 1번만 실행하기는 한다.
class는 render()만 재실행되는데 비해 조금 느릴 수 있다.

#### state

```javascript
// setFirst : first 전용  setState
// useState() : 초기값 설정
const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9)); // 선언 및 초기화
const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
const [value, setValue] = React.useState('');
const [result, setResult] = React.useState('');

sefFirst(Math.ceil(Math.random() * 9)); // 값 변경하기
```

class 처럼 객체 타입으로 선언도 가능하긴 하다. 그러나, 값 변경이 필요할때 일일히 바꿔줘야 한다.

```javascript
if (parseInt(state.value) === state.first * state.second) {
  setState({
    result: '정닶' + satate.value,
    first: Math.ceil(Math.random() * 9),
    seconde: Math.ceil(Math.random() * 9),
    value: ''
  });
  inputRef.current.focus();
} else {
  // 아래 실행시 first, second는 사라진다.
  // 즉 객체 형태로 선언하면, 매번 state를 다 작성해야 한다.
  setState({
    result: '땡' + satate.value,
    value: '',
    first: '', // 불필요한 작성
    second: '' // 불필요한 작성
  });
  inputRef.current.focus();
}
```

#### ref

```javascript
const inputRef = React.useRef(null);
inputRef.current.focus(); // current를 붙여줘야함
```

### html 속성

```html
<!--
  class -> className : class와 겹침
  for -> htmlFor : 반복문의 for와 겹침
-->
<span className="txt">text</span>
<label htmlFor="button">label</label>
```

### 렌더링?

아래 코드가 실행될때 렌더링이 3번 일어나는 것이 아니다.
리액트의 setState는 비동기 처리이기 때문에, 이를 모아서 1번만 실행한다.

```javascript
setResult(prevResult => {
  console.log('???', prevResult);
  return '정답' + value;
});
setFirst(Math.ceil(Math.random() * 9));
setSecond(Math.ceil(Math.random() * 9));
```

### React에서 input 관련

react에서는 input 요소를 사용할때, 무조건 아래 2개 중 하나를 써야한다.

- value + onChange
  value를 쓸거면, onChange도 항상 같이 써주자.
  ```javascript
  <input value={this.state.value} onChange={this.onChange} />
  ```
- defaultValue
  value, onChange를 안쓴다면, defaultValue로 기본 값을 지정해주자.
  ```javascript
  <input defaultValue={this.state.value} />
  ```

# React 프로젝트 설치

## 웹팩?

여러 js를 하나의 번들로 만들어줌
node.js를 알아야함, javascript 실행기이다.

### 초기 설치

```bash
npm install react react-dom
npm install -D webpack webpack-cli
```

### -D란?

실제 서비스에서는 웹팩이 필요없다.<br>
개발할때만 필요하기때문에 개발용으로만 웹팩을 쓰겠다는 의미

### package.json

`npm init`을 실행하면 생기는 문서로 실서비스, 개발에 필요한 각종 라이브러리들의 목록을 보여줌

- 실제 서비스에서 적용되는 것들

```json
"devDependencies": {
  ...
}
```

- 개발할때만 적용되는 것들

```json
"devDependencies": {
  ...
}
```

### webpack.config.js

```javascript
// 입력단의 파일을 출력단의 파일로 압축해달라~
module.exports = {
  ...
  entry: {  // 입력

  },
  output: { // 출력

  }
}
```

### client.jsx

react, react-dom을 불러옴

```javscript
const React = require('react');
const ReactDom = require('react-dom');
```

### 웹팩 실행

```bash
webpack
```

만약, `command not found` 뜨면

1. `package.json`에 script 영역에 webpack을 명령어로 실행하도록 등록

```json
"scripts": {
    "dev": "webpack"
},
```

그리고 아래 명령어 실행

```bash
npm run dev
```

2. `npx webpack`으로 실행

## babel 설치

jsx 문법을 브라우저가 이해하기 위해서는 바벨을 통해 javascript 문법으로 변환이 필요하다

```bash
npm install -D @babel/core
npm install -D @babel/preset-env
npm install -D @babel/preset-react
npm install -D babel-loader
```

- @babel/core
  바벨의 기본
- @babel/preset-env
  사용자의 환경에 맞는 브라우저에 맞게 최신 문법을 옛날 문법으로 바꿔줌
- @babel/preset-react
  jsx를 javascript로 바꿔줌
- babel-loader
  babel과 webpack을 연결해줌

### webpack.config.js

브라우저 타겟 정보 설정 참고 : https://github.com/browserslist/browserslist

```javascript
const path = require('path'); // 경로 조작, node 설치시 깔림

module.exports = {
  name: 'word-relay-setting', // 웹팩 설정의 이름, 안써도 됨
  mode: 'development', // 실서비스: production
  devtool: 'eval', // 빠르게 하겠다?, 실서비스 hidden-source-map
  resolve: {
    // 확장자를 적어주면 entry단에 확장자 기입 안해도 됨
    extensions: ['.js', '.jsx']
  },
  entry: {
    // 입력
    app: ['./client']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, // 규칙을 적용할 파일들, js, jsx파일들에 rule을 적용하겠다
        loader: 'babel-loader', // 적용할 룰 이름
        options: {
          // babel의 옵션
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  // 원하는 브라우저를 타겟으로 하는 경우, 지원하고자 하는 브라우저를 지정하면 속도도 향상된다.
                  browsers: ['> 5% in KR', 'last 2 chrome versions']
                },
                debug: true
              }
            ],
            '@babel/preset-react'
          ],
          plugins: ['@babel/plugin-proposal-class-properties'] // jsx에서 constructor 말고 바로 state 문법을 쓰려면 추가해야함
        }
      }
    ]
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    // 출력
    path: path.join(__dirname, 'dist'), //__dirname: 현재폴더, 현재 폴더안에 dist폴더를 합쳐줘라
    filename: 'app.js'
  }
};
```

## 자동 빌드하는 방법

아래 2개의 모듈을 설치한다.<br>
자세한 셋팅 정보는 아래 링크 참고<br>
https://github.com/gaearon/react-hot-loader/

```bash
npm install -D react-hot-loader
npm install -D webpack-dev-server
```

그리고, package.json의 scripts 옵션에 `webpack-dev-server --hot`로 수정한다.
webpack-dev-server가 webpack.config.js를 읽어서 빌드하고 항상 뒤쪽 서버에 유지를 시켜준다.

```javascript
// package.json 파일 수정
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack-dev-server --hot"
},
```

```javascript
// webpack.config.js  파일 수정
// module > rules > options > plugins
plugins: [
  '@babel/plugin-proposal-class-properties', // jsx에서 constructor 말고 바로 state 문법을 쓰려면 추가해야함
  'react-hot-loader/babel'
],
```

```javascript
// .jsx 파일 수정
const { hot } = require('react-hot-loader/root');
const WordRelay = require('./WordRelay');

const Hot = hot(WordRelay);

ReactDom.render(<Hot />, document.querySelector('#root'));
```

```html
<!-- 파일 경로 변경 dist 폴더 삭제 -->
<script src="app.js"></script>
```

## require와 import

### require

node의 module 시스템으로, 내가 만들든 남이 만들었든 가져올 수 있음
import와 호환됨

### import

export와 import

```javascript
export const hello = 'hello';

import { hello };
```

default는 한 파일에서 1번만 사용할 수 있다.

```javascript
export default Hello; // module.exports = Hello; 와 호환이 된다.

import Hello;
```

### 모듈 문법 비교

```javascript
// ES2015 모듈 문법
import React, { Component } from 'react';
class Hello extends Component {
  ...
}
export const hello = 'hello'; // import { hello };
export const bye = 'bye';     // impor { hello, bye };
export default Hello;         // import Hello;

// 노드 모듈 문법 : commonJS
// 노드에서는 아래 문법을 제공한다. import를 쓰면 에러가 난다. (webpack.config.js에서 import 쓰면 에러난다.)
// babel이 import --> require로 바꿔준다.
const React = require('react');
module.exports = { hello: 'a' };
exports.hello = 'a';
```

### map() 반복문

리액트가 key를 보고 같은 컴포넌트인지 판단하기 때문에,<br>
react에서는 key를 반드시 작성해줘야 한다.<br>
현재 array에 같은 값이 발생할 수 있기 때문에 데이터값보단, index를 key를 주면,<br>
key의 역할이 성능 최적화인데, 문제가 된다. index를 key로 주는걸 안티패턴으로 불린다.<br>
key를 고유하게 만드는 노력이 필요하다.
<br><br>
**요소가 추가만 되는 배열인 경우, index를 key로 사용해도 되지만,<br>reat에서 key를 기준으로 엘리먼트를 추가하거나, 수정 or 삭제를 판단하기 때문에 배열의 순서가 바뀌면 문제가 된다.**

```javascript
// arrya안에 동일 값이 있을 수 있기 떄문에, key를 고유값으로 하려는 노력이 필요하다.
array.map((v, index) => {
  return <li key={v.fruit + v.taste}>{v.fruit}</li>;
});
// 중괄호가 없으면 return의 의미
array.map((v, index) => <li key={v.fruit + v.taste}>{v.fruit}</li>);
```

# Props

- 부모로 부터 전달받는 값으로, 자식이 props를 변경할 수 없다.<br>props를 변경할 수 있는건 부모 뿐이다.
- 하지만, props를 자식이 바꿔야하는 경우가 있다. 그럴땐 state에 넣어준다.

```javascript
// class
import React, { PureComponent } from 'react';
class Try extends PureComponent {
  state = {
    result: this.props.result,
    try: this.props.try
  };
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;


// hooks
import React, { memo, useState } from 'react';

const Try = memo(({ tryInfo }) => {
  const [result, setResult] = useState(tryInfo.result);
  const onClick = () => {
    setResult(1);
  };
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{result}</div>
    </li>
  );
});

export default Try;
```

- constructor를 쓰면 이 안에서 미세한 함수를 쓸 수 있어 유용하다.

- 렌더링이 자주 일어나는 문제가 있을 수 있다.

```javascript
// parent
<Try value={v} index={i} />;

// child
render(
  <div>
    {this.props.value} {this.props.index}
  </div>
);
```

# array 사용

react에서 배열을 추가할때 push를 사용하면 안된다.
push 이전의 배열과 비교를 하지 못해 다음과 같은 방식으로 추가해야 한다.

```javascript
const array = [];
array = [...array, value];
```

# 렌더링 + 성능 최적화 방법

## shouldComponentUpdate

리액트는 props, state가 바뀌면 렌더링이 발생한다.<br>
잦은 렌더링은 성능에 영향을 주기 때문에, 불필요한 렌더링을 하지 않도록 해줘야 한다.<br>
setState만 호출만 해도 렌더링이 발생한다.<br>

```javascript
import React, { Component } from 'react';

class TestRender extends Component {
  state = {
    count: 0
  };

  onClick = () => {
    this.setState({}); // 아무런 값을 변경해주지 않는다. 그러면 렌더링이 발생할까? yes.
  };

  render() {
    console.log('렌더링', this.state);
    return (
      <>
        <button type="button" onClick={this.onClick}>
          클릭
        </button>
      </>
    );
  }
}

export default TestRender;
```

그렇기 때문에, 어떤 상황에서 렌더링을 해줘야하는지 설정해야 한다.
이럴 때 사용하는 것이 shouldComponentUpdate이다. 리액트에서 지원한다.

```javascript
import React, { Component } from 'react';

class TestRender extends Component {
  state = {
    count: 0
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // 현재의 count와 미래의 count를 비교한다.
    if (this.state.count !== nextState.count) {
      return true; // 렌더링 한다.
    } else {
      return false; // 렌더링 하지 않는다.
    }
  }

  onClick = () => {
    this.setState({}); // 아무런 값을 변경해주지 않는다. 그러면 렌더링이 발생할까? yes.
  };

  render() {
    console.log('렌더링', this.state);
    return (
      <>
        <button type="button" onClick={this.onClick}>
          클릭
        </button>
      </>
    );
  }
}

export default TestRender;
```

최적화를 많이 못하는데, 최적화하는 연습을 많이하자.
devtool을 보면서 하자.

## PureComponent (class에서 사용)

shouldComponentUpdate를 알아서 구현한 컴포넌트로 class에서 사용한다.

```javascript
import React, { PureComponent } from 'react';

class TestRender extends PureComponent {
  state = {
    count: 0
  };

  onClick = () => {
    this.setState({});
  };

  render() {
    console.log('렌더링', this.state); // 렌더링이 계속 발생하지 않는다.
    return (
      <>
        <button type="button" onClick={this.onClick}>
          클릭
        </button>
      </>
    );
  }
}

export default TestRender;
```

하지만, state가 단순한 데이터라면 잘 되지만, 객체나 참조가 있는 경우에는 어려워한다.
아래와 같이 array state가 바뀐느데 PureComponent는 인식하지 못한다.

```javascript
class TestRender extends PureComponent {
  state = {
    count: 0,
    array: []
  };

  onClick = () => {
    const newArray = this.state.array;
    newArray.push(1);
    this.setState({
      array: newArray
    });
  }
  ...
}
```

그래서 배열, 객체는 기존 array를 유지하도록 확장 연산자를 사용하는 것이 좋다.
그리고 왠만하면, 복잡한 객체구조의 state를 쓰지말자. 배열안에 객체안에... 이런거..
컴포넌트를 잘게 쪼개면 PureComponent를 쓰기 쉽다.

```javascript
class TestRender extends PureComponent {
  state = {
    count: 0,
    array: []
  };

  onClick = () => {
    this.setState({
      array: [...this.state.array, 1]
    });
  }
  ...
}
```

## react memoization (hooks에서 사용)

- hooks에서 부모컴포넌트가 렌더링 될때, 자식 컴포넌트도 렌더링 된다. 자식 컴포넌트의 변화가 없는데도 리렌더링되는 불필요한 상황을 해결하기 위해 React.memo()를 사용할 수 있다.
- 컴퍼넌트가 React.memo()로 래핑 될 때, React는 컴퍼넌트를 렌더링하고 결과를 메모이징(Memoizing)한다. 그리고 다음 렌더링이 일어날 때 props가 같다면, React는 메모이징(Memoizing)된 내용을 재사용한다.
- 관련 링크 : https://ui.toast.com/weekly-pick/ko_20190731/

```javascript
import React, { memo } from 'react';

const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
```

## render()에는 setState 쓰지 말자.

state, props가 변하면 render가 발생하는데, 아래와 같이 하게되면 `render()` <--> `setState()`가 계속 반복하면서 무한루프가 생긴다.

```javascript
render() {
  this.setState({
    ...
  });
  return();
}
```

# createRef

ref를 class, hooks의 방식이 헷갈려서 이렇게 통일 가능
아래와 같이 createRef를 사용하면 current로 접근 가능하다.

```javascript
import React, { Component, createRef } from 'react';

inputRef = createRef();

onSomeMethods = () => {
  this.inputRef.current.focus();
}

render() {
  return (
    <>
      <input type="text" maxLength={4}
        value={value}
        ref={this.inputRef}
        onChange={this.onChangeInput}
      />
    </>
  )
};
```

# [강좌] 반응속도 체크

## React 조건문

render()의 return 안에서 for, if를 사용하지 못한다.
쓸 수 있긴하지만, 지저분해진다.

false, undefined, null은 jsx에서 태그 없음을 의미한다.

```javascript
// 삼항연산자
render() {
  return (
    <>
    {this.state.result.length === 0 ? null
      : <div>평균시간 {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
    }
    </>
  );
};
// 또는 보호연산자
render() {
  return (
    <>
    {
      this.state.result.length !== 0
      && <div>평균시간 {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
    }
    </>
  );
};

//또는 가독성을 위해 함수로 따로 뺌
renderAverage = () => {
  return this.state.result.length === 0 ? null
  : <div>평균시간 {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
};

render() {
  const { state, message } = this.state;
  return (
    <>
      <div id="screen"
        className={state}
        onClick={this.onClickScreen}
      >
        {state.message}
      </div>
      {this.renderAverage()}
    </>
  );
}

```

## useRef

함수형에서는 this의 속성을 useRef가 대신한다.
useRef로 선언하되, 사용할때는 `.current`를 붙여서 사용해야 한다.

```javascript
import React, { useState, useRef } from 'react';
const Component = () => {
  const timeout = useRef(null);

  const sumFunction = () => {
    timeout.current = new Date();
  };
};

자식 컴포넌트에서 부모 컴포넌트의 dom ref를 받을 수 있는 방법은 ? `forwardRef`
```

## useState VS useRef

state는 변경되면 render가 발생하지만, ref는 발생하지 않는다.
불필요한 렌더링은 성능향상을 위해 막아야 한다.
값이 바뀌어도 렌더링(화면 변화)이 되지 않게 할때 ref에 넣어서 사용하면 된다.

주로 타이머나 interval은 ref에 넣어서 사용한다.

---

# Class - React Lifecycle

- 반드시 라이프사이클에서 무언가를 해야하는것은 아니다. 일반 함수에서 실행해도 된다. 단 정리가 필요한 경우에는 componentWillUnmount에서 정리하도록 하자.
- componentWillUnmount는 어떤 상황에서도 항상 필수로 쓰자.

## componentDidMount()

- 컴포넌트가 첫 렌더링된 후 실행
- 리렌더링이 실행될 때는 실행되지 않음
- 비동기 요청 처리
- 조건문으로 state 분기 처리

## componentWillUnmount()

- 컴포넌트가 제거되기 직전에 실행
- componentDidMount에서 실행한것들을 제거할 때
- 부모에 의해 내 컴포넌트를 없앨 때
- componentDidMount와 짝꿍
- 비동기 요청 정리

## componentDidUpdate()

- 리렌더링 후에 실행됨
- 조건문으로 state 분기 처리

## 실행순서

1. 클래스의 경우

- 기본 : constructor -> render -> ref가 있다면 실행 -> componentDidMount
- setState/props 바뀔때 : shouldComponentUpdate (return true인 경우) -> render -> componentDidpdate
- 부모가 나를 없앴을 떄 : componentWillUnmount -> 소멸

## Ref. 클로저문제

비동기함수 바깥의 변수를 참고하면 클로저가 발생한다.

```javascript
const { imgCoord } = this.state;
this.interval = setInterval(() => {
  console.log(imgCoord); // undefined
  if (imgCoord === rspCoords.rock) {
    this.setState({
      imgCoord: rspCoords.sissor
    });
  } else if (imgCoord === rspCoords.sissor) {
    console.log(this.state.imgCoord, rspCoords.sissor);
    this.setState({
      imgCoord: rspCoords.paper
    });
  } else {
    this.setState({
      imgCoord: rspCoords.rock
    });
  }
}, this.second);
```

```javascript
this.interval = setInterval(() => {
  const { imgCoord } = this.state; // 이렇게 안에 넣어주어야 한다.
  if (imgCoord === rspCoords.rock) {
    this.setState({
      imgCoord: rspCoords.sissor
    });
  } else if (imgCoord === rspCoords.sissor) {
    console.log(this.state.imgCoord, rspCoords.sissor);
    this.setState({
      imgCoord: rspCoords.paper
    });
  } else {
    this.setState({
      imgCoord: rspCoords.rock
    });
  }
}, this.second);
```

# React에서 이벤트 처리하기

참고 링크 : https://ko.reactjs.org/docs/handling-events.html

render영역 안에 보면, 메서트 안에 함수를 호출하는 구문이 있다. 여기서 화살표 함수를 사용하지 않으려면,

```javascript
// 리팩토링 전
onClickBtn = choice => {
  console.log('???', choice);
};
class RSP extends Component {
  render() {
    return (
      <button id="rock" className="btn" onClick={() => this.onClickBtn('rock')}>
        rock
      </button>
    );
  }
}
// 리팩토링 후
// 아래럼 순서가 바뀌면 안된다.
// 이렇게 쓴느것을 고차함수라고 한다.
onClickBtn = choice => () => {
  console.log('???', choice);
};
// e 매개변수를 추가한다면,
onClickBtn = choice => e => {
  e.preventDefault();
};
class RSP extends Component {
  render() {
    return (
      <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>
        rock
      </button>
    );
  }
}
```

# hooks의 라이프사이클

hooks에는 라이프사이클이 없지만, 흉내를 낼 수 있다.

## useEffect

- 화면이 완전히 바뀌고 난 후 실행
- componentDidMount, componentDidUpdate, componentWillUnmount의 역할 (1:1 대응은 아님)
- 첫번째 인수 : 함수
- 두번쨰 인수
  - 배열, 클로저 문제를 해결해주는 역할을 한다.
  - 바뀌는 state, 즉 이 배열에 넣는 값들이 바뀔때 useEffect가 실행된다.
  - 빈 배열로 두면, 어떤 state가 바뀌더라도 신경쓰지 않겠다는 의미, 처음에 1번만 실행되고 useEffect 실행 안됨
  - componentDidUpdate의 역할도 함
- 함수형 컴포넌트는 render시에 전체 코드가 재실행되기때문에 useEffect()도 마찬가지로 다시 실행한다.<br>그래서 [] 배열에 들어간 state의 변화가 있을 때 실행, 종료 부분을 반복적으로 실행한다.

```javascript
// 기본 틀
useEffect(() => {
  // componentDidMount, componentDidUpdate의 역할 (1:1 대응은 아님)
  console.log('실행부분');
  return () => {
    // componentWillUnmount 역할
    console.log('종료 부분');
  };
}, []);
```

- useEffect는 여러 개를 사용할 수 있다. state마다 다른 effect를 사용하고 싶다면~

```javascript
useEffect(() => {
  interval.current = setInterval(changeHandler, second.current);
  return () => {
    clearInterval(interval.current);
  }
}, [imgCoord]);
useEffect(() => {
  console.log(score);
  return () => {
    ...
  }
}, [score]);
```

## useLayoutEffect

- 화면이 바뀌기 전에 발생
- resize 이벤트같이 레이아웃의 변화 감지를 위해 사용한다.

## hooks와 class의 라이프사이클 비교

- class에서는 라이프사이클에서 모든 state의 처리가 가능하다. state를 if문을 이용해 분기하여 대응한다.

```javascript
componentDidMount() {
  this.setState({
    imgCoord: 3,
    score: 2,
    resul: 1
  });
}

```

- hooks에서는 각 state를 개별적 또는 여러개로 대응이 가능하다.

```javascript
// 개별 대응
useEffect(() => {}, [imgCoord]);
useEffect(() => {}, [result]);
useEffect(() => {}, [score]);
// 동시 대응이 필요한 경우
useEffect(() => {}, [imgCoord, score]);
useEffect(() => {}, [imgCoord, score, result]);
```
