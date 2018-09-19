/**
 * TODO list:
 * 1. @Serkan, refactor logic in componentDidMount to select correct screen after app launch
 */

import * as React from 'react';
import {LaunchScreenView} from './LaunchScreen.view';

import SplashScreen from 'react-native-smart-splash-screen';
import {IWithLaunchEnhancedActions, IWithLaunchEnhancedData, WithLaunch} from '../../enhancers/screens';
import {INavigationProps} from '../../types';

type ILaunchScreenProps = INavigationProps & IWithLaunchEnhancedData & IWithLaunchEnhancedActions;

class Screen extends React.Component<ILaunchScreenProps, any> {
	public componentDidMount() {
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

export const LaunchScreen = (navProps: INavigationProps) => (
	<WithLaunch>{({data, actions}) => <Screen {...navProps} {...data} {...actions} />}</WithLaunch>
);

// @ts-ignore
LaunchScreen.navigationOptions = {
	header: null,
};
