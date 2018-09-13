/**
 * old screen -> screens/LoginScreen/index.tsx
 * TODO list:
 * 1. Props data: none :)
 * 2. Props actions: doLogin
 * 3. @Jake, @Serkan, decide what will be used for login: userName, email, phonenumber?
 * 4. Decide if we will have a verification step: code sent via SMS or email.
 * 5. (later) Get rid of navigation hacks!
 */

import * as React from 'react';
import {Keyboard, View} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';

import {ITranslatedProps} from '../../types';
import {LoginScreenView} from './LoginScreen.view';

interface ILoginScreenProps extends ITranslatedProps {
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
	doLogin: (userName: string, password: string) => void;
}

export class LoginScreen extends React.Component<ILoginScreenProps> {
	private static navigationOptions = ({navigationOptions}: ILoginScreenProps) => ({
		title: navigationOptions.getText('login.screen.title'),
		headerRight: <View />,
	});

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
