/**
 * TODO list:
 * 1. LATER - data props: applicationInMaintenanceMode
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { currentUser } from '../../../mocks';
import { ICurrentUser, IGlobal, ITranslatedProps } from '../../../types';

import { ICredentials } from '@socialx/api-data';
import { IAuthData } from '../../../store/app/auth';
import { WithAuth } from '../../connectors/app/WithAuth';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { resetNavigationToRoute } from '../../helpers';
import { WithCurrentUser } from '../intermediary';

const mock: IWithLaunchEnhancedProps = {
	data: {
		currentUser,
		globals: {},
		applicationInMaintenanceMode: false,
		auth: {},
	},
	actions: {
		resetNavigationToRoute: (
			screenName: string,
			navigation: NavigationScreenProp<any>,
		) => {
			/**/
		},
		recall: (creds: ICredentials) => {
			/**/
		},
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithLaunchEnhancedData {
	currentUser?: ICurrentUser; // we only care about the existence here!
	globals: IGlobal;
	applicationInMaintenanceMode: boolean;
	auth: IAuthData | null;
}

export interface IWithLaunchEnhancedActions extends ITranslatedProps {
	resetNavigationToRoute: (
		screenName: string,
		navigation: NavigationScreenProp<any>,
	) => void;
	recall: (creds: ICredentials) => void;
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
						{({ globals }) => (
							<WithAuth>
								{({ auth }) => (
									<WithAccounts>
										{({ login }) => (
											<WithCurrentUser>
												{(currentUserProps) =>
													children({
														data: {
															...mock.data,
															currentUser: currentUserProps.currentUser,
															globals,
															auth,
														},
														actions: {
															...mock.actions,
															getText: i18nProps.getText,
															resetNavigationToRoute,
															recall: (creds) => {
																// has to be done, otherwise we will recall login when there is no gun instance
																setTimeout(() => login(creds), 500);
															},
														},
													})
												}
											</WithCurrentUser>
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
