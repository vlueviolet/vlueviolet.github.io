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

```javascript
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

### ref

vue의 \$refs와 같이 DOM에서 element를 선택할 때 사용

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
