/**
 * old screen -> screens/LoginScreen/index.tsx
 * TODO list:
 * 1. Decide if we will have a verification step: code sent via SMS or email.
 * 2. (later) Get rid of navigation hacks!
 */

import * as React from 'react';
import {Keyboard, View} from 'react-native';

import {IWithLoginEnhancedActions, IWithLoginEnhancedData, WithLogin} from '../../enhancers/screens';
import {INavigationProps} from '../../types';
import {LoginScreenView} from './LoginScreen.view';

type ILoginScreenProps = INavigationProps & IWithLoginEnhancedData & IWithLoginEnhancedActions;

class Screen extends React.Component<ILoginScreenProps> {
	public render() {
		const {getText, doLogin} = this.props;
		return (
			<LoginScreenView
				onStartLogin={doLogin}
				onNavigateToPasswordForgot={() => this.safeNavigateToScreen('ForgotPasswordScreen')}
				onNavigateToRegister={() => this.safeNavigateToScreen('SignUpScreen')}
				onNavigateToUploadKey={() => this.safeNavigateToScreen('UploadKeyScreen')}
				getText={getText}
			/>
		);
	}

	private safeNavigateToScreen = (screenName: string) => {
		Keyboard.dismiss();
		this.props.navigation.navigate(screenName);
	};
}

export const LoginScreen = (navProps: INavigationProps) => (
	<WithLogin>{({data, actions}) => <Screen {...navProps} {...data} {...actions} />}</WithLogin>
);

// @ts-ignore
LoginScreen.navigationOptions = ({navigationOptions}: INavigationProps) => ({
	title: navigationOptions.getText('login.screen.title'),
	headerRight: <View />,
});
