/**
 * TODO list:
 * 1. LATER - data props: applicationInMaintenanceMode
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { currentUser } from '../../../mocks';
import { ICurrentUser, IGlobal, ITranslatedProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { resetNavigationToRoute } from '../../helpers';
import { WithCurrentUser } from '../intermediary';

const mock: IWithLaunchEnhancedProps = {
	data: {
		currentUser,
		globals: {},
		applicationInMaintenanceMode: false,
	},
	actions: {
		resetNavigationToRoute: (
			screenName: string,
			navigation: NavigationScreenProp<any>,
		) => {
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
}

export interface IWithLaunchEnhancedActions extends ITranslatedProps {
	resetNavigationToRoute: (
		screenName: string,
		navigation: NavigationScreenProp<any>,
	) => void;
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
							<WithCurrentUser>
								{(currentUserProps) =>
									children({
										data: {
											...mock.data,
											currentUser: currentUserProps.currentUser,
											globals,
										},
										actions: {
											...mock.actions,
											getText: i18nProps.getText,
											resetNavigationToRoute,
										},
									})
								}
							</WithCurrentUser>
						)}
					</WithGlobals>
				)}
			</WithI18n>
		);
	}
}
