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
