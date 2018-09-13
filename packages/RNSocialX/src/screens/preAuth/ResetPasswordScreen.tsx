/**
 * old screen -> screens/ForgotPasswordScreen/index.tsx
 * TODO list:
 * 1. Action props: resetPassword, showActivityIndicator, hideActivityIndicator
 * 2. Refactor navigationOptions into header component
 */

import * as React from 'react';
import {Alert, View} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';

import {ModalManager} from '../../components';
import {ITranslatedProps} from '../../types';
import {ResetPasswordScreenView} from './ResetPasswordScreen.view';

interface IResetPasswordScreenProps extends ITranslatedProps {
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
	resetPassword: (username: string, resetCode: string, password: string) => void;
	showActivityIndicator: (message: string) => void;
	hideActivityIndicator: () => void;
}

export class ResetPasswordScreen extends React.PureComponent<IResetPasswordScreenProps> {
	public static navigationOptions = ({navigationOptions}: IResetPasswordScreenProps) => ({
		title: navigationOptions.getText('reset.password.screen.title'),
		headerRight: <View />,
	});

	public render() {
		return <ResetPasswordScreenView onSetNewPassword={this.setNewPasswordHandler} getText={this.props.getText} />;
	}

	private setNewPasswordHandler = async (resetCode: string, password: string) => {
		const {showActivityIndicator, hideActivityIndicator, resetPassword, navigation, getText} = this.props;

		const {params} = navigation.state;

		showActivityIndicator(getText('reset.password.resetting'));
		if (!params.username) {
			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('general.error.message'));
			});
		} else {
			resetPassword(params.username, resetCode, password);

			ModalManager.safeRunAfterModalClosed(() => {
				Alert.alert(getText('reset.password.success'));
			});
			// TODO: this is not enough to go to MainScreen!
			// later implement logic for login here!
			// resetNavigationToRoute('MainScreen', navigation);
		}
		hideActivityIndicator();
	};
}
