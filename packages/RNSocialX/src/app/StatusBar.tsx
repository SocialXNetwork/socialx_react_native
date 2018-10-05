import React from 'react';
import { Platform, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Orientation from 'react-native-orientation';
import { OS_TYPES } from '../environment/consts';
import { Animations, Colors } from '../environment/theme';

export default class Splash extends React.Component<{}> {
	componentDidMount() {
		if (Platform.OS === OS_TYPES.Android) {
			StatusBar.setBackgroundColor(Colors.pink);
		}
		Animatable.initializeRegistryWithDefinitions(Animations.custom as any);
		Orientation.lockToPortrait();
	}

	public render() {
		return <StatusBar barStyle={'light-content'} />;
	}
}
