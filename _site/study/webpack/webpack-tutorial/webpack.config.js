const path = require('path'); // native 경로가 없다는 것은 node가 제공하는 라이브러리
module.exports = {
  mode: 'development',
  entry: './app.js',  // 시작 지점
  output: {
    // path.resolve : bundle 파일의 위치를 만들어라
    // __dirname : 현재 디렉토리, console.log(__dirname); 해보면 나옴
    // 현재 디렉토리에 dist 폴더 생성
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/, // css 파일이나 텍스트를 만나면
        use: [          // 이것으로 처리해라
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}