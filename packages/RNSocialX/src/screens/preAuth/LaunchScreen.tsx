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

type IProps = INavigationProps & IWithLaunchEnhancedData & IWithLaunchEnhancedActions;

class Screen extends React.Component<IProps> {
	private cryptoLoadedInterval: NodeJS.Timer = setInterval(() => undefined, 0);
	private loginTimeout: NodeJS.Timer = setTimeout(() => undefined, 0);

	public async componentDidMount() {
		const { login, globals, auth } = this.props;

		if (auth && !globals.logout) {
			this.cryptoLoadedInterval = setInterval(async () => {
				// @ts-ignore
				if (window.crypto.loaded) {
					clearInterval(this.cryptoLoadedInterval);
					this.loginTimeout = setTimeout(async () => {
						await login({
							username: auth.alias || '',
							password: auth.password || '',
						});
					}, 200);
				}
			}, 500);
		}
	}

	public componentDidUpdate() {
		const { maintenance, globals, navigation, resetNavigationToRoute } = this.props;
		const { profileLoaded, friendsLoaded, postsLoaded, logout } = globals;

		if (!logout && profileLoaded && friendsLoaded && postsLoaded) {
			clearTimeout(this.loginTimeout);

			if (__DEV__) {
				resetNavigationToRoute(NAVIGATION.Home, navigation);
			} else {
				if (maintenance) {
					resetNavigationToRoute(NAVIGATION.Maintenance, navigation);
				} else {
					resetNavigationToRoute(NAVIGATION.Home, navigation);
				}
			}
		}
	}

	public render() {
		const { dictionary, auth, globals } = this.props;
		const { accountLoaded, profileLoaded, friendsLoaded, postsLoaded, logout } = globals;
		const loading = {
			accountLoaded,
			profileLoaded,
			friendsLoaded,
			postsLoaded,
		};

		// @ts-ignore
		if (!window.crypto.loaded) {
			return <View />;
		} else if (auth && !logout) {
			return <LoadingScreen loading={loading} dictionary={dictionary} />;
		} else {
			return (
				<LaunchScreenView
					dictionary={dictionary}
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

export const LaunchScreen = (props: INavigationProps) => (
	<WithLaunch>{({ data, actions }) => <Screen {...props} {...data} {...actions} />}</WithLaunch>
);
