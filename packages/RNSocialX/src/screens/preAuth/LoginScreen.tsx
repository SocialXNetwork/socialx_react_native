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
import { LoginScreenView } from './LoginScreen.view';

interface IProps extends INavigationProps, IWithLoginEnhancedData, IWithLoginEnhancedActions {
	onGoBack: () => void;
}

interface IState {
	error: boolean;
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		error: false,
	};

	private keyboardDidShowListener: EmitterSubscription | null = null;

	public componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
	}

	public componentDidUpdate() {
		const { resetNavigationToRoute, navigation, globals } = this.props;
		const { profileLoaded, friendsLoaded, postsLoaded } = globals;

		if (!this.state.error && profileLoaded && friendsLoaded && postsLoaded) {
			this.switchActivityIndicator(false);
			resetNavigationToRoute(NAVIGATION.Home, navigation);
		}

		if (!this.state.error && this.props.errors.length > 0) {
			this.switchActivityIndicator(false);
			this.setState({ error: true });
		}
	}

	public componentWillUnmount() {
		if (this.keyboardDidShowListener) {
			this.keyboardDidShowListener.remove();
		}
	}

	public render() {
		return (
			<LoginScreenView
				dictionary={this.props.dictionary}
				onLogin={this.onLoginHandler}
				onNavigateToPasswordForgot={() => this.safeNavigateToScreen(SCREENS.ForgotPassword)}
				onNavigateToRegister={() => this.safeNavigateToScreen(SCREENS.Register)}
				onGoBack={this.props.onGoBack}
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
		this.setState({ error: false });
		this.switchActivityIndicator(true);
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
	<WithNavigationHandlers navigation={props.navigation}>
		{(nav) => (
			<WithLogin>
				{({ data, actions }) => (
					<Screen {...props} {...data} {...actions} onGoBack={nav.actions.onGoBack} />
				)}
			</WithLogin>
		)}
	</WithNavigationHandlers>
);
