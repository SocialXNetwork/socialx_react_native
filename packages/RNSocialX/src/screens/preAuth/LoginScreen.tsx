/**
 * old screen -> screens/LoginScreen/index.tsx
 * TODO list:
 * 1. Decide if we will have a verification step: code sent via SMS or email.
 * 2. (later) Get rid of navigation hacks!
 */

import * as React from 'react';
import { Keyboard } from 'react-native';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { IError, INavigationProps } from '../../types';
import { LoginScreenView } from './LoginScreen.view';

import {
	IWithLoginEnhancedActions,
	IWithLoginEnhancedData,
	WithLogin,
} from '../../enhancers/screens';

type ILoginScreenProps = INavigationProps &
	IWithLoginEnhancedData &
	IWithLoginEnhancedActions;

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

	public async componentDidMount() {
		const { setGlobal, getText } = this.props;

		setGlobal({
			activity: {
				title: getText('login.progress.message'),
			},
		});
	}

	public render() {
		const {
			getText,
			login,
			loadPosts,
			resetNavigationToRoute,
			navigation,
		} = this.props;
		return (
			<LoginScreenView
				errors={this.state.errors}
				onStartLogin={async (userName, password) => {
					await login(userName, password);
					await loadPosts();
					await this.setState({ errors: [] });
					resetNavigationToRoute(NAVIGATION.Main, navigation);
				}}
				onNavigateToPasswordForgot={() =>
					this.safeNavigateToScreen(SCREENS.ForgotPassword)
				}
				onNavigateToRegister={() => this.safeNavigateToScreen(SCREENS.Register)}
				onNavigateToUploadKey={() =>
					this.safeNavigateToScreen('UploadKeyScreen')
				}
				onGoBack={this.onGoBackHandler}
				getText={getText}
			/>
		);
	}

	private safeNavigateToScreen = (screenName: string) => {
		Keyboard.dismiss();
		this.props.navigation.navigate(screenName);
	};

	private onGoBackHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack(null);
	};
}

export const LoginScreen = (navProps: INavigationProps) => (
	<WithLogin>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithLogin>
);
