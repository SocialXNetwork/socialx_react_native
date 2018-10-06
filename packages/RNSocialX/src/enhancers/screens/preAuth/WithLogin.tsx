/**
 * TODO list:
 * 1. LATER - @Jake, @Serkan, decide what will be used for login: userName, email, phonenumber?
 */

import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';

const mock: IWithLoginEnhancedProps = {
	data: {},
	actions: {
		login: (userName: string, password: string) => {
			/**/
		},
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithLoginEnhancedData {}

export interface IWithLoginEnhancedActions extends ITranslatedProps {
	login: (userName: string, password: string) => void;
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
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithAccounts>
						{(accountsProps) =>
							this.props.children({
								data: {},
								actions: {
									login: (userName: string, password: string) =>
										accountsProps.login({ username: userName, password }),
									getText: i18nProps.getText,
								},
							})
						}
					</WithAccounts>
				)}
			</WithI18n>
		);
	}
}
