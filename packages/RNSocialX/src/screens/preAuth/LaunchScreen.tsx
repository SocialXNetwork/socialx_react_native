import * as React from 'react';
import { View } from 'react-native';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { LaunchScreenView } from './LaunchScreen.view';
import { LoadingScreen } from './LoadingScreen';

import {
	IWithLaunchEnhancedActions,
	IWithLaunchEnhancedData,
	WithLaunch,
} from '../../enhancers/screens';

type ILaunchScreenProps = INavigationProps & IWithLaunchEnhancedData & IWithLaunchEnhancedActions;

class Screen extends React.Component<ILaunchScreenProps> {
	private cryptoLoadedInterval: any;

	public async componentDidMount() {
		const {
			login,
			loadFeed,
			globals,
			auth,
			navigation,
			resetNavigationToRoute,
			applicationInMaintenanceMode,
		} = this.props;

		if (auth && !globals.logout) {
			this.cryptoLoadedInterval = setInterval(async () => {
				// @ts-ignore
				if (window.crypto.loaded) {
					clearInterval(this.cryptoLoadedInterval);
					setTimeout(async () => {
						await login({
							username: auth.alias || '',
							password: auth.password || '',
						});
						await loadFeed();

						if (__DEV__) {
							resetNavigationToRoute(NAVIGATION.Home, navigation);
						} else {
							if (applicationInMaintenanceMode) {
								resetNavigationToRoute(NAVIGATION.Maintenance, navigation);
							} else {
								resetNavigationToRoute(NAVIGATION.Home, navigation);
							}
						}
					}, 200);
				}
			}, 500);
		}
	}

	public render() {
		// @ts-ignore
		if (!window.crypto.loaded) {
			return <View />;
		}
		if (this.props.auth && !this.props.globals.logout) {
			return (
				<LoadingScreen loading={this.props.globals.loading} dictionary={this.props.dictionary} />
			);
		} else {
			return (
				<LaunchScreenView
					dictionary={this.props.dictionary}
					onNavigateToLogin={this.onNavigateToLoginHandler}
					onNavigateToRegister={this.onNavigateToRegisterHandler}
				/>
			);
		}
	}

	private onNavigateToLoginHandler = () => {
		this.props.navigation.navigate(SCREENS.Login);
	};

	private onNavigateToRegisterHandler = () => {
		this.props.navigation.navigate(SCREENS.Register);
	};
}

export const LaunchScreen = (navProps: INavigationProps) => (
	<WithLaunch>{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}</WithLaunch>
);
