/**
 * TODO list:
 * 1. Data props: userName
 * 2. Action props: resetPassword
 */

import * as React from 'react';
import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithResetPasswordEnhancedProps = {
	data: {
		userName: 'test.user.1',
	},
	actions: {
		resetPassword: (userName: string, resetCode: string, password: string) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithResetPasswordEnhancedData {
	userName: string;
}

export interface IWithResetPasswordEnhancedActions extends ITranslatedProps {
	resetPassword: (userName: string, resetCode: string, password: string) => void;
}

interface IWithResetPasswordEnhancedProps {
	data: IWithResetPasswordEnhancedData;
	actions: IWithResetPasswordEnhancedActions;
}

interface IWithResetPasswordProps {
	children(props: IWithResetPasswordEnhancedProps): JSX.Element;
}

interface IWithResetPasswordState {}

export class WithResetPassword extends React.Component<
	IWithResetPasswordProps,
	IWithResetPasswordState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) =>
					this.props.children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
