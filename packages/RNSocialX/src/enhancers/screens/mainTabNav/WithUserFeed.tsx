/**
 * TODO list:
 * 1. Props actions: blockUser, reportProblem
 */

import * as React from 'react';

import { FEED_TYPES } from '../../../environment/consts';
import { currentUser, posts } from '../../../mocks';
import {
	ICurrentUser,
	IGlobal,
	INavigationParamsActions,
	ITranslatedProps,
	IWallPostCardData,
} from '../../../types';
import { getActivity, mapPostsForUI } from '../../helpers';

import { ActionTypes } from '../../../store/data/posts/Types';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithCurrentUser } from '../intermediary';

const mock: IWithUserFeedEnhancedProps = {
	data: {
		currentUser,
		posts,
		hasMorePosts: false,
		refreshingFeed: false,
		loadingMorePosts: false,
		loadingFeed: true,
	},
	actions: {
		loadPosts: (feed: FEED_TYPES) => {
			/**/
		},
		refreshFeed: (feed: FEED_TYPES) => {
			/**/
		},
		likePost: (postId: string) => {
			/**/
		},
		unlikePost: (postId: string) => {
			/**/
		},
		postComment: (escapedComment: string, postId: string) => {
			/**/
		},
		blockUser: (userId: string) => {
			/**/
		},
		reportProblem: (reason: string, description: string) => {
			/**/
		},
		deletePost: (postId: string) => {
			/**/
		},
		setGlobal: (global: IGlobal) => {
			/**/
		},
		setNavigationParams: () => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithUserFeedEnhancedData {
	currentUser: ICurrentUser;
	posts: IWallPostCardData[];
	hasMorePosts: boolean;
	refreshingFeed: boolean;
	loadingMorePosts: boolean;
	loadingFeed: boolean;
}

export interface IWithUserFeedEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions {
	loadPosts: (feed: FEED_TYPES) => void;
	refreshFeed: (feed: FEED_TYPES) => void;
	likePost: (postId: string) => void;
	unlikePost: (postId: string) => void;
	deletePost: (postId: string) => void;
	postComment: (escapedComment: string, postId: string) => void;
	blockUser: (userId: string) => void;
	reportProblem: (reason: string, description: string) => void;
	setGlobal: (global: IGlobal) => void;
}

interface IWithUserFeedEnhancedProps {
	data: IWithUserFeedEnhancedData;
	actions: IWithUserFeedEnhancedActions;
}

interface IWithUserFeedProps {
	children(props: IWithUserFeedEnhancedProps): JSX.Element;
}

interface IWithUserFeedState {}

export class WithUserFeed extends React.Component<
	IWithUserFeedProps,
	IWithUserFeedState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithConfig>
						{({ appConfig }) => (
							<WithNavigationParams>
								{({ setNavigationParams }) => (
									<WithGlobals>
										{({ setGlobal }) => (
											<WithActivities>
												{({ activities }) => (
													<WithPosts>
														{(postsProps) => (
															<WithCurrentUser>
																{(currentUserProps) => {
																	let feedPosts: any = [];
																	if (postsProps.posts.length > 0) {
																		feedPosts = mapPostsForUI(
																			postsProps.posts,
																			10,
																			currentUser!,
																			activities,
																			ActionTypes.GET_POSTS_BY_USER,
																			appConfig,
																		);
																	}

																	return this.props.children({
																		data: {
																			currentUser: currentUserProps.currentUser!,
																			posts: feedPosts,
																			hasMorePosts:
																				postsProps.posts.length -
																					feedPosts.length >
																				0,
																			loadingMorePosts: getActivity(
																				activities,
																				ActionTypes.LOAD_MORE_POSTS,
																			),
																			refreshingFeed: getActivity(
																				activities,
																				ActionTypes.GET_PUBLIC_POSTS_BY_DATE,
																			),
																			loadingFeed: getActivity(
																				activities,
																				ActionTypes.GET_PUBLIC_POSTS_BY_DATE,
																			),
																		},
																		actions: {
																			...mock.actions,
																			// loadPosts: () =>
																			// 	postsProps.getPublicPostsByDate({
																			// 		date: new Date(Date.now()),
																			// 	}),
																			refreshFeed: () =>
																				postsProps.getPublicPostsByDate({
																					date: new Date(Date.now()),
																				}),
																			likePost: (postId) =>
																				postsProps.likePost({ postId }),
																			unlikePost: (postId) =>
																				postsProps.unlikePost({ postId }),
																			deletePost: (postId) =>
																				postsProps.removePost({ postId }),
																			postComment: (text, postId) =>
																				postsProps.createComment({
																					text,
																					postId,
																				}),
																			setNavigationParams,
																			setGlobal,
																			getText: i18nProps.getText,
																		},
																	});
																}}
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
					</WithConfig>
				)}
			</WithI18n>
		);
	}
}
