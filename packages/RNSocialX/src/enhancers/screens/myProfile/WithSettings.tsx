import * as React from 'react';

import { currentUser } from '../../../mocks';
import { ISettingsData } from '../../../screens/myProfile/SettingsScreen.view';
import { ICurrentUser, IDotsMenuProps, ITranslatedProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
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
		showDotsMenuModal: (items) => {
			/**/
		},
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

export interface IWithSettingsEnhancedActions
	extends ITranslatedProps,
		IDotsMenuProps {
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
					<WithOverlays>
						{(overlayProps) => (
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
															showDotsMenuModal: (items) =>
																overlayProps.showOptionsMenu({ items }),
														},
													})
												}
											</WithCurrentUser>
										)}
									</WithProfiles>
								)}
							</WithAccounts>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
