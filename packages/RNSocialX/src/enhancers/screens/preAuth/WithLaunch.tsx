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

const mock: IWithLaunchEnhancedProps = {
	data: {
		globals: {},
		applicationInMaintenanceMode: false,
		auth: {},
	},
	actions: {
		resetNavigationToRoute: (
			screenName: string,
			navigation: NavigationScreenProp<any>,
		) => undefined,
		loadPosts: () => undefined,
		recall: (creds: ICredentials) => undefined,
		getText: (value: string, ...args: any[]) => value,
		setGlobal: (global) => undefined,
	},
};

export interface IWithLaunchEnhancedData {
	globals: IGlobal;
	applicationInMaintenanceMode: boolean;
	auth: IAuthData | null;
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
												{(postsProps) =>
													this.props.children({
														data: {
															...mock.data,
															globals,
															auth,
														},
														actions: {
															...mock.actions,
															getText: i18nProps.getText,
															resetNavigationToRoute,
															loadPosts: postsProps.loadMorePosts,
															recall: login,
															setGlobal,
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
