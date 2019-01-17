import * as React from 'react';

import { ISettingsData } from '../../../screens/myProfile/SettingsScreen.view';
import { ICurrentUser, IGlobal, IOptionsMenuProps, ITranslatedProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../../intermediary';

export interface IWithSettingsEnhancedData {
	currentUser: ICurrentUser;
}

export interface IWithSettingsEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	updateUserProfile: (user: ISettingsData) => void;
	logout: () => void;
	setGlobal: (global: IGlobal) => void;
}

interface IWithSettingsEnhancedProps {
	data: IWithSettingsEnhancedData;
	actions: IWithSettingsEnhancedActions;
}

interface IWithSettingsProps {
	children(props: IWithSettingsEnhancedProps): JSX.Element;
}

interface IWithSettingsState {}

export class WithSettings extends React.Component<IWithSettingsProps, IWithSettingsState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<WithGlobals>
								{({ setGlobal }) => (
									<WithAccounts>
										{({ logout }) => (
											<WithProfiles>
												{({ updateCurrentProfile }) => (
													<WithCurrentUser>
														{({ currentUser }) =>
															this.props.children({
																data: {
																	currentUser,
																},
																actions: {
																	updateUserProfile: (user) => updateCurrentProfile(user),
																	logout,
																	showOptionsMenu,
																	setGlobal,
																	getText,
																},
															})
														}
													</WithCurrentUser>
												)}
											</WithProfiles>
										)}
									</WithAccounts>
								)}
							</WithGlobals>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
