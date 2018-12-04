/**
 * TODO list:
 * 1. Props actions: blockUser, reportProblem
 */

import * as React from 'react';

import { ActionTypes as PostActionTypes } from '../../../store/data/posts/Types';
import { ActionTypes as ProfileActionTypes } from '../../../store/data/profiles/Types';
import { IOptionsMenuProps, ITranslatedProps, IVisitedUser } from '../../../types';
import { getActivity } from '../../helpers';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithVisitedUserContent } from '../../intermediary';

export interface IWithUserProfileEnhancedData {
	visitedUser: IVisitedUser;
	loadingProfile: boolean;
	loadingPosts: boolean;
}

export interface IWithUserProfileEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	getUserProfile: (alias: string) => void;
	getUserPosts: (alias: string) => void;
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
							<WithProfiles>
								{({ addFriend, getProfileByAlias }) => (
									<WithActivities>
										{({ activities }) => (
											<WithPosts>
												{({ getUserPosts }) => (
													<WithVisitedUserContent>
														{({ visitedUser }) =>
															this.props.children({
																data: {
																	visitedUser: visitedUser!,
																	loadingProfile: getActivity(
																		activities,
																		ProfileActionTypes.GET_PROFILE_BY_ALIAS,
																	),
																	loadingPosts: getActivity(
																		activities,
																		PostActionTypes.GET_USER_POSTS,
																	),
																},
																actions: {
																	getUserProfile: async (alias: string) => {
																		await getProfileByAlias(alias);
																	},
																	getUserPosts: async (alias: string) => {
																		await getUserPosts(alias);
																	},
																	addFriend: async (username) => {
																		await addFriend({
																			username,
																		});
																	},
																	showOptionsMenu: (items) =>
																		showOptionsMenu({
																			items,
																		}),
																	getText,
																},
															})
														}
													</WithVisitedUserContent>
												)}
											</WithPosts>
										)}
									</WithActivities>
								)}
							</WithProfiles>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
