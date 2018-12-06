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
														{(currUser) =>
															this.props.children({
																data: {
																	currentUser: {
																		shareDataEnabled: false,
																		...currUser.currentUser!,
																	},
																},
																actions: {
																	updateUserProfile: (user) =>
																		updateCurrentProfile({
																			aboutMeText: user.description,
																			avatar: user.avatar,
																			email: user.email,
																			fullName: user.fullName,
																		}),
																	logout,
																	showOptionsMenu: (items) => showOptionsMenu({ items }),
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
