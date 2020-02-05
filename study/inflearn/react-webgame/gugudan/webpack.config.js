const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  resolve: {  // 확장자를 적어주면 entry단에 확장자 기입 안해도 됨
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: './client'
  },
  module : {
    rules: [{
      test: /\.jsx?/, // 규칙을 적용할 파일들, js, jsx파일들에 rule을 적용하겠다
      loader: 'babel-loader', // 적용할 룰 이름
      options: {  // babel의 옵션
        presets: [
          ['@babel/preset-env', {
            targets: {  // 원하는 브라우저를 타겟으로 하는 경우, 지원하고자 하는 브라우저를 지정하면 속도도 향상된다.
              browsers: ['> 1% in KR']
            },
            debug: true
          }],
          '@babel/preset-react'
        ],
      }
    }]
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    path: path.join(__dirname, 'dist'), //__dirname: 현재폴더, 현재 폴더안에 dist폴더를 합쳐줘라
    filename: 'app.js'
  }
}