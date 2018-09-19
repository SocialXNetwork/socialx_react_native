/**
 * TODO list:
 * 1. Props data: currentUser, applicationInMaintenanceMode
 * 2. Props actions: getText, resetNavigationToRoute (check old repo. Internals/backend/actions/navigation.ts)
 */

import * as React from 'react';

import {NavigationScreenProp} from 'react-navigation';
import {ITranslatedProps} from '../../../types';

const mock: IWithLaunchEnhancedProps = {
	data: {
		currentUser: {},
		applicationInMaintenanceMode: false,
	},
	actions: {
		resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithLaunchEnhancedData {
	currentUser: any; // we only care about the existence here!
	applicationInMaintenanceMode: boolean;
}

export interface IWithLaunchEnhancedActions extends ITranslatedProps {
	resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => void;
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
		const {children} = this.props;
		return children({data: mock.data, actions: mock.actions});
	}
}
