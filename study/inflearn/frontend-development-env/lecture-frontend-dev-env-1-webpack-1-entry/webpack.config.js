const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/app.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
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
};