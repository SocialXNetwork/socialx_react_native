/**
 * TODO list:
 * 1. Props actions: sendResetCode
 */

import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithForgotPasswordEnhancedProps = {
	data: {},
	actions: {
		sendResetCode: (alias: string) => undefined,
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithForgotPasswordEnhancedData {}

export interface IWithForgotPasswordEnhancedActions extends ITranslatedProps {
	sendResetCode: (alias: string) => void;
}

interface IWithForgotPasswordEnhancedProps {
	data: IWithForgotPasswordEnhancedData;
	actions: IWithForgotPasswordEnhancedActions;
}

interface IWithForgotPasswordProps {
	children(props: IWithForgotPasswordEnhancedProps): JSX.Element;
}

interface IWithForgotPasswordState {}

export class WithForgotPassword extends React.Component<
	IWithForgotPasswordProps,
	IWithForgotPasswordState
> {
	render() {
		const { children } = this.props;
		return (
			<WithI18n>
				{(i18nProps) =>
					children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
