/**
 * old screen -> screens/ForgotPasswordScreen/index.tsx
 * TODO list:
 * 1. Refactor navigationOptions into header component
 */

import * as React from 'react';
import {Alert, View} from 'react-native';

import {ModalManager} from '../../components';
import {INavigationProps} from '../../types';
import {ResetPasswordScreenView} from './ResetPasswordScreen.view';

import {
	IWithResetPasswordEnhancedActions,
	IWithResetPasswordEnhancedData,
	WithResetPassword,
} from '../../enhancers/screens';

type IResetPasswordScreenProps = INavigationProps & IWithResetPasswordEnhancedData & IWithResetPasswordEnhancedActions;

class Screen extends React.PureComponent<IResetPasswordScreenProps> {
	public render() {
		return (
			<ResetPasswordScreenView
				onSetNewPassword={this.setNewPasswordHandler}
				onGoBack={this.onGoBackHandler}
				getText={this.props.getText}
			/>
		);
	}

	private setNewPasswordHandler = async (resetCode: string, password: string) => {
		const {showActivityIndicator, hideActivityIndicator, resetPassword, navigation, getText} = this.props;

		const {params} = navigation.state;

		showActivityIndicator(getText('reset.password.resetting'));
		if (!params.userName) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('general.error.message'));
			});
		} else {
			resetPassword(params.userName, resetCode, password);

			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('reset.password.success'));
			});
			// TODO: this is not enough to go to MainScreen!
			// later implement logic for login here!
			// resetNavigationToRoute('MainScreen', navigation);
		}
		hideActivityIndicator();
	};

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const ResetPasswordScreen = ({navigation, navigationOptions}: INavigationProps) => (
	<WithResetPassword>
		{({data, actions}) => (
			<Screen navigation={navigation} navigationOptions={navigationOptions} {...data} {...actions} />
		)}
	</WithResetPassword>
);
