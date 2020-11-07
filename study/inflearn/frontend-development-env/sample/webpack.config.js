const path = require('path'); // node의 path 모듈

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve('./dist'), // output directory (absolute path)
    filename: '[name].js', // output파일을 동적으로 생성 가능
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader', // 로더의 이름을 지정
        options: {
          publicPath: './dist', // file-loader가 처리하는 파일을 모듈로 사용했을때 경로 앞에 추가되는 문자열
          name: '[name].[ext]?[hash]', // file-loader가 파일을 output에 추가할때 사용하는 파일명을 지정함
          limit: 20000, // 2KB 미만의 파일은 url-loader로 이용해 base64로 변환한다.
        },
      },
    ],
  },
};