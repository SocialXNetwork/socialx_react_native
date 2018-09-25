/**
 * TODO list:
 * 1. Action props: resetPassword
 */

import * as React from 'react';
import {ITranslatedProps} from '../../../types';

const mock: IWithResetPasswordEnhancedProps = {
	data: {},
	actions: {
		resetPassword: (userName: string, resetCode: string, password: string) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithResetPasswordEnhancedData {}

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

export class WithResetPassword extends React.Component<IWithResetPasswordProps, IWithResetPasswordState> {
	render() {
		return this.props.children({data: mock.data, actions: mock.actions});
	}
}
