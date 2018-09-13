/**
 * old screen -> screens/SignUpScreen/index.tsx
 * TODO list:
 * 1. Props data: showModalForSMSCode, resendingCode, smsCodeErrorMessage,
 * 2. Props actions: doRegister, resendSMSCode, validateSMSCode
 * 3. @Serkan: might be that we need to make some flow logic changes here.
 */

import * as React from 'react';
import {Keyboard, View} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';

import {ITranslatedProps} from '../../types';
import {RegisterData, RegisterScreenView} from './RegisterScreen.view';

interface IRegisterScreenProps extends ITranslatedProps {
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
	showModalForSMSCode: boolean;
	resendingCode: boolean;
	smsCodeErrorMessage: string | null;
	validateSMSCode: (code: string) => void;
	resendSMSCode: () => void;
	doRegister: (registerData: RegisterData) => void;
}

export class RegisterScreen extends React.Component<IRegisterScreenProps> {
	private static navigationOptions = ({navigationOptions}: IRegisterScreenProps) => ({
		title: navigationOptions.getText('register.screen.title'),
		headerRight: <View />,
	});

	public render() {
		const {
			getText,
			showModalForSMSCode,
			resendingCode,
			smsCodeErrorMessage,
			validateSMSCode,
			resendSMSCode,
			doRegister,
		} = this.props;
		return (
			<RegisterScreenView
				getText={getText}
				resendingCode={resendingCode}
				showModalForSMSCode={showModalForSMSCode}
				smsCodeErrorMessage={smsCodeErrorMessage}
				onSmsCodeConfirmed={validateSMSCode}
				onSmsCodeDeclined={() => this.toggleVisibleModalSMS(false)}
				onSmsCodeResend={resendSMSCode}
				onStartRegister={doRegister}
				onAlreadyHaveCode={this.toggleVisibleModalSMS}
				onNavigateToTermsAndConditions={this.onNavigateToTermsAndConditionsHandler}
			/>
		);
	}

	private onNavigateToTermsAndConditionsHandler = () => {
		this.props.navigation.navigate('TermsAndConditionsScreen');
	};

	private toggleVisibleModalSMS = (visible = true) => {
		Keyboard.dismiss();
		this.setState({
			showModalForSMSCode: visible,
		});
	};
}
