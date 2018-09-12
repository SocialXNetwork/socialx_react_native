"use strict";

const path = require("path");

const config = {
  getProjectRoots() {
    return [
      path.resolve(__dirname),
      path.resolve(__dirname, "../commons"),
      path.resolve(__dirname, "../api-storage"),
      path.resolve(__dirname, "../api-blockchain"),
      path.resolve(__dirname, "../api-data")
    ];
  },
  getAssetRoots() {
    return [
      path.resolve(__dirname)
    ];
  },
  extraNodeModules: {
    crypto: path.resolve(__dirname, "./node_modules/react-native-crypto"),
    stream: path.resolve(__dirname, "./node_modules/react-native-stream"),
    randombytes: path.resolve(__dirname, "./node_modules/react-native-randombytes"),
    vm: path.resolve(__dirname, "./node_modules/vm-browserify")
  },
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  }
};

module.exports = config;
