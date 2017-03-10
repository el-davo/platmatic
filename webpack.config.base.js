import path from 'path';
import {CheckerPlugin} from 'awesome-typescript-loader';

export default {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['react-hot-loader', 'awesome-typescript-loader'],
        include: [path.resolve(__dirname, 'app')]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    modules: ['app', 'node_modules', 'webpack', 'browser', 'web', 'browserify', 'main'],
  },

  plugins: [
    new CheckerPlugin()
  ],

  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ]
};
