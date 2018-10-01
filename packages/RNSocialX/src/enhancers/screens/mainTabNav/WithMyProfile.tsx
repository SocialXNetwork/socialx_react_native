/**
 * TODO list:
 * 1. Props data: loadingUser, refreshingUser
 * 2. Props actions: showDotsMenuModal, refreshUser, logout, resetNavigationToRoute (see old repo. Internals/backend/actions/navigation.ts)
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { IDotsMenuItem } from '../../../components';
import { currentUser } from '../../../mocks';
import {
	ICurrentUser,
	INavigationParamsActions,
	ITranslatedProps,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithCurrentUserContent } from '../intermediary';

const mock: IWithMyProfileEnhancedProps = {
	data: {
		currentUser,
		loadingUser: false,
		refreshingUser: false,
	},
	actions: {
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
		resetNavigationToRoute: (
			screenName: string,
			navigation: NavigationScreenProp<any>,
		) => {
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
		setNavigationParams: () => {
			/**/
		},
	},
};

export interface IWithMyProfileEnhancedData {
	currentUser: ICurrentUser;
	loadingUser: boolean;
	refreshingUser: boolean;
}

export interface IWithMyProfileEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions {
	resetNavigationToRoute: (
		screenName: string,
		navigation: NavigationScreenProp<any>,
	) => void;
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

export class WithMyProfile extends React.Component<
	IWithMyProfileProps,
	IWithMyProfileState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithCurrentUserContent>
						{(currentUserProps) =>
							this.props.children({
								data: {
									...mock.data,
									currentUser: currentUserProps.currentUser!,
								},
								actions: { ...mock.actions, getText: i18nProps.getText },
							})
						}
					</WithCurrentUserContent>
				)}
			</WithI18n>
		);
	}
}
