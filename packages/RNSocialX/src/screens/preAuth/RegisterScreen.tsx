/**
 * old screen -> screens/SignUpScreen/index.tsx
 * TODO list:
 * 1. @Serkan: might be that we need to make some flow logic changes here.
 */

import * as React from 'react';
import {Keyboard, View} from 'react-native';

import {INavigationProps} from '../../types';
import {RegisterScreenView} from './RegisterScreen.view';

import {IWithRegisterEnhancedActions, IWithRegisterEnhancedData, WithRegister} from '../../enhancers/screens';

type IRegisterScreenProps = IWithRegisterEnhancedActions & IWithRegisterEnhancedData & INavigationProps;

class Screen extends React.Component<IRegisterScreenProps> {
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

export const RegisterScreen = ({navigation, navigationOptions}: INavigationProps<any, any>) => (
	<WithRegister>
		{({data, actions}) => (
			<Screen navigation={navigation} navigationOptions={navigationOptions} {...data} {...actions} />
		)}
	</WithRegister>
);

// @ts-ignore
RegisterScreen.navigationOptions = ({navigationOptions}: INavigationProps) => ({
	title: navigationOptions.getText('register.screen.title'),
	headerRight: <View />,
});
