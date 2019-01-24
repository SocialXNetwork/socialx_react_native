/**
 * TODO list:
 * 1. Props actions: sendResetCode
 */

import * as React from 'react';

import { IDictionary } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

export interface IWithForgotPasswordEnhancedData extends IDictionary {}

export interface IWithForgotPasswordEnhancedActions {
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
		return (
			<WithI18n>
				{({ dictionary }) =>
					this.props.children({
						data: { dictionary },
						actions: { sendResetCode: () => undefined },
					})
				}
			</WithI18n>
		);
	}
}
