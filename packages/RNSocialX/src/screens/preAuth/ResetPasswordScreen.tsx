import * as React from 'react';
import { Alert } from 'react-native';

import { INavigationProps } from '../../types';
import { ResetPasswordScreenView } from './ResetPasswordScreen.view';

import {
	IWithResetPasswordEnhancedActions,
	IWithResetPasswordEnhancedData,
	WithResetPassword,
} from '../../enhancers/screens';

type IResetPasswordScreenProps = INavigationProps &
	IWithResetPasswordEnhancedData &
	IWithResetPasswordEnhancedActions;

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
		const { resetPassword, getText, alias } = this.props;

		if (!alias) {
			Alert.alert(getText('general.error.message'));
		} else {
			resetPassword(alias, resetCode, password);
		}
	};

	private onGoBackHandler = () => {
		this.props.navigation.goBack();
	};
}

export const ResetPasswordScreen = (props: INavigationProps) => (
	<WithResetPassword>
		{({ data, actions }) => <Screen {...props} {...data} {...actions} />}
	</WithResetPassword>
);
