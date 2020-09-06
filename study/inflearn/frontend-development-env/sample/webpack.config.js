const path = require('path'); // node의 path 모듈

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js'
  },
  output: {
    path: path.resolve('./dist'),  // output directory (absolute path)
    filename: '[name].js', // output파일을 동적으로 생성 가능
  }
};