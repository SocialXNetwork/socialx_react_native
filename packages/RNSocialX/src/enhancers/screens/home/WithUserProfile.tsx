/**
 * TODO list:
 * 1. Props actions: blockUser, reportProblem
 */

import * as React from 'react';

import { ActionTypes as PostActionTypes } from '../../../store/data/posts/Types';
import { ActionTypes as ProfileActionTypes } from '../../../store/data/profiles/Types';
import { IDictionary, IVisitedUser } from '../../../types';
import { getActivities } from '../../helpers';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithVisitedUserContent } from '../../intermediary';

export interface IWithUserProfileEnhancedData extends IDictionary {
	visitedUser: IVisitedUser;
	friends: string[];
	hasFriends: boolean;
	loadingProfile: boolean;
}

export interface IWithUserProfileEnhancedActions {
	getUserProfile: (alias: string) => void;
	getUserFriends: (alias: string) => void;
	getUserPosts: (alias: string) => void;
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
				{({ dictionary }) => (
					<WithProfiles>
						{({ friends, getProfileByAlias, getProfileFriendsByAlias }) => (
							<WithActivities>
								{({ activities }) => (
									<WithPosts>
										{({ getUserPosts }) => (
											<WithVisitedUserContent>
												{({ visitedUser }) =>
													this.props.children({
														data: {
															visitedUser,
															friends: friends[visitedUser.alias],
															hasFriends:
																friends[visitedUser.alias] && friends[visitedUser.alias].length > 0,
															loadingProfile: getActivities(activities, [
																ProfileActionTypes.GET_PROFILE_BY_ALIAS,
																ProfileActionTypes.GET_PROFILE_FRIENDS_BY_ALIAS,
																PostActionTypes.GET_USER_POSTS,
															]),
															dictionary,
														},
														actions: {
															getUserProfile: (alias: string) => {
																getProfileByAlias(alias);
																getProfileFriendsByAlias(alias);
																getUserPosts(alias);
															},
															getUserFriends: getProfileFriendsByAlias,
															getUserPosts,
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
			</WithI18n>
		);
	}
}
