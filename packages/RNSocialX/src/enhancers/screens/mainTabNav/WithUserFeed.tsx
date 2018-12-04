/**
 * TODO list:
 * 1. Props actions: blockUser, reportProblem
 */

import * as React from 'react';

import { FEED_TYPES } from '../../../environment/consts';
import {
	ICurrentUser,
	INavigationParamsActions,
	ITranslatedProps,
	IWallPost,
} from '../../../types';
import { getActivity } from '../../helpers';

import { ActionTypes } from '../../../store/data/posts/Types';
import { assertNever } from '../../../store/helpers';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithCurrentUser } from '../../intermediary';

export interface IWithUserFeedEnhancedData {
	currentUser: ICurrentUser;
	postIds: string[];
	placeholderPost: IWallPost;
	refreshingFeed: boolean;
	canLoadMore: boolean;
	loadingMorePosts: boolean;
}

export interface IWithUserFeedEnhancedActions extends ITranslatedProps, INavigationParamsActions {
	loadMorePosts: () => void;
	refreshFeed: () => void;
}

interface IWithUserFeedEnhancedProps {
	data: IWithUserFeedEnhancedData;
	actions: IWithUserFeedEnhancedActions;
}

interface IWithUserFeedProps {
	type: FEED_TYPES;
	children(props: IWithUserFeedEnhancedProps): JSX.Element;
}

interface IWithUserFeedState {}

export class WithUserFeed extends React.Component<IWithUserFeedProps, IWithUserFeedState> {
	render() {
		const { type } = this.props;

		return (
			<WithI18n>
				{({ getText }) => (
					<WithNavigationParams>
						{({ setNavigationParams }) => (
							<WithGlobals>
								{({ globals }) => (
									<WithActivities>
										{({ activities }) => (
											<WithPosts>
												{(feed) => (
													<WithCurrentUser>
														{({ currentUser }) =>
															this.props.children({
																data: {
																	currentUser,
																	postIds:
																		type === FEED_TYPES.GLOBAL
																			? feed.global.posts
																			: feed.friends.posts,
																	placeholderPost: globals.placeholderPost,
																	canLoadMore:
																		type === FEED_TYPES.GLOBAL
																			? feed.global.canLoadMore
																			: feed.friends.canLoadMore,
																	loadingMorePosts:
																		type === FEED_TYPES.GLOBAL
																			? getActivity(activities, ActionTypes.LOAD_MORE_POSTS)
																			: getActivity(
																					activities,
																					ActionTypes.LOAD_MORE_FRIENDS_POSTS,
																					// tslint:disable-next-line
																	  ),
																	refreshingFeed: getActivity(
																		activities,
																		ActionTypes.GET_PUBLIC_POSTS_BY_DATE,
																	),
																},
																actions: {
																	loadMorePosts:
																		type === FEED_TYPES.GLOBAL
																			? feed.loadMorePosts
																			: feed.loadMoreFriendsPosts,
																	refreshFeed: async () => {
																		switch (type) {
																			case FEED_TYPES.GLOBAL: {
																				await feed.resetPostsAndRefetch();
																				break;
																			}

																			case FEED_TYPES.FRIENDS: {
																				// TODO: this
																				break;
																			}

																			default:
																				assertNever(type);
																				break;
																		}
																	},
																	setNavigationParams,
																	getText,
																},
															})
														}
													</WithCurrentUser>
												)}
											</WithPosts>
										)}
									</WithActivities>
								)}
							</WithGlobals>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
