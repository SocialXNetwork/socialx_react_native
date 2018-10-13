import * as React from 'react';
import { View } from 'react-native';

import { Header } from '../../components';
import { NAVIGATION, SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { LaunchScreenView } from './LaunchScreen.view';

import {
	IWithLaunchEnhancedActions,
	IWithLaunchEnhancedData,
	WithLaunch,
} from '../../enhancers/screens';

type ILaunchScreenProps = INavigationProps &
	IWithLaunchEnhancedData &
	IWithLaunchEnhancedActions;

interface ILaunchScreenState {
	loggingIn: boolean | null;
}

class Screen extends React.Component<ILaunchScreenProps, ILaunchScreenState> {
	public static getDerivedStateFromProps(
		nextProps: ILaunchScreenProps,
		currentState: ILaunchScreenState,
	) {
		const {
			currentUser,
			applicationInMaintenanceMode,
			resetNavigationToRoute,
			globals,
			navigation,
			auth,
			recall,
			loggingIn,
		} = nextProps;

		if (auth && currentState.loggingIn === null && !globals.logout) {
			recall({ username: auth.alias || '', password: auth.password || '' });
			return {
				loggingIn: true,
			};
		}

		if (auth && currentState.loggingIn && !loggingIn && !globals.logout) {
			return {
				loggingIn: false,
			};
		}

		if (!currentState.loggingIn && currentUser) {
			if (__DEV__ && !globals.logout) {
				resetNavigationToRoute(NAVIGATION.Main, navigation);
				return null;
			} else {
				if (applicationInMaintenanceMode) {
					resetNavigationToRoute(NAVIGATION.Maintenance, navigation);
					return null;
				} else {
					if (!globals.logout) {
						resetNavigationToRoute(NAVIGATION.Main, navigation);
						return null;
					}
				}
			}
		}

		return null;
	}

	public state = {
		loggingIn: null,
	};

	public render() {
		if (this.props.auth) {
			return (
				<View style={{ flex: 1, backgroundColor: '#fff' }}>
					<Header />
				</View>
			);
		} else {
			return (
				<LaunchScreenView
					navigateToLoginScreen={this.navigateToLoginScreen}
					navigateToRegisterScreen={this.navigateToRegisterScreen}
					getText={this.props.getText}
				/>
			);
		}
	}

	private navigateToLoginScreen = () => {
		this.props.navigation.navigate(SCREENS.Login);
	};

	private navigateToRegisterScreen = () => {
		this.props.navigation.navigate(SCREENS.Register);
	};
}

export const LaunchScreen = (navProps: INavigationProps) => (
	<WithLaunch>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithLaunch>
);
