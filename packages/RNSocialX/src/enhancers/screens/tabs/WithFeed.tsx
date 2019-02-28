/**
 * TODO list:
 * 1. Props actions: blockUser, reportProblem
 */

import * as React from 'react';

import { FEED_TYPES } from '../../../environment/consts';
import { ICurrentUser, IDictionary, INavigationParamsActions } from '../../../types';
import { getActivity } from '../../helpers';

import { ActionTypes } from '../../../store/data/posts/Types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithCurrentUser } from '../../intermediary';

export interface IWithFeedEnhancedData extends IDictionary {
	currentUser: ICurrentUser;
	postIds: string[];
	refreshing: boolean;
	loading: boolean;
	canLoad: boolean;
}

export interface IWithFeedEnhancedActions extends INavigationParamsActions {
	loadMorePosts: () => void;
	refreshFeed: () => void;
}

interface IWithFeedEnhancedProps {
	data: IWithFeedEnhancedData;
	actions: IWithFeedEnhancedActions;
}

interface IWithFeedProps {
	type: FEED_TYPES;
	children(props: IWithFeedEnhancedProps): JSX.Element;
}

interface IWithFeedState {}

export class WithFeed extends React.Component<IWithFeedProps, IWithFeedState> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) => (
					<WithNavigationParams>
						{({ setNavigationParams }) => (
							<WithActivities>
								{({ activities }) => (
									<WithPosts>
										{({
											global,
											friends,
											loadMorePosts,
											loadMoreFriendsPosts,
											refreshFriendsPosts,
											refreshGlobalPosts,
										}) => (
											<WithCurrentUser>
												{({ currentUser }) => {
													if (this.props.type === FEED_TYPES.GLOBAL) {
														return this.props.children({
															data: {
																currentUser,
																postIds: global.posts,
																canLoad: global.canLoadMore,
																loading: getActivity(activities, ActionTypes.LOAD_MORE_POSTS),
																refreshing: getActivity(
																	activities,
																	ActionTypes.REFRESH_GLOBAL_POSTS,
																),
																dictionary,
															},
															actions: {
																loadMorePosts,
																refreshFeed: refreshGlobalPosts,
																setNavigationParams,
															},
														});
													} else {
														return this.props.children({
															data: {
																currentUser,
																postIds: friends.posts,
																canLoad: friends.canLoadMore,
																loading: getActivity(
																	activities,
																	ActionTypes.LOAD_MORE_FRIENDS_POSTS,
																),
																refreshing: getActivity(
																	activities,
																	ActionTypes.REFRESH_FRIENDS_POSTS,
																),
																dictionary,
															},
															actions: {
																loadMorePosts: loadMoreFriendsPosts,
																refreshFeed: refreshFriendsPosts,
																setNavigationParams,
															},
														});
													}
												}}
											</WithCurrentUser>
										)}
									</WithPosts>
								)}
							</WithActivities>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
