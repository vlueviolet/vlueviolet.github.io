# ReactJS 기초 및 실습

강사 : 최원기(팀에브리웨어)

# ReactJS의 기초 및 실습 (1주차)

## 자바스크립트란?

- 웹 브라우저에서 동작하기 위해 최적화 된 언어
- nodejs, react, vue, angular들도 모두 자바스크립트 기반으로 되어있음
- 브라우저 또한 자바스크립트 엔진으로 구성되어 있음
- 웹앱으로 여러가지를 개발하려는 시장의 니즈가 많음
- ECMAScript 준수하는 범용 스크립트 언어
  <img width="1199" alt="스크린샷 2020-11-08 오전 10 23 48" src="https://user-images.githubusercontent.com/26196090/98455345-8ee1f380-21b2-11eb-87c5-6b4d150dacb4.png">

## 크로스브라우징이란?

- 자바스크립트 엔진 종류 : V8, spderMonkey, javascriptcore, chakra
- 퍼포먼스의 차이
- 지원되는 ecmascript 차이
- 새로운 버전의 ecmascript, javascript 엔진의 변화는 별개
- 브라우저별로 특정 버전의 ecmascript와 호환되는지 체크가 중요
  - IE에서 지원되지 않는 문법들
- 바벨의 등장 : es6 이상의 문법을 es5 이하의 문법으로 변환

## 클래스, 객체, 인스턴스

### 클래스

- 객체를 만들어 내기 위한 설계도
- 변수와 매서드의 집합체

### 객체

- 구현하고자 하는 대상
- 클래스의 인스턴스이ㅣ자 모든 인스턴스를 포괄

### 인스턴스

- 설계도를 바탕으로 구현된 구체적 실체

### 리액트의 장점

- 라이브러리는 기능 구현, 프레임워크는 개발자가 환경 세팅 등 전체적인 제어를 위함인데, 리액트는 이 둘 중에 어디라고 말하기는 어렵다.
- angular는 세팅, 데이터 프름 파악이 어려움
- 가상 돔을 통한 빠르고 효율적인 렌더링
- 재사용이 가능한 컴포넌트 구조
  - 컴포넌트로 쪼개기 쉽게 되어있음
  - state를 이용해서 값 연결 가능
- jsx 문법으로 html 태그 활용 가능
- 일방향적인 데이터 흐름 구조 (state, prop)
  - 가장 상위의 컴포넌트의 이벤트 제어를 하면 하위 컴포넌트도 자동으로 렌더링이 되어 효율적 설계 가능
  - 콜백함수 형태로 props를 전달함
    하위 컴포넌트로 콜백함수를 전달 가능하다는 의미ㄴ

#### DOM vs Virtual DOM

- 기본 DOM은 변화가 발생시, 이 과정을 다시 반복한다. 잠깐 잠깐의 멈춤 현상이 있다.
  <img width="1184" alt="스크린샷 2020-11-08 오전 11 05 18" src="https://user-images.githubusercontent.com/26196090/98455320-58a47400-21b2-11eb-98c2-7c431eee4c46.png">
- Virtual DOM은 상태 변화를 감지하여, Virtual DOM에 적용시킨 후, 한번에 dom으로 전달하기 때문에 브라우저 렌더링 횟수를 줄여준다. 변화가 자연스럽다.

기본 dom에서 리스트가 바뀐다고 해보자. 한번의 끊김이 발생한다.
<img width="1193" alt="스크린샷 2020-11-08 오전 11 09 45" src="https://user-images.githubusercontent.com/26196090/98455370-f6983e80-21b2-11eb-9c96-fc56b73b0bfb.png">
<img width="1179" alt="스크린샷 2020-11-08 오전 11 10 21" src="https://user-images.githubusercontent.com/26196090/98455373-06b01e00-21b3-11eb-9fae-78e6b194a3cc.png">

**가상 dom을 이용한 예시**  
변화들을 물론 자바스크립트로도 vitual dom 방식의 개발이 가능하겠지만, 리액트를 이런 것들을 자동으로 해주기때문에 개발자가 고민하지 않아도 됨
<img width="1185" alt="스크린샷 2020-11-08 오전 11 12 15" src="https://user-images.githubusercontent.com/26196090/98455411-8c33ce00-21b3-11eb-9e48-ce59c45dec70.png">

### state, props

- 변화해야하는 상태들을 정의한다.
- 문자, 상수, 함수, 배열, 객체 모두 가능
- 부모 -> 자식으로의 일방향적인 데이터 흐름이 있는 불변성이 있으며, 물론 반대방향으로도 데이터 흐름은 가능하지만 redux, context의 개념이 추가된다.

#### state

- 변경이 가능한 값
- 한 컴포넌트에서 생성해서, 그 컴포넌트에서 사용함

#### props

- 변경이 불가능한 값
- 하위 컴포넌트에 state를 전달할때 사용

## life cycle

### class형 컴포넌트

compoment로 시작하는 사이클은 모두 class형
<img width="1085" alt="스크린샷 2020-11-08 오전 11 43 24" src="https://user-images.githubusercontent.com/26196090/98455703-a2dc2400-21b7-11eb-87b6-fc9cf2ab8263.png">

## 정리

- 화면을 만들때의 UI라이브러리는 맞고, 스타일링을 해주는 것은 아니다.
  <img width="1093" alt="스크린샷 2020-11-08 오전 11 46 09" src="https://user-images.githubusercontent.com/26196090/98455732-154d0400-21b8-11eb-8dc8-68b25dcef73c.png">

## 설치

```zsh
npm install -g create-next-app
npm create next-app
```

## 폴더 설명

- public : 정적 파일, 이미지, 폰트, json
- pages/api/app.js : page 단위로 라우팅 되도록 도와주는 중간 단계  
  next에서 여기에 js를 추가하면 자동으로 라우팅 해준다.

## 함수형

- state 기능 및 life cycle 기능을 사용할 수 없음 (stateless)
- 리액트 v16.8부터 hook 등장
- 클래스형 컴포넌트보다 간단하고, 메모리 자원을 적게 사용

## 라이프사이클

### 클래스형

```
constructor → componentWillMount → render → componentDidMount → (이벤트 발생) → shouldComponentUpdate → componentWillUpdate → render → componentDidUpdate
```

- will이 들어가는 사이클에서는 setState 실행하면 안됨
  무한 루프 발생함, 계속 state를 바꾸는 것으로 인식됨
- componentDidUpdate : 완벽하게 마운트 된 후에 호출되기 때문에 외부 데이터 가져와도 됨
- shouldComponentUpdate : 최적화시에 사용, 굳이 안씀
- 라이프 사이클은 리액트 업데이트시 줄어들거나, 통합되거나 하고 있음
- componentDidMount, componentDidUpdate 2개의 라이프사이클이 클래스형에서 많이 쓰임

### 함수형

```jsx
// 1)
useEffect(() => {
  console.log('state is not required');
}); // state 없음

// 2)
[] 빈 배열이면 useEffect는 componentDidUpdate와 같다.
useEffect(() => {
  // 초기 데이터 fetch
  // 페이지 분기 처리
  // 초기 state 설정
  console.log('component did mount);
}, []); // state를 쓰는 구조지만, 빈값

// 3)
// 초기 mount와 같이 실행되기때문에 조건을 두어 겹치지 않게 해야한다.
useEffect(() => {
  console.log('component did update);
}, [name]); // []는 state, props 자리
```

```bash
# console.log
state is not required # <-- 무조건 뜸
component did mount   # <-- 처음에만 뜸
component did update  # <-- name state가 바뀌면 뜸

```

- state로 라이프사이클 제어를 대체한다.
- 1)는 항상 발생하기때문에 쓰지 않아야 한다.
- 2)구조를 쓴다. state가 비워있기때문에 내부 state에는 반응하지 않음
  문제는 3)번과 겹치기 때문에 3)는 조건을 달아야 한다.
- 3)은 특정 state 변화에 감지하지만, 초기에도 state가 변한다고 감지하게 때문에 2)와 중복되지 않도록 해야 한다.
- did mount, did update를 많이 쓴다.

## Next

### Next를 사용하면 좋은 장점

- ssr
- seo
- routing

### 폴더 구조

- components
  - 컴포넌트 파일들
- pages
  - component root 개념의 페이지 단위의 파일들
  - 기본 세팅
    - \_app.js
    - \_document.js
    - \_error.js
- public/
  - asset(img, font), json 등 필요한 구성하면 됨
  - 네이밍은 public으로 해야함, 예약어
- styles : hot reload를 위해 public안에 넣지 않고 밖으로 뺌

#### 그외

- .babelrc
- next.config.js

# 서버 달기

- express라는 nodejs에서 제공하는 서버를 next와 연결해서 사용하기 위함

```bash
touch server.js
npm install --save express morgan cookie-parser express-session
```

```jsx
const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev }); // next안에서 가져옴
const handle = app.getRequestHandler(); // next에서 불러옴

app.prepare().then(() => {
  const server = express(); // next 안에서 express를 불러옴

  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser('!ASD!@ASd!AVZXC!@!@#'));
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: '!ASD!@ASd!AVZXC!@!@#',
      cookit: {
        httpOnly: true,
        secure: false
      }
    })
  );

  // server.get('product/:id/:name/:price', (req, res) => {
  //   const actualPage = 'product_detail';
  //   const queryParams = {
  //     id: req.params.id,
  //     name: req.params.name,
  //     price: req.params.price
  //   };
  //   return app.render(req, res, actualPage, queryParams);
  // });

  // next에서 구성한 page 단위 구성을 하기 위한 코드
  server.get('*', (req, res) => {
    return handle(req, res); // next의 handler 기준으로 맞춤
  });

  server.listen(3000, () => {
    console.log('next + express running on port 3000');
  });
});
```

- ssr이 가능하며, routing을 통제하기 위함

### 서버를 별도로 설치하는 이유

- next에서 routing의 제한적인 부분을 해결하기 위함
- 새로고침했을때 뒤에 붙는 문자열을 못 가져오는 경우가 있음
- product/:id/:name/:price 이런 구조를 제공하지 않기때문에 서버를 제공해서 이런 구조를 사용하려는 것이 목적

## nodemon

package.json 명령어 바꾸기

```json
"scripts": {
  "dev": "nodemon",
  "start": "node server.js",
  "build": "next build"
},
```

## styled component 세팅

```bash
npm install --save babel-plugin-styled-components styled-components
touch .babelrc
```

```json
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
}
```

참고 코드

[https://medium.com/@qsx314/3-next-js-styled-components-36ef818438d9](https://medium.com/@qsx314/3-next-js-styled-components-36ef818438d9)

# styled-component

```jsx
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <title>React Practice</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <body>
          {/* 라우터에 해당하는 페이지가 렌더링 되는 부분 */}
          <Main />
          {/* next 관련된 자바스크립트 파일 */}
          <NextScript />
        </body>
      </html>
    );
  }
}
```

## 문법 등 참고

https://styled-components.com/docs/basics

## 한 파일에 코드가 길어지는 대응

- 컴포넌트별로 잘게 쪼갠다.
- global로 미리 세팅하고 가져오는 방식
- 컴포넌트가 복잡해질때 단점이 될 순 있다.
- 그래서 scss로 하기도 한다.

# scss 세팅

```bash
npm install --save @zeit/next-sass node-sass
npm install --save @zeit/next-css
```

```js
// next.config.js
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

module.exports = withCss(withSass());
```

```zsh
cd styles
mkdir scss # 개별 스타일
touch styles.scss # 전체 스타일 집합
```

```js
// pages/_app.js
import import '../styles/styles.scss';
```

# 3주차 강의

- ajax data fetch
- ssr
  - get query index data fetch
- hook
  - user customizing hook
  - set redux in next

# API

## 대표적인 api fetch library

promise 기반

### fetch

- js에 내장된 모듈
- 모듈 설치 없이 사용 가능
- 적은 기능, 가볍다.
- error를 catch로 걸러내는 것이 귀찮다.

### axios

- 모듈 설치 필요
- 기능이 더 많고, 무겁다.

### jsonplaceholder 사용 (강의 임시 API)

https://jsonplaceholder.typicode.com/

## Fetch 방식

componentDidMount()에서 데이터를 가져와야한다.

```js
const getPostDataByJson = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => console.log(json));
};

useEffect(() => {
  getPostDataByJson();
}, []);
```

```
Array(100)
```

## Axios

```zsh
npm install --save axios
```

```js
import axios from 'axios';

// axios
const getPostDataByJsonAxios = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((res) => {
      console.log(res);
      setCardList(res.data);
    })
    .catch((error) => console.error(error));
};
```

```
{data: Array(100), config: {...}}
```

```js
// 초기 상태가 []여야 에러가 안난다.
const [cardList, setCardList] = useState([]);
```
