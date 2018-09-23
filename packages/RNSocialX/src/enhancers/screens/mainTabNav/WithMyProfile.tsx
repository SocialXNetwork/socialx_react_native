/**
 * TODO list:
 * 1. Props data: currentUser, loadingUser, refreshingUser
 * 2. Props actions: showDotsMenuModal, refreshUser, logout, resetNavigationToRoute (see old repo. Internals/backend/actions/navigation.ts)
 */

import * as React from 'react';
import {NavigationScreenProp} from 'react-navigation';

import {IDotsMenuItem} from '../../../components';
import {currentUser} from '../../../mocks';
import {ICurrentUser, ITranslatedProps} from '../../../types';

const mock: IWithMyProfileEnhancedProps = {
	data: {
		currentUser,
		loadingUser: false,
		refreshingUser: false,
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => {
			/**/
		},
		showDotsMenuModal: (items: IDotsMenuItem[]) => {
			/**/
		},
		refreshUser: (userId: string) => {
			/**/
		},
		logout: () => {
			/**/
		},
	},
};

export interface IWithMyProfileEnhancedData {
	currentUser: ICurrentUser;
	loadingUser: boolean;
	refreshingUser: boolean;
}

export interface IWithMyProfileEnhancedActions extends ITranslatedProps {
	resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => void;
	showDotsMenuModal: (items: IDotsMenuItem[]) => void;
	refreshUser: (userId: string) => void;
	logout: () => void;
}

interface IWithMyProfileEnhancedProps {
	data: IWithMyProfileEnhancedData;
	actions: IWithMyProfileEnhancedActions;
}

interface IWithMyProfileProps {
	children(props: IWithMyProfileEnhancedProps): JSX.Element;
}

interface IWithMyProfileState {}

export class WithMyProfile extends React.Component<IWithMyProfileProps, IWithMyProfileState> {
	render() {
		const {children} = this.props;
		return children({data: mock.data, actions: mock.actions});
	}
}
