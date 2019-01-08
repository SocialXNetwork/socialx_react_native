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

export interface IWithLoginEnhancedData {
	auth: IAuthData | null;
	errors: IError[];
}

export interface IWithLoginEnhancedActions extends ITranslatedProps {
	login: (alias: string, password: string) => void;
	loadFeed: () => void;
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
				{({ getText }) => (
					<WithGlobals>
						{({ setGlobal }) => (
							<WithActivities>
								{({ errors }) => (
									<WithAuth>
										{({ auth }) => (
											<WithPosts>
												{({ loadMorePosts, loadMoreFriendsPosts }) => (
													<WithAccounts>
														{({ login }) =>
															this.props.children({
																data: {
																	auth,
																	errors,
																},
																actions: {
																	login: async (alias: string, password: string) => {
																		await login({
																			username: alias,
																			password,
																		});
																	},
																	loadFeed: async () => {
																		await loadMorePosts();
																		await loadMoreFriendsPosts();
																	},
																	setGlobal,
																	resetNavigationToRoute,
																	getText,
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
