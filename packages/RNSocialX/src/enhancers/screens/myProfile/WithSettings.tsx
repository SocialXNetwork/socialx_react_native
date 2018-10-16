import * as React from 'react';

import { currentUser } from '../../../mocks';
import { ISettingsData } from '../../../screens/myProfile/SettingsScreen.view';
import { ICurrentUser, ITranslatedProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
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
							<WithProfiles>
								{(profilesProps) => (
									<WithCurrentUser>
										{(currentUserProps) =>
											this.props.children({
												data: {
													currentUser: currentUserProps.currentUser!,
												},
												actions: {
													updateUserProfile: (saveData) =>
														profilesProps.updateCurrentProfile({
															aboutMeText: saveData.bio,
															avatar: saveData.avatarURL,
															email: saveData.email,
															fullName: saveData.fullName,
														}),
													logout: accountsProps.logout,
													getText: i18nProps.getText,
												},
											})
										}
									</WithCurrentUser>
								)}
							</WithProfiles>
						)}
					</WithAccounts>
				)}
			</WithI18n>
		);
	}
}
