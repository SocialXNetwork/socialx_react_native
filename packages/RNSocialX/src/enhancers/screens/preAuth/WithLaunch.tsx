/**
 * TODO list:
 * 1. LATER - data props: applicationInMaintenanceMode
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { ICredentials } from '@socialx/api-data';
import { IGlobal, ITranslatedProps } from '../../../types';

import { IAuthData } from '../../../store/auth/gun';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAuth } from '../../connectors/auth/WithAuth';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { resetNavigationToRoute } from '../../helpers';

export interface IWithLaunchEnhancedData {
	globals: IGlobal;
	applicationInMaintenanceMode: boolean;
	auth: IAuthData | null;
}

export interface IWithLaunchEnhancedActions extends ITranslatedProps {
	resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => void;
	loadFeed: () => void;
	login: (creds: ICredentials) => void;
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

export class WithLaunch extends React.Component<IWithLaunchProps, IWithLaunchState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithGlobals>
						{({ globals, setGlobal }) => (
							<WithAuth>
								{({ auth }) => (
									<WithAccounts>
										{({ login }) => (
											<WithPosts>
												{({ loadMorePosts, loadMoreFriendsPosts }) =>
													this.props.children({
														data: {
															applicationInMaintenanceMode: false,
															globals,
															auth,
														},
														actions: {
															resetNavigationToRoute,
															loadFeed: async () => {
																await loadMorePosts();
																await loadMoreFriendsPosts();
															},
															login,
															setGlobal,
															getText,
														},
													})
												}
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
