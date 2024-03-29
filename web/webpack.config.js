const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname, '../');
// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(js|ts|tsx|jsx)$/,
  exclude: /\.(android|ios|native)\.(js|ts|tsx|jsx)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src/'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
    path.resolve(appDirectory, 'node_modules/react-native-shadow-2'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
      // Re-write paths to import only the modules needed by the app
      plugins: [
        'react-native-web',
        [
          'module-resolver',
          {
            alias: {
              '^react-native$': 'react-native-web',
              '^reactotron-react-native$': 'reactotron-react-js',
              env: path.resolve(appDirectory, 'env.ts'),
              '~apis': path.resolve(appDirectory, './src/apis'),
              '~screens': path.resolve(appDirectory, './src/screens'),
              '~configs': path.resolve(appDirectory, './src/configs'),
              '~stores': path.resolve(appDirectory, './src/stores'),
              '~components': path.resolve(appDirectory, './src/components'),
              '~utils': path.resolve(appDirectory, './src/utils'),
              '~providers': path.resolve(appDirectory, './src/providers'),
              '~hooks': path.resolve(appDirectory, './src/hooks'),
            },
          },
        ],
      ],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  loader: 'file-loader', // or directly file-loader
  include: path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
};

module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js'),
  ],

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
  },

  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      ttfLoaderConfiguration,
    ],
  },
  resolve: {
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx', '.web.tsx'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  devServer: {
    historyApiFallback: true,
    port: 9000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
};
