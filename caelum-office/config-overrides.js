const { override, addWebpackAlias, addBabelPlugin } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    'os': require.resolve('os-browserify/browser'),
    'crypto': require.resolve('crypto-browserify')
  }),
  addBabelPlugin('babel-plugin-styled-components')
);