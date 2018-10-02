/**
 * TODO list:
 * 1. Action props: updateUserProfile, logout
 * 1.1 @Serkan: for logout check how can we include resetNavigationToRoute from helpers? Or do it as in WithMyProfile?
 */

import * as React from 'react';
import { currentUser } from '../../../mocks';
import { ISettingsData } from '../../../screens/myProfile/SettingsScreen.view';
import { ICurrentUser, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithCurrentUser } from '../intermediary';

const mock: IWithSettingsEnhancedProps = {
	data: {
		currentUser,
	},
	actions: {
		updateUserProfile: (saveData: ISettingsData, avatarHasChanged: boolean) => {
			/**/
		},
		logout: () => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface ISaveChangesParams {
	currentUser: ICurrentUser;
	updateUserProfile: (
		saveData: ISettingsData,
		avatarHasChanged: boolean,
	) => void;
}

export interface IWithSettingsEnhancedData {
	currentUser: ICurrentUser;
}

export interface IWithSettingsEnhancedActions extends ITranslatedProps {
	updateUserProfile: (
		saveData: ISettingsData,
		avatarHasChanged: boolean,
	) => void;
	logout: () => void;
}

interface IWithSettingsEnhancedProps {
	data: IWithSettingsEnhancedData;
	actions: IWithSettingsEnhancedActions;
}

interface IWithSettingsProps {
	children(props: IWithSettingsEnhancedProps): JSX.Element;
}

interface IWithSettingsState {}

export class WithSettings extends React.Component<
	IWithSettingsProps,
	IWithSettingsState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithAccounts>
						{(accountsProps) => (
							<WithCurrentUser>
								{(currentUserProps) =>
									this.props.children({
										data: {
											...mock.data,
											currentUser: currentUserProps.currentUser!,
										},
										actions: {
											...mock.actions,
											getText: i18nProps.getText,
											logout: accountsProps.logout,
										},
									})
								}
							</WithCurrentUser>
						)}
					</WithAccounts>
				)}
			</WithI18n>
		);
	}
}
