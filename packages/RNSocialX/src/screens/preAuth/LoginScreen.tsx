/**
 * old screen -> screens/LoginScreen/index.tsx
 * TODO list:
 * 1. Decide if we will have a verification step: code sent via SMS or email.
 * 2. (later) Get rid of navigation hacks!
 */

import * as React from 'react';
import { AsyncStorage, Keyboard } from 'react-native';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { IError, INavigationProps } from '../../types';
import { LoginScreenView } from './LoginScreen.view';

import {
	IWithLoginEnhancedActions,
	IWithLoginEnhancedData,
	WithLogin,
} from '../../enhancers/screens';

type ILoginScreenProps = INavigationProps & IWithLoginEnhancedData & IWithLoginEnhancedActions;

interface ILoginScreenState {
	errors: IError[];
}

class Screen extends React.Component<ILoginScreenProps, ILoginScreenState> {
	public static getDerivedStateFromProps(nextProps: ILoginScreenProps) {
		if (nextProps.errors.length > 0) {
			return {
				errors: nextProps.errors,
			};
		}

		return null;
	}

	public state = {
		errors: [],
	};

	private keyboardDidShowListener: any;

	public componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
	}

	public componentWillUnmount() {
		this.keyboardDidShowListener.remove();
	}

	public render() {
		const { getText } = this.props;

		return (
			<LoginScreenView
				errors={this.state.errors}
				onLogin={this.onLoginHandler}
				onNavigateToPasswordForgot={() => this.safeNavigateToScreen(SCREENS.ForgotPassword)}
				onNavigateToRegister={() => this.safeNavigateToScreen(SCREENS.Register)}
				onNavigateToUploadKey={() => this.safeNavigateToScreen('UploadKeyScreen')}
				onGoBack={this.onGoBackHandler}
				getText={getText}
			/>
		);
	}

	private keyboardDidShow = async (e: any) => {
		const keyboardHeight = await AsyncStorage.getItem('KEYBOARD_HEIGHT');
		if (!keyboardHeight) {
			await AsyncStorage.setItem('KEYBOARD_HEIGHT', e.endCoordinates.height.toString());
		}
	};

	private onLoginHandler = async (userName: string, password: string) => {
		const { login, loadFeed, resetNavigationToRoute, navigation } = this.props;

		this.setState({ errors: [] });
		this.switchActivityIndicator(true);
		await login(userName, password);
		if (this.state.errors.length > 0) {
			this.switchActivityIndicator(false);
		} else {
			await loadFeed();
			this.switchActivityIndicator(false);
			resetNavigationToRoute(NAVIGATION.Main, navigation);
		}
	};

	private safeNavigateToScreen = (screenName: string) => {
		Keyboard.dismiss();
		this.props.navigation.navigate(screenName);
	};

	private onGoBackHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack(null);
	};

	private switchActivityIndicator = (state: boolean) => {
		this.props.setGlobal({
			activity: {
				visible: state,
				title: this.props.getText('login.progress.message'),
			},
		});
	};
}

export const LoginScreen = (props: INavigationProps) => (
	<WithLogin>{({ data, actions }) => <Screen {...props} {...data} {...actions} />}</WithLogin>
);
