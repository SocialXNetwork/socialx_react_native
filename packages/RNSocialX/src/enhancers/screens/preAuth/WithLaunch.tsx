/**
 * TODO list:
 * 1. LATER - data props: applicationInMaintenanceMode
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { ICredentials } from '@socialx/api-data';
import { currentUser } from '../../../mocks';
import { ICurrentUser, IGlobal, ITranslatedProps } from '../../../types';

import { IAuthData } from '../../../store/auth/gun';
import { ActionTypes as AccountActionTypes } from '../../../store/data/accounts/Types';
import { ActionTypes as PostActionTypes } from '../../../store/data/posts/Types';
import { ActionTypes as ProfileActionTypes } from '../../../store/data/profiles/Types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAuth } from '../../connectors/auth/WithAuth';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { getActivity, resetNavigationToRoute } from '../../helpers';
import { WithCurrentUser } from '../intermediary';

const mock: IWithLaunchEnhancedProps = {
	data: {
		currentUser,
		globals: {},
		applicationInMaintenanceMode: false,
		auth: {},
		loggingIn: false,
		loadingPosts: false,
		loadingProfiles: false,
	},
	actions: {
		resetNavigationToRoute: (
			screenName: string,
			navigation: NavigationScreenProp<any>,
		) => {
			/**/
		},
		loadPosts: () => {
			/**/
		},
		recall: (creds: ICredentials) => {
			/**/
		},
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
		setGlobal: (global) => undefined,
	},
};

export interface IWithLaunchEnhancedData {
	currentUser?: ICurrentUser; // we only care about the existence here!
	globals: IGlobal;
	applicationInMaintenanceMode: boolean;
	auth: IAuthData | null;
	loggingIn: boolean;
	loadingPosts: boolean;
	loadingProfiles: boolean;
}

export interface IWithLaunchEnhancedActions extends ITranslatedProps {
	resetNavigationToRoute: (
		screenName: string,
		navigation: NavigationScreenProp<any>,
	) => void;
	loadPosts: () => void;
	recall: (creds: ICredentials) => void;
	setGlobal: (global: IGlobal) => void;
}

interface IWithLaunchEnhancedProps {
	data: IWithLaunchEnhancedData;
	actions: IWithLaunchEnhancedActions;
}

interface IWithLaunchProps {
	children(props: IWithLaunchEnhancedProps): JSX.Element;
}

interface IWithLaunchState {}

export class WithLaunch extends React.Component<
	IWithLaunchProps,
	IWithLaunchState
> {
	render() {
		const { children } = this.props;
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithGlobals>
						{({ globals, setGlobal }) => (
							<WithAuth>
								{({ auth }) => (
									<WithAccounts>
										{({ login }) => (
											<WithPosts>
												{(postsProps) => (
													<WithActivities>
														{({ activities }) => (
															<WithCurrentUser>
																{(currentUserProps) =>
																	children({
																		data: {
																			...mock.data,
																			currentUser: currentUserProps.currentUser,
																			globals,
																			loggingIn: getActivity(
																				activities,
																				AccountActionTypes.LOGIN,
																			),
																			loadingPosts: getActivity(
																				activities,
																				PostActionTypes.LOAD_MORE_POSTS,
																			),
																			loadingProfiles: getActivity(
																				activities,
																				ProfileActionTypes.GET_PROFILES_BY_POSTS,
																			),
																			auth,
																		},
																		actions: {
																			...mock.actions,
																			getText: i18nProps.getText,
																			resetNavigationToRoute,
																			loadPosts: postsProps.loadMorePosts,
																			recall: (creds) => {
																				// has to be done, otherwise we will recall login when there is no gun instance
																				setTimeout(() => login(creds), 1000);
																			},
																			setGlobal,
																		},
																	})
																}
															</WithCurrentUser>
														)}
													</WithActivities>
												)}
											</WithPosts>
										)}
									</WithAccounts>
								)}
							</WithAuth>
						)}
					</WithGlobals>
				)}
			</WithI18n>
		);
	}
}
