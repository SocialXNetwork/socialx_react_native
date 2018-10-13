/**
 * TODO list:
 * 1. Move splash screen to where proper screen is loaded after app is started.
 */

import * as React from 'react';
import SplashScreen from 'react-native-smart-splash-screen';

export default class Splash extends React.Component<{}> {
	public componentDidMount() {
		SplashScreen.close({
			animationType: SplashScreen.animationType.fade,
			duration: 1000,
			delay: 100,
		});
	}

	public render() {
		return this.props.children;
	}
}
