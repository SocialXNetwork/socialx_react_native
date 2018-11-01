/**
 * TODO list:
 * 1. Props actions: blockUser, reportProblem
 */

import * as React from 'react';

import { FEED_TYPES } from '../../../environment/consts';
import {
	ICurrentUser,
	IError,
	IGlobal,
	INavigationParamsActions,
	IOptionsMenuProps,
	ITranslatedProps,
	IWallPostData,
} from '../../../types';
import { getActivity, mapPostsForUI } from '../../helpers';

import { IPostReturnData } from '../../../store/aggregations/posts';
import { ActionTypes } from '../../../store/data/posts/Types';
import { WithAggregations } from '../../connectors/aggregations/WithAggregations';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../intermediary';

export interface IWithUserFeedEnhancedData {
	currentUser: ICurrentUser;
	posts: IWallPostData[];
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
												{({ activities }) => (
													<WithProfiles>
														{({ profiles }) => (
															<WithPosts>
																{(feed) => (
																	<WithCurrentUser>
																		{({ currentUser }) => {
																			let feedPosts: IWallPostData[] = [];

																			if (feed.posts.length > 0) {
																				feedPosts = mapPostsForUI(
																					feed.posts,
																					10,
																					currentUser,
																					profiles,
																					activities,
																					appConfig,
																				);
																			}

																			return this.props.children({
																				data: {
																					currentUser: currentUser!,
																					posts: feedPosts,
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
																					refreshFeed: async () => {
																						await feed.resetPostsAndRefetch();
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
