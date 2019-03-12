/**
 * TODO list:
 * 1. LATER - @Jake, @Serkan, decide what will be used for login: userName, email, phonenumber?
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { IDictionary, IError, IGlobal } from '../../../types';

import { IAuthData } from '../../../store/auth/gun';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAuth } from '../../connectors/auth/WithAuth';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { resetNavigationToRoute } from '../../helpers/';

export interface IWithLoginEnhancedData extends IDictionary {
	auth: IAuthData | null;
	globals: IGlobal;
	errors: IError[];
}

export interface IWithLoginEnhancedActions {
	login: (alias: string, password: string) => void;
	setGlobal: (global: IGlobal) => void;
	resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => void;
}

interface IWithLoginEnhancedProps {
	data: IWithLoginEnhancedData;
	actions: IWithLoginEnhancedActions;
}

interface IWithLoginProps {
	children(props: IWithLoginEnhancedProps): JSX.Element;
}

interface IWithLoginState {}

export class WithLogin extends React.Component<IWithLoginProps, IWithLoginState> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) => (
					<WithGlobals>
						{({ globals, setGlobal }) => (
							<WithActivities>
								{({ errors }) => (
									<WithAuth>
										{({ auth }) => (
											<WithAccounts>
												{({ login }) =>
													this.props.children({
														data: {
															auth,
															globals,
															errors,
															dictionary,
														},
														actions: {
															login: (username: string, password: string) =>
																login({ username, password }),
															setGlobal,
															resetNavigationToRoute,
														},
													})
												}
											</WithAccounts>
										)}
									</WithAuth>
								)}
							</WithActivities>
						)}
					</WithGlobals>
				)}
			</WithI18n>
		);
	}
}
