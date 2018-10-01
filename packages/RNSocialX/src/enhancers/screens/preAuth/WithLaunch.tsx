/**
 * TODO list:
 * 1. Props data: applicationInMaintenanceMode
 * 2. Props actions: resetNavigationToRoute (check old repo. Internals/backend/actions/navigation.ts)
 */

import * as React from 'react';

import { NavigationScreenProp } from 'react-navigation';
import { currentUser } from '../../../mocks';
import { ICurrentUser, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithCurrentUser } from '../intermediary';

const mock: IWithLaunchEnhancedProps = {
	data: {
		currentUser,
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
					<WithCurrentUser>
						{(currentUserProps) =>
							children({
								data: {
									...mock.data,
									currentUser: currentUserProps.currentUser,
								},
								actions: { ...mock.actions, getText: i18nProps.getText },
							})
						}
					</WithCurrentUser>
				)}
			</WithI18n>
		);
	}
}
