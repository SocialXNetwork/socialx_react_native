import * as React from 'react';

import { currentUser } from '../../../mocks';
import { ISettingsData } from '../../../screens/myProfile/SettingsScreen.view';
import { ICurrentUser, IGlobal, ITranslatedProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../intermediary';

const mock: IWithNodesEnhancedProps = {
	data: {
		currentUser,
	},
	actions: {
		updateUserProfile: (user: ISettingsData) => undefined,
		logout: () => undefined,
		setGlobal: (global: IGlobal) => undefined,
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithNodesEnhancedData {
	currentUser: ICurrentUser;
}

export interface IWithNodesEnhancedActions extends ITranslatedProps {
	setGlobal: (global: IGlobal) => void;
	updateUserProfile: (user: ISettingsData) => void;
	logout: () => void;
}

interface IWithNodesEnhancedProps {
	data: IWithNodesEnhancedData;
	actions: IWithNodesEnhancedActions;
}

interface IWithNodesProps {
	children(props: IWithNodesEnhancedProps): JSX.Element;
}

interface IWithNodesState {}

export class WithNodes extends React.Component<IWithNodesProps, IWithNodesState> {
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
																		shareDataEnabled: mock.data.currentUser.shareDataEnabled,
																		...currUser.currentUser!,
																	},
																},
																actions: {
																	updateUserProfile: (user) =>
																		updateCurrentProfile({
																			aboutMeText: user.bio,
																			avatar: user.avatarURL,
																			email: user.email,
																			fullName: user.fullName,
																		}),
																	logout,
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
