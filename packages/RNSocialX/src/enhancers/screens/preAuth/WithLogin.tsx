/**
 * TODO list:
 * 1. LATER - @Jake, @Serkan, decide what will be used for login: userName, email, phonenumber?
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { IError, IGlobal, ITranslatedProps } from '../../../types';

import { IAuthData } from '../../../store/auth/gun';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAuth } from '../../connectors/auth/WithAuth';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { resetNavigationToRoute } from '../../helpers/';

const mock: IWithLoginEnhancedProps = {
	data: {
		auth: null,
		errors: [],
	},
	actions: {
		login: (userName: string, password: string) => undefined,
		loadPosts: () => undefined,
		setGlobal: (global: IGlobal) => undefined,
		resetNavigationToRoute: (
			screenName: string,
			navigation: NavigationScreenProp<any>,
		) => undefined,
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithLoginEnhancedData {
	auth: IAuthData | null;
	errors: IError[];
}

export interface IWithLoginEnhancedActions extends ITranslatedProps {
	login: (userName: string, password: string) => void;
	loadPosts: () => void;
	setGlobal: (global: IGlobal) => void;
	resetNavigationToRoute: (
		screenName: string,
		navigation: NavigationScreenProp<any>,
	) => void;
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
					<WithGlobals>
						{({ setGlobal }) => (
							<WithActivities>
								{({ errors }) => (
									<WithAuth>
										{({ auth }) => (
											<WithPosts>
												{(postProps) => (
													<WithAccounts>
														{(accountsProps) =>
															this.props.children({
																data: {
																	...mock.data,
																	auth,
																	errors,
																},
																actions: {
																	login: (username: string, password: string) =>
																		accountsProps.login({
																			username,
																			password,
																		}),
																	loadPosts: postProps.loadMorePosts,
																	setGlobal,
																	resetNavigationToRoute,
																	getText: i18nProps.getText,
																},
															})
														}
													</WithAccounts>
												)}
											</WithPosts>
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
