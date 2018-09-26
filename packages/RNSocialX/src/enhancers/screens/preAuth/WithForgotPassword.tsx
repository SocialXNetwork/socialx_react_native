/**
 * TODO list:
 * 1. Props actions: sendResetCode, getText
 */

import * as React from 'react';

import { ITranslatedProps } from '../../../types';

const mock: IWithForgotPasswordEnhancedProps = {
	data: {},
	actions: {
		sendResetCode: (userName: string) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithForgotPasswordEnhancedData {}

export interface IWithForgotPasswordEnhancedActions extends ITranslatedProps {
	sendResetCode: (userName: string) => void;
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
		return children({ data: mock.data, actions: mock.actions });
	}
}
