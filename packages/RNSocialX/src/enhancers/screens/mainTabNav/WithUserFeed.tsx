/**
 * TODO list:
 * 1. Props actions: blockUser, reportProblem
 */

import * as React from 'react';

import { FEED_TYPES } from '../../../environment/consts';
import {
	ICurrentUser,
	IError,
	INavigationParamsActions,
	ITranslatedProps,
	IWallPostData,
} from '../../../types';
import { getActivity, mapPostsForUI } from '../../helpers';

import { ActionTypes } from '../../../store/data/posts/Types';
import { assertNever } from '../../../store/helpers';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithCurrentUser } from '../intermediary';

export interface IWithUserFeedEnhancedData {
	currentUser: ICurrentUser;
	friendsPosts: IWallPostData[];
	globalPosts: IWallPostData[];
	errors: IError[];
	skeletonPost: IWallPostData;
	creatingPost: boolean;
	refreshingFeed: boolean;
	canLoadMoreGlobalPosts: boolean;
	canLoadMoreFriendsPosts: boolean;
	loadingMoreGlobalPosts: boolean;
	loadingMoreFriendsPosts: boolean;
}

export interface IWithUserFeedEnhancedActions extends ITranslatedProps, INavigationParamsActions {
	loadMoreGlobalPosts: () => void;
	loadMoreFriendsPosts: () => void;
	refreshFeed: (feed: FEED_TYPES) => void;
}

interface IWithUserFeedEnhancedProps {
	data: IWithUserFeedEnhancedData;
	actions: IWithUserFeedEnhancedActions;
}

interface IWithUserFeedProps {
	children(props: IWithUserFeedEnhancedProps): JSX.Element;
}

interface IWithUserFeedState {}

export class WithUserFeed extends React.Component<IWithUserFeedProps, IWithUserFeedState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithConfig>
						{({ appConfig }) => (
							<WithNavigationParams>
								{({ setNavigationParams }) => (
									<WithGlobals>
										{({ globals }) => (
											<WithActivities>
												{({ activities, errors }) => (
													<WithProfiles>
														{({ profiles }) => (
															<WithPosts>
																{(feed) => (
																	<WithCurrentUser>
																		{({ currentUser }) => {
																			const IPFS_URL = appConfig.ipfsConfig.ipfs_URL;
																			let globalPosts: IWallPostData[] = [];
																			let friendsPosts: IWallPostData[] = [];

																			if (feed.global.posts.length > 0) {
																				globalPosts = mapPostsForUI(
																					feed.global.posts,
																					currentUser,
																					profiles,
																					activities,
																					IPFS_URL,
																				);
																			}

																			if (feed.friends.posts.length > 0) {
																				friendsPosts = mapPostsForUI(
																					feed.friends.posts,
																					currentUser,
																					profiles,
																					activities,
																					IPFS_URL,
																				);
																			}

																			return this.props.children({
																				data: {
																					currentUser,
																					globalPosts,
																					friendsPosts,
																					errors,
																					skeletonPost: globals.skeletonPost,
																					canLoadMoreGlobalPosts: feed.global.canLoadMore,
																					canLoadMoreFriendsPosts: feed.friends.canLoadMore,
																					loadingMoreGlobalPosts: getActivity(
																						activities,
																						ActionTypes.LOAD_MORE_POSTS,
																					),
																					loadingMoreFriendsPosts: getActivity(
																						activities,
																						ActionTypes.LOAD_MORE_FRIENDS_POSTS,
																					),
																					refreshingFeed: getActivity(
																						activities,
																						ActionTypes.GET_PUBLIC_POSTS_BY_DATE,
																					),
																					creatingPost: getActivity(
																						activities,
																						ActionTypes.CREATE_POST,
																					),
																				},
																				actions: {
																					loadMoreGlobalPosts: feed.loadMorePosts,
																					loadMoreFriendsPosts: feed.loadMoreFriendsPosts,
																					refreshFeed: async (type) => {
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
																			});
																		}}
																	</WithCurrentUser>
																)}
															</WithPosts>
														)}
													</WithProfiles>
												)}
											</WithActivities>
										)}
									</WithGlobals>
								)}
							</WithNavigationParams>
						)}
					</WithConfig>
				)}
			</WithI18n>
		);
	}
}
