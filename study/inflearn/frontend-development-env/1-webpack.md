# Webpack

## 웹팩의 역할
모듈로 연결된 여러개의 js 파일을 하나로 합쳐준다.  
하나로 합쳐진 파일을 `번들`이라고 하며, 웹팩은 `번들러` 역할을 한다.

### 기본 패키지 설치
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
$ node_modules/.bin/webpack --help
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
$ node_modules/.bin/webpack --mode development --entry ./src/app.js --output dist/main.js

```


## webpack 설정 파일 (webpack.config.js)
위와 같이 webpack 실행은 옵션을 조합하여 command 창에 입력하는 방법과 별도의 설정파일을 이용할 수도 있다.  
help에서 관련 내용을 살펴보자.

```zsh
$ node_modules/.bin/webpack --help
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

## 엔트리(entry)와 아웃풋(output)
webpack.config.js는 웹팩 필수 옵션 3가지 중, `entry`와 `output` 작성 방법을 알아보자.

```javascript
// sample/webpack.config.js
const path = require('path'); // node의 path 모듈

module.exports = {
  mode: 'development',
  entry: {  // 여러개를 등록할 수 있다.
    main: './src/app.js', // 앞에 main 키는 output에서 파일명이 된다.
    main2: './src/app2.js',
    ...
  },
  output: {
    path: path.resolve('./dist'),  // output directory (absolute path)
    filename: '[name].js', // output파일을 동적으로 생성 가능 → main.js, main2.js
  }
};
```

### 구문 설명
- `module.exports` : 구문은 es6가 아닌 node에서 사용하는 모듈이다.
- `path` : node의 path 모듈
- `path.resolve` : path 모듈에서 절대경로를 계산해주는 함수
- `[name].js` : 동적으로 파일을 생성하기 위해 사용된 구문이다. entry에서 파일이 여러개 있을때, output에서 일일히 기입해주지 않아도 된다.ㄴ


build를 위해 package.json에 build 명령어를 추가해보자.

```json
// sample/package.json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack"
},
```

## 로더(Loader) 
웹팩은 js뿐 아니라 assets(style, image, font)들도 모듈로 인식하기때문에 import 구문을 사용하여 js안으로 불러올 수 있다.  

이것이 가능한 이유는 웹팩의 *로더*이다.  
로더는 모든 파일을 javascript의 모듈처럼 만들어준다.

css를 js파일 안에서 직접 로딩해서 사용할 수 있고, img파일을 data url 형식으로 변환하여 javascript에서 이미지 파일을 사용할 수 있게 해준다.

### 커스텀 로더 만들기

```javascript
// sample/my-webpack-loader.js
module.exports = function myWebpackLoader(content) {
  console.log('myWebpackLoader가 동작함');
  return content;
}
```

로더는 module.exports의 module객체의 rules 배열에 추가할 수 있다.

```javascript
// sample/webpack.config.js
module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        path.resolve('./my-webpack-loader.js')
      ]
    }
  ]
}
```

- `test` : loader가 처리해야하는 파일의 패턴, 정규식 표현
    - `/\.js$/` : js 확장자를 가진 파일은 이 로더로 돌리겠다.
- `use` : 사용할 로더를 명시, 위 예시에서는 모든 js를 `my-webpack-loader`으로 돌리겠다는 의미

`npm run build`를 실행하면 지정한 로더가 실행됨을 알 수 있다.

<img width="417" alt="스크린샷 2020-09-06 오후 5 38 51" src="https://user-images.githubusercontent.com/26196090/92321793-d7bce500-f067-11ea-8fc9-142bfbe87950.png">

2번의 문구가 찍히는 것은 js파일이 app.js, main.js 2개이기 때문이다.

이번엔, app.js의 console.log를 alert으로 바꿔주는 동작을 추가해보자.

```javascript
// sample/my-webpack-loader.js
module.exports = function myWebpackLoader(content) {
  return content.replace('console.log(', 'alert(');
}
```

<img width="447" alt="스크린샷 2020-09-06 오후 5 42 44" src="https://user-images.githubusercontent.com/26196090/92321869-63367600-f068-11ea-814f-3cb25f95e449.png">

얼럿이 뜨는 것을 확인할 수 있다.

### 정리
로더는 모든 파일을 처리하며, 처리할 파일의 패턴을 test에, 패턴에 해당하는 파일들은 use로 지정한 로더함수로 돌리도록 한다.

파일이 여러개라면, 로더함수도 여러번 실행될 것이다.

### 자주 사용하는 로더들

#### css-loader
js파일 안에서 css 파일을 아래와 같이 모듈로 불러올 수 있다.

```javascript
// sample/app.js
import './app.css';
```

es6구문의 import를 이용해 css를 가져오려면,  
css파일이 모듈이 되어야 하는데, 웹팩의 로더가 css파일을 모듈로 바꿔주는 역할을 하게 된다.

```css
/* sample/src/app.css */
body {
  background-color: green;
}
```

이 상태에서 빌드를 돌려보면, 다음과 같은 에러가 발생한다.
웹팩이 css 구문을 파싱할 수 없기 때문이다.

<img width="925" alt="스크린샷 2020-09-06 오후 5 50 17" src="https://user-images.githubusercontent.com/26196090/92321987-74cc4d80-f069-11ea-9705-2da39f7e1bba.png">

이처럼, javascript가 css를 모듈로 처리할 수 있도록 해주는 것이 바로 `css-loader`이다.


css-loader를 설치해보자.

```zsh
npm install css-loader
```

그리고 config 파일에 로더를 추가하자.

```javascript
// sample/webpack.config.js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['css-loader']
    }
  ]
}
```

웹팩은 엔트리 포인트부터 시작해 연결된 모든 모듈을 검색할 것이다.  
그러다가 css파일을 만나면 css-loader함수를 실행하여 css를 처리하도록 할 것이다.

<img width="412" alt="스크린샷 2020-09-06 오후 5 55 43" src="https://user-images.githubusercontent.com/26196090/92322101-33886d80-f06a-11ea-882b-6e95ecb6d98f.png">

<img width="663" alt="스크린샷 2020-09-06 오후 5 57 37" src="https://user-images.githubusercontent.com/26196090/92322149-83ffcb00-f06a-11ea-8a4e-60a6842cd276.png">

빌드 성공후, `./dist/main.js`에 보면, css가 문자열로 처리되어 있는 것을 알 수 있다.

하지만, 브라우저에서 body의 배경컬러는 변화가 없다.
html 코드가 DOM으로 변환되어야 브라우저에서 보이듯이,  
css코드도 CSSOM이라는 형태로 바뀌어야만 브라우저에서 확인할 수 있다.

그러려면, html에서 css파일을 직접 불러오거나, inline style로 넣어줘야하는데  
아직 그런 처리를 하지 않았기 때문에 브라우저에서 보이지 않는 것이다.

그래서 나온것이 `style-loader`이다.

### style-loader
javascript형태로 변환된 css를 html에 넣어주는 로더이다.  
즉, css를 javascript에 번들링하려면 `css-loader`, `style-loader`를 같이 사용해야 한다.

```zsh
npm install style-loader
```

로더는 한 파일에 여러개의 로더함수를 사용할 수 있는데,  
순서는 뒤 → 앞 순이다. `css-loader` 실행후, `style-loader`를 실행한다.

```javascript
// sample/webpack.config.js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }
  ]
}
```

<img width="698" alt="스크린샷 2020-09-06 오후 6 07 51" src="https://user-images.githubusercontent.com/26196090/92322398-ee653b00-f06b-11ea-9392-63d88d55f3c4.png">

빌드해보면, `<head>`에 inline style로 들어간 것을 확인할 수 있다.


### file-loader
로더는 이미지 파일도 모듈로 만들 수 있다.

css에 이미지를 배경으로 추가하고 빌드를 돌려보자.

```css
/* sample/app.css */
body {
  background-image: url(bg.png);
}
```

<img width="922" alt="스크린샷 2020-09-06 오후 6 12 23" src="https://user-images.githubusercontent.com/26196090/92322501-88c57e80-f06c-11ea-8745-182c243f12a8.png">

css를 처리하는 `css-loader`가 bg.png를 파싱하지 못해 발생했다.

이미지를 처리하는 로더를 설치해보자.

```zsh
npm install file-loader
```

```javascript
// sample/webpack.config.js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.png$/,
      use: [
        'file-loader'
      ]
    }
  ]
}
```

<img width="412" alt="스크린샷 2020-09-06 오후 6 15 52" src="https://user-images.githubusercontent.com/26196090/92322573-05f0f380-f06d-11ea-9567-b67c75888b6e.png">

빌드를 돌리면, dist폴더에 이미지가 넘어온 것을 볼 수 있다.  
파일명이 해쉬값으로 되었는데, 웹팩은 빌드를 할 때마다 고유한 값을 생성한다.

이는 캐쉬 갱신을 위함인데, 정적파일에 대해 브라우저가 성능 향상을 위해 이전에 로드된 파일을 다시 로드하지 않는 것에 대한 대응이다. 그래서 이런 대응을 위해 이름을 복잡하게 변경해버리는 것이다.


<img width="786" alt="스크린샷 2020-09-06 오후 6 20 16" src="https://user-images.githubusercontent.com/26196090/92322671-a2b39100-f06d-11ea-8ba2-6e60a159f4ec.png">

브라우저에서 확인해보니, 404 에러가 뜬다.  

index.html 기준으로 보면, bg.png는 src폴더 안에 있다. 그렇다보니 파일을 찾지 못하는 것이다.

로더 설정파일로 가서 경로를 다시 설정해보자.

```javascript
// sample/webpack.config.js
module: {
  rule: [
    {
      test: /\.png$/,
      loader: 'file-loader',  // 로더의 이름을 지정
      options: {
        publicPath: './dist',
        name: '[name].[ext]?[hash]'
      }
    }
  ]
}
```

- `publicPath` : file-loader가 처리하는 파일을 모듈로 사용했을때 경로 앞에 추가되는 문자열
- `name` : file-loader가 파일을 output에 추가할때 사용하는 파일명을 지정함
  - `[name].[ext]?[hash]` : [원본파일명].[확장자명]?[해쉬값: 캐쉬 무력화를 위해 쿼리 스트링으로 매번 달라지는 해쉬값]

<img width="1263" alt="스크린샷 2020-09-06 오후 6 28 18" src="https://user-images.githubusercontent.com/26196090/92322848-cdeab000-f06e-11ea-8741-49ca1dec6ffb.png">


빌드를 돌려보면, dist폴더에 bg.png가 생성된 것을 볼 수 있다.  
main.js에서 bg.png를 호출하는 구문을 보면 설정파일에서 지정한 대로 들어온 것을 볼 수 있다.

<img width="1106" alt="스크린샷 2020-09-06 오후 6 29 55" src="https://user-images.githubusercontent.com/26196090/92322873-fbcff480-f06e-11ea-8aef-8392569aa1c1.png">

브라우저에서도 잘 표현된다.


### url-loader
이미지 개수가 많을때, 개별적인 이미지를 받기보다 js파일 1개에 이미지를 넣어 번들처리 하는 것이 나은 경우가 있다.

`url-load`는 이미지를 Data URI Scheme을 이용해서 Base64형태로 인코딩하여 문자열 형태로 소스코드에 넣어주는 로더이다.  
또한, 파일의 크기를 제한하여 일정 크기 이상인 경우 `file-loader`로 위임하는 역할도 한다.

우선 이미지 파일을 기존의 `file-loader`로 다시 처리해보자. 이번엔 jpg이다.

```javascript
// sample/app.js
import './app.css';
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    <img src="${nyancat}">
  `;
});
```

```javascript
// sample/webpack.config.js
module: {
  rules: [
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader', // 로더의 이름을 지정
      options: {
        publicPath: './dist', // file-loader가 처리하는 파일을 모듈로 사용했을때 경로 앞에 추가되는 문자열
        name: '[name].[ext]?[hash]', // file-loader가 파일을 output에 추가할때 사용하는 파일명을 지정함
      },
    },
  ],
},
```

`file-load`에서 처리하는 확장자를 추가했다.  
그리고 빌드를 돌려보자.

<img width="1026" alt="스크린샷 2020-09-06 오후 7 11 51" src="https://user-images.githubusercontent.com/26196090/92323575-d6de8000-f074-11ea-84e2-9004ff06f863.png">

화면에 잘 나타난다.  

<img width="508" alt="스크린샷 2020-09-06 오후 7 13 01" src="https://user-images.githubusercontent.com/26196090/92323603-ffff1080-f074-11ea-9ac2-d01fc9900a00.png">

이미지 크기를 보자.

```zsh
ll src
```
<img width="508" alt="스크린샷 2020-09-06 오후 7 13 01" src="https://user-images.githubusercontent.com/26196090/92323603-ffff1080-f074-11ea-9ac2-d01fc9900a00.png">

nyancat처럼 작은 이미지들은 url-loader로 빌드해보자.

```zsh
npm install url-loader
```

기존에 작성한 `file-loader` 대신해 `url-loader`를 기입해준다.

```javascript
module: {
  rules: [
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader', // 로더의 이름을 지정
      options: {
        publicPath: './dist', // file-loader가 처리하는 파일을 모듈로 사용했을때 경로 앞에 추가되는 문자열
        name: '[name].[ext]?[hash]', // file-loader가 파일을 output에 추가할때 사용하는 파일명을 지정함
        limit: 20000,
      },
    },
  ],
},
```

- `limit` : 20KB 미만의 파일은 url-loader로 이용해 base64로 변환한다. 2KB 이상은 file-loader로 빌드 된다.
    - 20KB 이상인 bg.png는 file-loader로 인해 ./dist/bg.png로
    - 20KB 미만인 nyancat.jpg는 main.js로 들어갈 것이다.

<img width="1260" alt="스크린샷 2020-09-06 오후 7 21 07" src="https://user-images.githubusercontent.com/26196090/92323739-4143f000-f076-11ea-8f4a-962e22219841.png">

<img width="1029" alt="스크린샷 2020-09-06 오후 7 22 16" src="https://user-images.githubusercontent.com/26196090/92323749-4f920c00-f076-11ea-8305-6ec0f72f1593.png">

이미지가 base64로 인코딩되어 들어간 것을 볼 수 있다.