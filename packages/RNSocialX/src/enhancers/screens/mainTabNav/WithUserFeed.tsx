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
import { IFriendData } from '../../../store/data/profiles';
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
	posts: IWallPostData[];
	friends: { [key: string]: IFriendData[] };
	errors: IError[];
	skeletonPost: IWallPostData;
	creatingPost: boolean;
	canLoadMorePosts: boolean;
	refreshingFeed: boolean;
	loadingMorePosts: boolean;
}

export interface IWithUserFeedEnhancedActions extends ITranslatedProps, INavigationParamsActions {
	loadMorePosts: () => void;
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
														{({ profiles, friends }) => (
															<WithPosts>
																{(feed) => (
																	<WithCurrentUser>
																		{({ currentUser }) => {
																			const IPFS_URL = appConfig.ipfsConfig.ipfs_URL;
																			let posts: IWallPostData[] = [];

																			if (feed.posts.length > 0) {
																				posts = mapPostsForUI(
																					feed.posts,
																					10,
																					currentUser,
																					profiles,
																					activities,
																					IPFS_URL,
																				);
																			}

																			return this.props.children({
																				data: {
																					currentUser,
																					posts,
																					friends,
																					errors,
																					skeletonPost: globals.skeletonPost,
																					canLoadMorePosts: globals.canLoadMorePosts,
																					loadingMorePosts: getActivity(
																						activities,
																						ActionTypes.LOAD_MORE_POSTS,
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
																					loadMorePosts: feed.loadMorePosts,
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
