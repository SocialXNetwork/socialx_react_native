import React from 'react';
import { StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Orientation from 'react-native-orientation';

import { Animations, Colors } from '../environment/theme';

export default class Splash extends React.Component {
	componentDidMount() {
		Animatable.initializeRegistryWithDefinitions(Animations.custom as any);
		Orientation.lockToPortrait();
	}

	public render() {
		return <StatusBar barStyle="light-content" backgroundColor={Colors.pink} />;
	}
}
