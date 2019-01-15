/**
 * TODO list:
 * 1. Props actions: blockUser, reportProblem
 */

import * as React from 'react';

import { ActionTypes as PostActionTypes } from '../../../store/data/posts/Types';
import { ActionTypes as ProfileActionTypes } from '../../../store/data/profiles/Types';
import { ITranslatedProps, IVisitedUser } from '../../../types';
import { getActivity } from '../../helpers';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithVisitedUserContent } from '../../intermediary';

export interface IWithUserProfileEnhancedData {
	visitedUser: IVisitedUser;
	hasFriends: boolean;
	loadingProfile: boolean;
	loadingPosts: boolean;
}

export interface IWithUserProfileEnhancedActions extends ITranslatedProps {
	getUserProfile: (alias: string) => void;
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
					<WithProfiles>
						{({ friends, getProfileByAlias }) => (
							<WithActivities>
								{({ activities }) => (
									<WithVisitedUserContent>
										{({ visitedUser }) =>
											this.props.children({
												data: {
													visitedUser,
													hasFriends:
														friends[visitedUser.alias] && friends[visitedUser.alias].length > 0,
													loadingProfile: getActivity(
														activities,
														ProfileActionTypes.GET_PROFILE_BY_ALIAS,
													),
													loadingPosts: getActivity(activities, PostActionTypes.GET_USER_POSTS),
												},
												actions: {
													getUserProfile: async (alias: string) => {
														await getProfileByAlias(alias);
													},
													getText,
												},
											})
										}
									</WithVisitedUserContent>
								)}
							</WithActivities>
						)}
					</WithProfiles>
				)}
			</WithI18n>
		);
	}
}
