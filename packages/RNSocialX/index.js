import './globals';
import React from 'react';
import { AppRegistry } from 'react-native';

import { App } from './src/app';
import StorybookUI from './storybook';

import { name as appName } from './app.json';

import { RUN_STORYBOOK } from 'react-native-dotenv';

if (__DEV__ && RUN_STORYBOOK === 'true') {
	console.log('App started in Storybook mode');
	AppRegistry.registerComponent(appName, () => StorybookUI);
} else {
	AppRegistry.registerComponent(appName, () => App);
}

console.disableYellowBox = true; // we should get this warning in debugger and not over the screen in the app.
