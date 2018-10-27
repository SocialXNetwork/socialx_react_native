/**
 * TODO list:
 * 1. Props actions: blockUser, reportProblem
 */

import * as React from 'react';
import {
	IDotsMenuProps,
	INavigationParamsActions,
	ITranslatedProps,
	IVisitedUser,
} from '../../../types';
import { getActivity } from '../../helpers';

import { ActionTypes } from '../../../store/data/profiles/Types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser, WithVisitedUserContent } from '../intermediary';

export interface IWithUserProfileEnhancedData {
	currentUserAvatarURL: string;
	visitedUser: IVisitedUser;
	refreshingProfile: boolean;
}

export interface IWithUserProfileEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions,
		IDotsMenuProps {
	refreshProfile: (userName: string) => void;
	addFriend: (userId: string) => void;
	likePost: (postId: string) => void;
	unlikePost: (postId: string) => void;
	postComment: (postId: string, commentText: string) => void;
	blockUser: (userId: string) => void;
	reportProblem: (reason: string, description: string) => void;
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
											<WithPosts>
												{({ likePost, unlikePost, createComment }) => (
													<WithActivities>
														{({ activities }) => (
															<WithCurrentUser>
																{({ currentUser }) => (
																	<WithVisitedUserContent>
																		{({ visitedUser }) =>
																			this.props.children({
																				data: {
																					currentUserAvatarURL: currentUser!.avatarURL,
																					visitedUser: visitedUser!,
																					refreshingProfile: getActivity(
																						activities,
																						ActionTypes.GET_PROFILE_BY_USERNAME,
																					),
																				},
																				actions: {
																					refreshProfile: async (username: string) => {
																						await getProfileByUsername({
																							username,
																						});
																					},
																					addFriend: (username) =>
																						addFriend({
																							username,
																						}),
																					likePost: async (postId) => {
																						await likePost({
																							postId,
																						});
																					},
																					unlikePost: async (postId) => {
																						await unlikePost({
																							postId,
																						});
																					},
																					postComment: async (text, postId) => {
																						await createComment({
																							text,
																							postId,
																						});
																					},
																					blockUser: () => undefined,
																					reportProblem: () => undefined,
																					showDotsMenuModal: (items) =>
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
													</WithActivities>
												)}
											</WithPosts>
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
