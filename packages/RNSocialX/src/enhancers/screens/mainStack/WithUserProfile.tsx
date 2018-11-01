/**
 * TODO list:
 * 1. Props actions: blockUser, reportProblem
 */

import * as React from 'react';
import {
	INavigationParamsActions,
	IOptionsMenuProps,
	ITranslatedProps,
	IVisitedUser,
} from '../../../types';
import { getActivity } from '../../helpers';

import { IPostReturnData } from '../../../store/aggregations/posts';
import { ActionTypes as AggActionTypes } from '../../../store/aggregations/posts/Types';
import { ActionTypes as ProfileActionTypes } from '../../../store/data/profiles/Types';
import { WithAggregations } from '../../connectors/aggregations/WithAggregations';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser, WithVisitedUserContent } from '../intermediary';

export interface IWithUserProfileEnhancedData {
	currentUserId: string;
	visitedUser: IVisitedUser;
	userPosts: { [owner: string]: IPostReturnData[] };
	loadingProfile: boolean;
	loadingPosts: boolean;
}

export interface IWithUserProfileEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions,
		IOptionsMenuProps {
	getProfileForUser: (userName: string) => void;
	getPostsForUser: (userName: string) => void;
	addFriend: (userId: string) => void;
}

interface IUserProfileEnhancedProps {
	data: IWithUserProfileEnhancedData;
	actions: IWithUserProfileEnhancedActions;
}

interface IWithUserProfileProps {
	children(props: IUserProfileEnhancedProps): JSX.Element;
}

interface IWithUserProfileState {}

export class WithUserProfile extends React.Component<IWithUserProfileProps, IWithUserProfileState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<WithNavigationParams>
								{({ setNavigationParams }) => (
									<WithProfiles>
										{({ addFriend, getProfileByUsername }) => (
											<WithActivities>
												{({ activities }) => (
													<WithAggregations>
														{({ getUserPosts, userPosts }) => (
															<WithCurrentUser>
																{({ currentUser }) => (
																	<WithVisitedUserContent>
																		{({ visitedUser }) =>
																			this.props.children({
																				data: {
																					currentUserId: currentUser!.userId,
																					visitedUser: visitedUser!,
																					userPosts,
																					loadingProfile: getActivity(
																						activities,
																						ProfileActionTypes.GET_PROFILE_BY_USERNAME,
																					),
																					loadingPosts: getActivity(
																						activities,
																						AggActionTypes.GET_USER_POSTS,
																					),
																				},
																				actions: {
																					getProfileForUser: async (username: string) => {
																						await getProfileByUsername({
																							username,
																						});
																					},
																					getPostsForUser: async (username: string) => {
																						await getUserPosts({ username });
																					},
																					addFriend: (username) =>
																						addFriend({
																							username,
																						}),
																					showOptionsMenu: (items) =>
																						showOptionsMenu({
																							items,
																						}),
																					setNavigationParams,
																					getText,
																				},
																			})
																		}
																	</WithVisitedUserContent>
																)}
															</WithCurrentUser>
														)}
													</WithAggregations>
												)}
											</WithActivities>
										)}
									</WithProfiles>
								)}
							</WithNavigationParams>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
