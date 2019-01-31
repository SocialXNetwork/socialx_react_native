/**
 * TODO list:
 * 1. LATER - data props: maintenance
 */

import React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { ICredentials } from '@socialx/api-data';
import { IDictionary, IGlobal } from '../../../types';

import { IAuthData } from '../../../store/auth/gun';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAuth } from '../../connectors/auth/WithAuth';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { resetNavigationToRoute } from '../../helpers';

export interface IWithLaunchEnhancedData extends IDictionary {
	globals: IGlobal;
	maintenance: boolean;
	auth: IAuthData | null;
}

export interface IWithLaunchEnhancedActions {
	login: (creds: ICredentials) => void;
	resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => void;
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
				{({ dictionary }) => (
					<WithGlobals>
						{({ globals, setGlobal }) => (
							<WithAuth>
								{({ auth }) => (
									<WithAccounts>
										{({ login }) =>
											this.props.children({
												data: {
													maintenance: false,
													globals,
													auth,
													dictionary,
												},
												actions: {
													login,
													resetNavigationToRoute,
													setGlobal,
												},
											})
										}
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
