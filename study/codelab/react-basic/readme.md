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

### 임시 API

- https://jsonplaceholder.typicode.com/
- https://my-json-server.typicode.com/

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

# Router

router는 `/user/${idx}` 같은 형태보다는 `/user?cardDetail=${idx}` 같은 형태로 쓴다.

```js
import Router from 'next/router';

//...
// 이동하는 페이지 최상단으로 가는 코드, 주로 이렇게 넣는다.
Router.push(`/cardDetail?idx=${idx}`).then(() => window.scrollTo(0, 0));
```

## withRouter

next 내장 모듈로 router 정보를 가져올 수 있다.

```js
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';

const CardDetailPage = (props) => {
  console.log(props); // router 정보가 props에 담겨온다.
  return <div></div>;
};

export default withRouter(CardDetailPage);
```

```js
// query를 찍어서 필요한 정보를 확인할 수 있다.
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';

const CardDetailPage = ({ router }) => {
  console.log(router.query);
  return <div></div>;
};

export default withRouter(CardDetailPage);
```

## Router를 하는 방법

1. 각 페이지에서 axios를 하는 방법
2. path와 파라메터를 server에서 새롭게 구성했음

   - 실제 이름이 다르더라도 특정 페이지로 이동할 수 있게 할 수 있음
   - 이렇게하면 주소창이 폴더, 파일 구성일텐데, 이런 정보가 노출되지 않고, 사용자가 파라메터를 바꿔가며 노출되면 안되는 정보를 가져가는것도 방지할 수 있나봄.
   - server.js에서 원하는 path를 지정하는 방법

3 server.js에서 axios를 하는 방법

4. getInitialProps에 대해서 공부해보기

- https://velog.io/@cyranocoding/Next-js-%EA%B5%AC%EB%8F%99%EB%B0%A9%EC%8B%9D-%EA%B3%BC-getInitialProps
- https://nextjs.org/docs/advanced-features/custom-app
- https://nextjs.org/docs/api-reference/data-fetching/getInitialProps

# API 도구

- swagger : api 작업자가 제공하면 좋다.
- postman : swagger 없고 주소만 있다면 postman을 써도 됨

# .env (닷엔브이이)

- 보안상 노출되는 정보들의 세팅을 숨길 수 있게 도와주는 환경 세팅 파일

# Hook

## useRef

- 특정한 element를 가져올 때 사용한다.
- https://ko.reactjs.org/docs/hooks-reference.html#useref

## useMemo

- 특정한 상태값을 function, 숫자값을 저장해 놓는 것
- 변화가 없으면 렌더링에 반영하지 않도록 해줌, function을 막는다거나 할때

## useCallback

- 거의 생활화 하듯이 씀
- 특정 컴포넌트가 변경되면 연결된 함수나 컴포넌트도 재렌더링이 되는데, 이를 방지하는 훅
- 귀찮더라도 해주는게 좋음
- 함수가 작성되면서 리랜더링 되는 이슈를 막아줌
- 성능에 중요함

```js
// cardListFetch.js
import { useEffect, useState, useCallback } from 'react';

// 기존에 작성한 함수를 useCallback으로 감싸고, 관련된 useState를 배열로 넣음
const handleClickCard = useCallback(
  (idx) => {
    // Router.push(`/cardDetail?idx=${idx}`).then(() => window.scrollTo(0, 0));
    setSelectedCard(idx);
    Router.push(`/detail/${idx}`);
    // Router.push(`/detail/${idx}`).then(() => window.scrollTo(0, 0));
    // Router.push((pathname: '/cardDetail/[idx]'), (query: { idx: 1 }));
  },
  [selectedCard]
);
```

해당 함수가 쓰이는 하위 component에서는 export defualt를 `React.memo`로 감싸줌

```js
// card.js
export default React.memo(CardComponent);
```

# custom hook

- 반복적으로 사용하는 기능을 독립적으로 사용하도록 뽑아놓음
- 본인만의 훅 만들기
- form을 통으로 모든 기능을 담아서 훅으로 만드는건 엄청 어렵다. 차라리 input 같은걸 훅으로 만들어라
- 입력을 받아 state로 반환이 가능하다면 훅으로 만들어라
- https://donis-note.medium.com/react-%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%9B%85-custom-hook-210f5226cebf

# redux

- 상태관리를 글로벌하게 관리함
- 하나의 컴포넌트에 갇힌 state를 밖으로 끌어내줌
- 하나의 스토어를 갖는다.
- 상태는 불변성을 갖는다.
- redux saga는 redux와 결합하는 미들웨어이다.
  - api나 데이터 관리에 좋은 미들웨어
  - 비동기 처리를 자연스럽게 처리가능, redux의 단점이기도 함

# 컴포넌트를 나누는 기준

- 컴포넌트를 잘게 나눌때마다 state를 활용하는 부담이 늘어날 수 밖에 없다.
- 구조적인 설계의 정답은 없다.
- 자신만의 기준과 좀더 세부적으로 나누려면 state를 local 단위로 쓰면 안된다.
- state를 global하게 관리하면서, 재사용 컴포넌트를 쪼개는 고민을 해야한다.
- 초급 단계이고 컴포넌트 설계를 잘 모른다면, 한 페이지에서 컴포넌트를 만들어라. 쪼개지 말고.

# Redux

| https://ko.redux.js.org/

## Redux가 필요한 이유

- 컴포넌트가 잘게 나뉘면 state를 local 단위로 활용할 수 없기때문에 이를 global하게 사용하는 것이 필요함
- Redux는 이른 state를 global하게 관리하는 context
- 자체가 가지는 범용성, 미들웨어를 사용할 수 있다.
- hook에서는 mobx 도 있다. redux에 비해 쉽다.
- flux 구조에서 시작했다.
- flux와 다르게 하나의 store를 가진다. 패턴이 더 단순하다.
- reducer는 여러개 생길수 있다.
- hook의 useReducer와 비슷하다. 이게 Redux의 구조를 가져왔음
- redux는 페이지에서는 잘 쓰지 않고, 컴포넌트 단위에서 쓴다.
- action과 reducer는 주로 분리해서 쓴다.
- reducer를 쪼개는 기준은 재사용성, 독립적인 기능 단위로 고려한다.
- 액션함수의 네이밍은 다른 reducer에서도 같은 네이밍을 쓸 수 있겠지만, 넘겨주는 인자가 다른 액션객체, 페이로드가 다르면 조건문에 따라 다르게 반영할 수 있다. (무슨 말이지?)

## Flux

- Redux의 시작

<img width="926" alt="스크린샷 2020-12-06 오전 11 04 54" src="https://user-images.githubusercontent.com/26196090/101269538-22f3aa80-37b3-11eb-99ac-7e164b851617.png">

### Redux 구조

- store : 가상으로 redux가 생성함, 이를 우리가 만든 app에 provider 형태로 제공됨
- reducer : action의 정의, initial State, action, action func을 담는 개념, 컴바인하는 폴더로 존재함, 내부에 initial state, action함수를 세팅함
- components: dispatch와 action함수를 이용해서 상태값을 연결함

## Redux 설치

```zsh
npm install --save-dev redux react-redux redux-devtools-extension next-redux-wrapper
```

## Redux middleware
