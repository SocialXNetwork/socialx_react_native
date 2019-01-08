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
		alias: 'test.user.1',
	},
	actions: {
		resetPassword: (alias: string, resetCode: string, password: string) => undefined,
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithResetPasswordEnhancedData {
	alias: string;
}

export interface IWithResetPasswordEnhancedActions extends ITranslatedProps {
	resetPassword: (alias: string, resetCode: string, password: string) => void;
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
