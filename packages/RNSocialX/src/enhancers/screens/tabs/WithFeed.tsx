/**
 * TODO list:
 * 1. Props actions: blockUser, reportProblem
 */

import * as React from 'react';

import { FEED_TYPES } from '../../../environment/consts';
import { ICurrentUser, INavigationParamsActions, ITranslatedProps } from '../../../types';
import { getActivity } from '../../helpers';

import { ActionTypes } from '../../../store/data/posts/Types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithCurrentUser } from '../../intermediary';

export interface IWithFeedEnhancedData {
	currentUser: ICurrentUser;
	postIds: string[];
	refreshing: boolean;
	loading: boolean;
	canLoad: boolean;
}

export interface IWithFeedEnhancedActions extends ITranslatedProps, INavigationParamsActions {
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
		const { type } = this.props;

		return (
			<WithI18n>
				{({ getText }) => (
					<WithNavigationParams>
						{({ setNavigationParams }) => (
							<WithActivities>
								{({ activities }) => (
									<WithPosts>
										{(feed) => (
											<WithCurrentUser>
												{({ currentUser }) => {
													if (type === FEED_TYPES.GLOBAL) {
														return this.props.children({
															data: {
																currentUser,
																postIds: feed.global.posts,
																canLoad: feed.global.canLoadMore,
																loading: getActivity(activities, ActionTypes.LOAD_MORE_POSTS),
																refreshing: getActivity(
																	activities,
																	ActionTypes.REFRESH_GLOBAL_POSTS,
																),
															},
															actions: {
																loadMorePosts: feed.loadMorePosts,
																refreshFeed: async () => {
																	await feed.refreshGlobalPosts();
																},
																setNavigationParams,
																getText,
															},
														});
													} else {
														return this.props.children({
															data: {
																currentUser,
																postIds: feed.friends.posts,
																canLoad: feed.friends.canLoadMore,
																loading: getActivity(
																	activities,
																	ActionTypes.LOAD_MORE_FRIENDS_POSTS,
																),
																refreshing: getActivity(
																	activities,
																	ActionTypes.REFRESH_FRIENDS_POSTS,
																),
															},
															actions: {
																loadMorePosts: feed.loadMoreFriendsPosts,
																refreshFeed: async () => {
																	await feed.refreshFriendsPosts();
																},
																setNavigationParams,
																getText,
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
