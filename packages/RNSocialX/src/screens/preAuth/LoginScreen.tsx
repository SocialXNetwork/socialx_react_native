import * as React from 'react';
import { AsyncStorage, EmitterSubscription, Keyboard } from 'react-native';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import {
	IWithLoginEnhancedActions,
	IWithLoginEnhancedData,
	WithLogin,
} from '../../enhancers/screens';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { LoadingScreen } from './LoadingScreen';
import { LoginScreenView } from './LoginScreen.view';

interface IProps extends INavigationProps, IWithLoginEnhancedData, IWithLoginEnhancedActions {
	onGoBack: () => void;
}

interface IState {
	error: boolean;
	loggingIn: boolean;
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		error: false,
		loggingIn: false,
	};

	private keyboardDidShowListener: EmitterSubscription | null = null;

	public componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
	}

	public componentDidUpdate() {
		const { resetNavigationToRoute, navigation, globals, auth } = this.props;
		const { profileLoaded, friendsLoaded, postsLoaded } = globals;

		// if (auth) {
		// 	this.switchActivityIndicator(false);
		// }

		if (!this.state.error && profileLoaded && friendsLoaded && postsLoaded) {
			// this.switchActivityIndicator(false);
			resetNavigationToRoute(NAVIGATION.Home, navigation);
		}

		if (!this.state.error && this.props.errors.length > 0) {
			// this.switchActivityIndicator(false);
			this.setState({ error: true, loggingIn: false });
		}
	}

	public componentWillUnmount() {
		if (this.keyboardDidShowListener) {
			this.keyboardDidShowListener.remove();
		}
	}

	public render() {
		const { globals, dictionary, auth } = this.props;
		const { profileLoaded, friendsLoaded, postsLoaded, accountLoaded } = globals;
		const loading = {
			accountLoaded,
			profileLoaded,
			friendsLoaded,
			postsLoaded,
		};
		if (auth) {
			return <LoadingScreen loading={loading} dictionary={dictionary} />;
		}
		return (
			<LoginScreenView
				dictionary={this.props.dictionary}
				onLogin={this.onLoginHandler}
				onNavigateToPasswordForgot={() => this.safeNavigateToScreen(SCREENS.ForgotPassword)}
				onNavigateToRegister={() => this.safeNavigateToScreen(SCREENS.Register)}
				onGoBack={this.props.onGoBack}
				loginDisabled={this.state.loggingIn}
			/>
		);
	}

	private keyboardDidShow = async (e: any) => {
		const keyboardHeight = await AsyncStorage.getItem('KEYBOARD_HEIGHT');
		if (!keyboardHeight) {
			await AsyncStorage.setItem('KEYBOARD_HEIGHT', e.endCoordinates.height.toString());
		}
	};

	private onLoginHandler = async (alias: string, password: string) => {
		this.setState({ error: false, loggingIn: true });
		// this.switchActivityIndicator(true);
		await this.props.login(alias, password);
	};

	private safeNavigateToScreen = (screenName: string) => {
		Keyboard.dismiss();
		this.props.navigation.navigate(screenName);
	};

	private switchActivityIndicator = (state: boolean) => {
		const { dictionary, setGlobal } = this.props;

		setGlobal({
			activity: {
				visible: state,
				title: dictionary.screens.login.progress,
			},
		});
	};
}

export const LoginScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{(nav) => (
			<WithLogin>
				{({ data, actions }) => (
					<Screen {...props} {...data} {...actions} onGoBack={nav.actions.onGoBack} />
				)}
			</WithLogin>
		)}
	</WithNavigationHandlers>
);
