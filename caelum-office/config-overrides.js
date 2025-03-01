const path = require('path');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify")
  };
  return config;
};