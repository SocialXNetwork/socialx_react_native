"use strict";

const path = require("path");
const cwd = path.resolve(__dirname);

function getRoots() {
  return [
    cwd,
    path.resolve(cwd, "../..")
  ];
}

const config = {
  getProjectRoots() {
    return getRoots();
  },
  getAssetRoots() {
    return getRoots();
  },
  extraNodeModules: {
    crypto: path.resolve(cwd, "./node_modules/react-native-crypto"),
    stream: path.resolve(cwd, "./node_modules/react-native-stream"),
    randombytes: path.resolve(cwd, "./node_modules/react-native-randombytes"),
    vm: path.resolve(cwd, "./node_modules/vm-browserify")
  },
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  }
};

module.exports = config;
