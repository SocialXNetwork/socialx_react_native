// import './globals'; // watch https://github.com/facebook/react-native/issues/20415 or find an alternative
import React from 'react';
import { AppRegistry } from 'react-native';

import { App } from './src/app';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
