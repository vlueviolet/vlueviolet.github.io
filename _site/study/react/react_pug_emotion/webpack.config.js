const paths = require('./paths');

module.exports = {
  entry: '...',
  output: { /* ... */ },
  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.pug$/,  // 1. exclude pug files from file-loader        ← add this line
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // 2. add pug loader                                           ← add this block below
      {
        test: /\.pug$/,
        include: paths.appSrc,
        use: [
          require.resolve('babel-loader'),
          require.resolve('pug-as-jsx-loader'),
        ],
      },
      // // 2. add pug loader
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
};