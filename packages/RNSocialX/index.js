import './globals';
import React from 'react';
import { AppRegistry } from 'react-native';

import { App } from './src/app';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

console.disableYellowBox = true; // we should get this warning in debugger and not over the screen in the app.
