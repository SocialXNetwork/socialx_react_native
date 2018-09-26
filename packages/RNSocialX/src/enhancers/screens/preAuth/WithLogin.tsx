/**
 * TODO list:
 * 1. Props data: none :)
 * 2. Props actions: doLogin, getText
 * 3. @Jake, @Serkan, decide what will be used for login: userName, email, phonenumber?
 */

import * as React from 'react';

import { ITranslatedProps } from '../../../types';

const mock: IWithLoginEnhancedProps = {
	data: {},
	actions: {
		doLogin: (userName: string, password: string) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithLoginEnhancedData {}

export interface IWithLoginEnhancedActions extends ITranslatedProps {
	doLogin: (userName: string, password: string) => void;
}

interface IWithLoginEnhancedProps {
	data: IWithLoginEnhancedData;
	actions: IWithLoginEnhancedActions;
}

interface IWithLoginProps {
	children(props: IWithLoginEnhancedProps): JSX.Element;
}

interface IWithLoginState {}

export class WithLogin extends React.Component<
	IWithLoginProps,
	IWithLoginState
> {
	render() {
		const { children } = this.props;
		return children({ data: mock.data, actions: mock.actions });
	}
}
