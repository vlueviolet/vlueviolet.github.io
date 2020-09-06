# 프론트엔드 개발환경의 이해와 실습 (webpack, babel, eslint..)

## node.js가 필요한 이유

[프론트엔드 개발환경의 이해: NPM](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)

- 최신 스펙으로 개발
  - js 스펙 대비 브라우저 지원속도의 뒤쳐짐, 이에 대한 바벨 필요
  - Typescript, sass 등 고수준 프로그래밍 언어 전용 트랜스파일러 필요
- 빌드 자동화
  - 파일 압축, 코드 난독화, 브라우저 대응 폴리필 추가 등 과정 필요
  - 각종 테스트 자동화
- 개발 환경 커스터마이징
  - CLI 적용이 어려운 환경에서 직접 개발 환경 구축 필요

## node.js 설치

[node.js](https://nodejs.org/ko/)


| 구분 | LTS | Current |
|---|---|---|
| 의미 | Long Term Support<br>오랜 기간 지원, 2년<br>주로 짝수 | 현재 개발 버전<br>주로 홀수(가끔 짝수) |
| 내용 | - 취약점 패치, 개선 사항에 대한 패치 등 지원<br>- 안정적 | - 해당 버전에 존재하는 기능이<br>패치를 통해 사라지거나 변경되어<br>새로 코드를 작성해야할 가능성이 존재하는 버전<br>-불안정 |
| 사용 | 서버 구성시 | 개발환경 구성시 |

## 프로젝트 생성

```zsh
npm init                # 프로젝트 생성, 메타정보 입력 가능, package.json 생성
npm view react versions # react 버전 전체
```

## 패키지 설치

### CDN(Contents Delivery Network) 이용
javascript, css 라이브러리를 빠르게 제공하는 서버
CDN 서버 장애 발생시 사용 불가한 단점

### NPM 이용
개발자가 수동으로 라이브러리 코드를 가져올 경우, 해당 라이브러리의 업데이트 시마다 같은 작업을 반복해야하고, 휴먼에러가 발생할 수 있어 npm을 이용해서 의존성을 관리하는 것이 좋다.

버전 관리는 아래 내용을 참고하자.

### node.js의 버전 관리 방식
[강의 - 유의적 버전](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html#54-%EC%9C%A0%EC%9D%98%EC%A0%81-%EB%B2%84%EC%A0%84)

node는 유의적 버전에 따라 패키지의 버전을 관리하고 있다.

버전 번호를 관리하기 위한 규칙 : [link](https://semver.org/lang/ko/)

유의적 버전은 주(Major), 부(Minor), 수(Patch) 세 가지 숫자를 조합해서 버전을 관리한다.  

```zsh
1.2.3     # 주 버전 1, 부 버전 2, 수 버전 3
```

각 버전을 변경하는 기준은 다음과 같다.

- 주 버전(Major Version): 기존 버전과 호환되지 않게 변경한 경우
- 부 버전(Minor version): 기존 버전과 호환되면서 기능이 추가된 경우
- 수 버전(Patch version): 기존 버전과 호환되면서 버그를 수정한 경우


#### 버전의 범위
```zsh
>1.2.3    # 1.2.4부터 설치
>=1.2.3   # 1.2.3부터 설치
<1.2.3    # 1.2.2까지 버전 설치
<=1.2.3   # 1.2.3까지 버전 설치
```

```
~1.2.3    # 1.2.3 ~ 1.3.0 미만
~0        # 0.0.0 ~ 1.0.0 미만
```

틸트(~)는 마이너 버전이 명시되어 있으면 패치버전만 변경한다.  
예를 들어 `~1.2.3` 표기는 1.2.3 부터 1.3.0 미만 까지를 포함한다.  
마이너 버전이 없으면 마이너 버전을 갱신한다. ~0 표기는 0.0.0부터 1.0.0 미만 까지를 포함한다.  

```zsh
^1.2.3    # 1.2.3 ~ 2.0.0 미만
^0        # 0.0.0 ~ 0.1.0 미만
```

캐럿(^)은 정식버전에서 마이너와 패치 버전을 변경한다. 예를 들어 ^1.2.3 표기는 1.2.3부터 2.0.0 미만 까지를 포함한다. 정식버전 미만인 0.x 버전은 패치만 갱신한다. ^0 표기는 0.0.0부터 0.1.0 미만 까지를 포함한다.


## webpack

### 웹팩의 배경
https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html

전역함수를 이용해 함수를 구현했다고 하자.
```javascript
function sum() {};
```
이 함수는 다른 파일에서도 접근이 되기때문에 타입을 함수에서 boolean, number로 바꿀 수도 있어 오염될 수 있다.
```javascript
function sum() {};

sum = 1; // or true로 변경도 가능하다.
```

이를 해결하기위해 `IIFE 모듈`을 통해 함수 스코프를 만들어 외부에서 접근하는 것을 방지할 수 있다.

```javascript
(function() {
  function sum() {};
})();
```

### 다양한 모듈 스펙
이런 방식으로 javascript 모듈을 구현하는 대표적인 명세가 *AMD*와 *CommonJS*다.

- *[CommonJS](http://www.commonjs.org/)*  
자바스크립트를 사용하는 모든 환경에서 모듈을 하는 것이 목표다. exports 키워드로 모듈을 만들고 require() 함수로 불러 들이는 방식이다. 대표적으로 서버 사이드 플래폼인 Node.js에서 이를 사용한다.

```javascript
// math.js
exports function sum(a, b) { return a + b; }

// app.js
const math = require("./math.js")
math.sum(1, 2) // 3
```

- *[AMD(Asynchronous Module Definition)](https://github.com/amdjs/amdjs-api/wiki/AMD)*  
비동기로 로딩되는 환경에서 모듈을 사용하는 것이 목표다. 주로 브라우져 환경이다.

- *[UMD(Universal Module Definition)](https://github.com/umdjs/umd)*  
AMD기반으로 CommonJS 방식까지 지원하는 통합 형태다.

### ES2015에서 표준 모듈 시스템
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

이렇게 각 커뮤니티에서 각자의 스펙을 제안하다 ES2015에서 표준 모듈 시스템을 내 놓았다. 지금은 바벨과 웹팩을 이용해 모듈 시스템을 사용하는 것이 일반적이다. ES2015 모듈 시스템의 모습을 살펴보자.


`export` 구문으로 함수 모듈을 만들고, `import` 구문으로 가져올 수 있다.

```javascript
// math.js
export function sum(a, b) {
  return a + b
}

// app.js
import * as math from "./math.js";
// or {}
// import { sum } from "./math.js";
math.sum(1, 2) // 3
```

### 브라우져의 모듈 지원
export-import 방식을 모두 지원하지는 않는다.  
크롬에서 모듈 방식을 사용하려면, `type`을 지정해야 한다.

```javascript
<script type="module" src="app.js"></script>
```

크롬 뿐만 아니라, 모든 브라우저에서 이런 모듈 방식을 사용하고 싶을때  
웹팩을 사용하면 된다.

### 웹팩의 역할
모듈로 연결된 여러개의 js 파일을 하나로 합쳐준다.  
하나로 합쳐진 파일을 `번들`이라고 하며, 웹팩은 `번들러` 역할을 한다.

#### 기본 패키지 설치
- 번들 작업을 위한 패키지 : webpack
- 웹팩 터미널 도구, 웹팩을 터미널 명령어로 사용하게 해주는 패키지 : webpack-cli 

```zsh
$ npm install -D webpack webpack-cli
```

설치 완료하면 `node_modules/.bin` 폴더에 실행 가능한 명령어가 몇 개 생긴다. webpack과 webpack-cli가 있는데 둘 중 하나를 실행하면 된다. `--help` 옵션으로 사용 방법을 확인해 보자.

웹팩 실행을 위한 필수 옵션 3가지
- `--mode`: 개발환경, 배포환경이냐에 따라 `development`, `production`로 설정하면 됨
- `--entry`: 모듈의 시작점
- `--output`: entry를 시작으로 번들이 되는 결과를 지정


```zsh
node_modules/.bin/webpack --help
Config options:
  --mode                 Enable production optimizations or development hints.
                                     [선택: "development", "production", "none"]

Basic options:
  --entry      The entry point(s) of the compilation.                   [문자열]

Output options:
  --output, -o                  The output path and file for compilation assets
```

이를 이용해서 옵션을 조합할 수 있다.

```zsh
node_modules/.bin/webpack --mode development --entry ./src/app.js --output dist/main.js

```


### webpack 설정 파일 (webpack.config.js)
위와 같이 webpack 실행은 옵션을 조합하여 command 창에 입력하는 방법과  
별도의 설정파일을 이용할 수도 있다.  
help에서 관련 내용을 살펴보자.

```zsh
node_modules/.bin/webpack --help
webpack-cli 3.3.12

Usage: webpack-cli [options]
       webpack-cli [options] --entry <entry> --output <output>
       webpack-cli [options] <entries...> --output <output>
       webpack-cli <command> [options]

For more information, see https://webpack.js.org/api/cli/.

Config options:
  --config               Path to the config file
                            [문자열] [기본: webpack.config.js or webpackfile.js]
```

```javascript
const path = require('path'); // node의 path 모듈

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
    main2: './src/app2.js'
  },
  output: {
    path: path.resolve('./dist'),  // output directory (absolute path)
    filename: '[name].js', // output파일을 동적으로 생성 가능 → main.js, main2.js
  }
};
```

build를 위해 package.json에 build 명령어를 추가해보자.

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack"
},
```