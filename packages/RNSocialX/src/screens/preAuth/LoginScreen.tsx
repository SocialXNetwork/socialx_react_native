/**
 * old screen -> screens/LoginScreen/index.tsx
 * TODO list:
 * 1. Decide if we will have a verification step: code sent via SMS or email.
 * 2. (later) Get rid of navigation hacks!
 */

import * as React from 'react';
import { AsyncStorage, Keyboard } from 'react-native';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { LoginScreenView } from './LoginScreen.view';

import {
	IWithLoginEnhancedActions,
	IWithLoginEnhancedData,
	WithLogin,
} from '../../enhancers/screens';

type IProps = INavigationProps & IWithLoginEnhancedData & IWithLoginEnhancedActions;

interface IState {
	error: boolean;
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		error: false,
	};

	private keyboardDidShowListener: any;

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
		this.keyboardDidShowListener.remove();
	}

	public render() {
		return (
			<LoginScreenView
				onLogin={this.onLoginHandler}
				onNavigateToPasswordForgot={() => this.safeNavigateToScreen(SCREENS.ForgotPassword)}
				onNavigateToRegister={() => this.safeNavigateToScreen(SCREENS.Register)}
				onGoBack={this.onGoBackHandler}
				dictionary={this.props.dictionary}
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

	private onGoBackHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack();
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
	<WithLogin>{({ data, actions }) => <Screen {...props} {...data} {...actions} />}</WithLogin>
);
