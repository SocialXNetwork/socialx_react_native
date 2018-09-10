/**
 * TODO list:
 * 1. currentUser
 * 2. applicationInMaintenanceMode
 * 3. resetNavigationToRoute, old repo. Internals/backend/actions/navigation.ts
 * 3.1 we can do this at the top level, without navigation
 */

import * as React from 'react';
import {LaunchScreenView} from './LaunchScreen.view';

import SplashScreen from 'react-native-smart-splash-screen';
import {NavigationScreenProp} from 'react-navigation';
import {ITranslatedProps} from '../../types';

export interface ILaunchScreenProps extends ITranslatedProps {
	navigation: NavigationScreenProp<any>;
	currentUser: any;
	applicationInMaintenanceMode: boolean;
	resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => void;
}

export class LaunchScreen extends React.Component<ILaunchScreenProps, any> {
	private static navigationOptions = {
		header: null,
	};

	public componentDidMount() {
		// TODO: @Serkan, refactor and don't use navigation, put at the top level

		const {currentUser, applicationInMaintenanceMode, resetNavigationToRoute} = this.props;
		if (currentUser) {
			if (__DEV__) {
				resetNavigationToRoute('MainScreen', this.props.navigation);
			} else {
				if (applicationInMaintenanceMode) {
					resetNavigationToRoute('Maintenance', this.props.navigation);
				} else {
					resetNavigationToRoute('MainScreen', this.props.navigation);
				}
			}
		}

		this.closeSplashScreen();
	}

	public render() {
		const {getText} = this.props;
		return (
			<LaunchScreenView
				getText={getText}
				navigateToLoginScreen={this.navigateToLoginScreen}
				navigateToSignUpScreen={this.navigateToSignUpScreen}
			/>
		);
	}

	private navigateToLoginScreen = () => {
		this.props.navigation.navigate('LoginScreen');
	};

	private navigateToSignUpScreen = () => {
		this.props.navigation.navigate('SignUpScreen');
	};

	private closeSplashScreen = () => {
		SplashScreen.close({
			animationType: SplashScreen.animationType.fade,
			duration: 1000,
			delay: 100,
		});
	};
}
