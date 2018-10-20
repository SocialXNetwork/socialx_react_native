import * as React from 'react';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { LaunchScreenView } from './LaunchScreen.view';
import { LoadingScreen } from './LoadingScreen';

import {
	IWithLaunchEnhancedActions,
	IWithLaunchEnhancedData,
	WithLaunch,
} from '../../enhancers/screens';

type ILaunchScreenProps = INavigationProps &
	IWithLaunchEnhancedData &
	IWithLaunchEnhancedActions;

class Screen extends React.Component<ILaunchScreenProps> {
	public async componentDidMount() {
		const {
			recall,
			loadPosts,
			globals,
			auth,
			navigation,
			resetNavigationToRoute,
			applicationInMaintenanceMode,
		} = this.props;

		if (auth && !globals.logout) {
			await recall({
				username: auth.alias || '',
				password: auth.password || '',
			});
			await loadPosts();

			if (__DEV__) {
				resetNavigationToRoute(NAVIGATION.Main, navigation);
			} else {
				if (applicationInMaintenanceMode) {
					resetNavigationToRoute(NAVIGATION.Maintenance, navigation);
				} else {
					resetNavigationToRoute(NAVIGATION.Main, navigation);
				}
			}
		}
	}

	public render() {
		if (this.props.auth) {
			return <LoadingScreen />;
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
