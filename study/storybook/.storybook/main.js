const path = require('path');
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  stories: ['../src/**/**/*.stories.@(md)x'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../src'),
    ];

    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@': path.resolve(__dirname, '../src'),
    // };

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

    const fileLoaderRule = config.module.rules.find(
      (rule) => !Array.isArray(rule.test) && rule.test.test('.svg')
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|jsx|tsx)$/,
      include: /svg/,
      exclude: /node_modules/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(scss)$/,
      loader: 'url-loader',
    });

    return config;
  },
};
