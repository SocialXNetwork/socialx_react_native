"use strict";

const path = require("path");

const getMod = (module) => path.resolve(__dirname, `./node_modules/${module}`);

const config = {
  getProjectRoots() {
    return [
      path.resolve(__dirname),
      path.resolve(__dirname, "../commons"),
      path.resolve(__dirname, "../api-storage"),
      path.resolve(__dirname, "../api-blockchain"),
      path.resolve(__dirname, "../api-data"),
      path.resolve(__dirname, "../webview-crypto"),
    ];
  },
  getAssetRoots() {
    return [
      path.resolve(__dirname)
    ];
  },
  extraNodeModules: {
    'node-webcrypto-ossl': getMod('node-webcrypto-ossl'),
    'text-encoding': getMod('text-encoding'),
  },
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  }
};

module.exports = config;
