const path = require('path');
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  stories: ['../src/**/**/*.stories.@(md)x'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.resolve.alias = {
      ...config.resolve.alias,
      '../': path.resolve(__dirname, '../src'),
    };

    config.module.rules.push({
      test: sassRegex,
      exclude: sassModuleRegex,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]__[hash:base64:5]',
            },
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            prependData: "@import 'global.scss';",
            sassOptions: {
              includePaths: ['./src/asset/scss'],
              sourceMap: true,
            },
          },
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: `./src/asset/scss/helper/**/*.scss`,
          },
        },
      ],
    });
    config.module.rules.push({
      test: sassModuleRegex,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]__[hash:base64:5]',
            },
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            prependData: "@import 'global.scss';",
            sassOptions: {
              includePaths: ['./src/asset/scss'],
              sourceMap: true,
            },
          },
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: `./src/asset/scss/helper/**/*.scss`,
          },
        },
      ],
    });
    return config;
  },
};
