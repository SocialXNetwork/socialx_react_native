import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { ActionTypes as PostActionTypes } from '../../../store/data/posts/Types';
import { ActionTypes as ProfileActionTypes } from '../../../store/data/profiles/Types';
import { ICurrentUser, IDictionary, IGlobal, IOptionsMenuProps } from '../../../types';
import { getActivities, resetNavigationToRoute } from '../../helpers';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUserContent } from '../../intermediary';

export interface IWithMyProfileEnhancedData extends IDictionary {
	currentUser: ICurrentUser;
	hasFriends: boolean;
	loadingProfile: boolean;
}

export interface IWithMyProfileEnhancedActions extends IOptionsMenuProps {
	logout: () => void;
	getUserProfile: () => void;
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
				{({ dictionary }) => (
					<WithGlobals>
						{({ setGlobal }) => (
							<WithOverlays>
								{({ showOptionsMenu }) => (
									<WithAccounts>
										{({ logout }) => (
											<WithActivities>
												{({ activities }) => (
													<WithProfiles>
														{({ friends, getCurrentProfile }) => (
															<WithPosts>
																{({ getUserPosts }) => (
																	<WithCurrentUserContent>
																		{({ currentUser }) =>
																			this.props.children({
																				data: {
																					currentUser,
																					hasFriends:
																						friends[currentUser.alias] &&
																						friends[currentUser.alias].length > 0,
																					loadingProfile: getActivities(activities, [
																						ProfileActionTypes.GET_CURRENT_PROFILE,
																						PostActionTypes.GET_USER_POSTS,
																					]),
																					dictionary,
																				},
																				actions: {
																					getUserProfile: () => {
																						getCurrentProfile();
																						getUserPosts(currentUser.alias);
																					},
																					logout,
																					showOptionsMenu,
																					resetNavigationToRoute,
																					setGlobal,
																				},
																			})
																		}
																	</WithCurrentUserContent>
																)}
															</WithPosts>
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
