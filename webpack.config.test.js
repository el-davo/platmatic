require('babel-register');
const devConfig = require('./webpack.config.development');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: devConfig.module.rules.slice(1)
  }
};
