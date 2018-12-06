import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { ActionTypes as PostActionTypes } from '../../../store/data/posts/Types';
import { ActionTypes as ProfileActionTypes } from '../../../store/data/profiles/Types';
import { ICurrentUser, IGlobal, IOptionsMenuProps, ITranslatedProps } from '../../../types';
import { getActivity, resetNavigationToRoute } from '../../helpers';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUserContent } from '../../intermediary';

export interface IWithMyProfileEnhancedData {
	currentUser: ICurrentUser;
	loadingProfile: boolean;
	loadingPosts: boolean;
}

export interface IWithMyProfileEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	getUserProfile: () => void;
	logout: () => void;
	resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => void;
	setGlobal: (input: IGlobal) => void;
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
		return (
			<WithI18n>
				{({ getText }) => (
					<WithGlobals>
						{({ setGlobal }) => (
							<WithOverlays>
								{({ showOptionsMenu }) => (
									<WithAccounts>
										{({ logout }) => (
											<WithActivities>
												{({ activities }) => (
													<WithProfiles>
														{({ getCurrentProfile }) => (
															<WithCurrentUserContent>
																{({ currentUser }) =>
																	this.props.children({
																		data: {
																			currentUser: currentUser!,
																			loadingProfile: getActivity(
																				activities,
																				ProfileActionTypes.GET_CURRENT_PROFILE,
																			),
																			loadingPosts: getActivity(
																				activities,
																				PostActionTypes.GET_USER_POSTS,
																			),
																		},
																		actions: {
																			getUserProfile: async () => {
																				await getCurrentProfile();
																			},
																			showOptionsMenu: (items) => showOptionsMenu({ items }),
																			logout,
																			resetNavigationToRoute,
																			setGlobal,
																			getText,
																		},
																	})
																}
															</WithCurrentUserContent>
														)}
													</WithProfiles>
												)}
											</WithActivities>
										)}
									</WithAccounts>
								)}
							</WithOverlays>
						)}
					</WithGlobals>
				)}
			</WithI18n>
		);
	}
}
