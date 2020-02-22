const path = require('path'); // 경로 조작, node 설치시 깔림
const webpack = require('webpack');

module.exports = {
  name: 'word-relay-setting',  // 웹팩 설정의 이름, 안써도 됨
  mode: 'development',  // 실서비스: production
  devtool: 'eval',      // 빠르게 하겠다?, 실서비스 hidden-source-map
  resolve: {  // 확장자를 적어주면 entry단에 확장자 기입 안해도 됨
    extensions: ['.js', '.jsx']
  },
  entry: {  // 입력
    app: ['./client'],

  },
  module: {
    rules: [{
      test: /\.jsx?/, // 규칙을 적용할 파일들, js, jsx파일들에 rule을 적용하겠다
      loader: 'babel-loader', // 적용할 룰 이름
      options: {  // babel의 옵션
        presets: [
          ['@babel/preset-env', {
            targets: {  // 원하는 브라우저를 타겟으로 하는 경우, 지원하고자 하는 브라우저를 지정하면 속도도 향상된다.
              browsers: ['> 5% in KR', 'last 2 chrome versions']
            },
            debug: true
          }],
          '@babel/preset-react'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties', // jsx에서 constructor 말고 바로 state 문법을 쓰려면 추가해야함
          'react-hot-loader/babel'
        ],
      }
    }]
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: { // 출력
    path: path.join(__dirname, 'dist'), //__dirname: 현재폴더, 현재 폴더안에 dist폴더를 합쳐줘라
    filename: 'app.js',
    publicPath: '/dist'
  }
};