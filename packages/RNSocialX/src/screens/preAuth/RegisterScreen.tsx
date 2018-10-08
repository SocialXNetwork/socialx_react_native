/**
 * old screen -> screens/SignUpScreen/index.tsx
 * TODO list:
 * 1. @Serkan: might be that we need to make some flow logic changes here.
 */

import * as React from 'react';
import { Keyboard } from 'react-native';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { RegisterScreenView } from './RegisterScreen.view';

import {
	IWithRegisterEnhancedActions,
	IWithRegisterEnhancedData,
	WithRegister,
} from '../../enhancers/screens';

type IRegisterScreenProps = IWithRegisterEnhancedActions &
	IWithRegisterEnhancedData &
	INavigationProps;

class Screen extends React.Component<IRegisterScreenProps> {
	public render() {
		const {
			getText,
			showModalForSMSCode,
			resendingCode,
			smsCodeErrorMessage,
			validateSMSCode,
			resendSMSCode,
			register,
		} = this.props;
		return (
			<RegisterScreenView
				getText={getText}
				// resendingCode={resendingCode}
				// showModalForSMSCode={showModalForSMSCode}
				// smsCodeErrorMessage={smsCodeErrorMessage}
				// onSmsCodeConfirmed={validateSMSCode}
				// onSmsCodeDeclined={() => this.toggleVisibleModalSMS(false)}
				// onSmsCodeResend={resendSMSCode}
				// onAlreadyHaveCode={this.toggleVisibleModalSMS}
				onStartRegister={(userData) => {
					register(userData);
					// this.safeNavigateToScreen(NAVIGATION.Intro);
				}}
				onNavigateToTermsAndConditions={() =>
					this.safeNavigateToScreen(SCREENS.TermsAndConditions)
				}
				onGoBack={this.onGoBackHandler}
			/>
		);
	}

	private safeNavigateToScreen = (screenName: string) => {
		Keyboard.dismiss();
		this.props.navigation.navigate(screenName);
	};

	private toggleVisibleModalSMS = (visible = true) => {
		Keyboard.dismiss();
		this.setState({
			showModalForSMSCode: visible,
		});
	};

	private onGoBackHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack(null);
	};
}

export const RegisterScreen = ({
	navigation,
	navigationOptions,
}: INavigationProps) => (
	<WithRegister>
		{({ data, actions }) => (
			<Screen
				navigation={navigation}
				navigationOptions={navigationOptions}
				{...data}
				{...actions}
			/>
		)}
	</WithRegister>
);
