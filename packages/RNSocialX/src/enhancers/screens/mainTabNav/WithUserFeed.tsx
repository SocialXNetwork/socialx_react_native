/**
 * TODO list:
 * Add the required loading/refreshing props
 */

import * as React from 'react';

import { FEED_TYPES } from '../../../environment/consts';
import { currentUser, posts } from '../../../mocks';
import {
	ICurrentUser,
	INavigationParamsActions,
	ITranslatedProps,
	IWallPostCardData,
} from '../../../types';
import { mapPostsForUI } from '../../helpers';

import { ActionTypes } from '../../../store/data/posts/Types';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithCurrentUser } from '../intermediary';

const mock: IWithUserFeedEnhancedProps = {
	data: {
		currentUser,
		posts,
		hasMorePosts: false,
		refreshingFeed: false,
		loadingMorePosts: false,
		loadingFeed: false,
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
		getText: (value: string, ...args: any[]) => value,
		setNavigationParams: () => {
			/**/
		},
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
							<WithActivities>
								{({ activities }) => (
									<WithPosts>
										{(postsProps) => (
											<WithCurrentUser>
												{(currentUserProps) => {
													const feedPosts = mapPostsForUI(
														postsProps.posts,
														10,
														currentUser!,
														activities,
														ActionTypes.GET_POSTS_BY_USER,
														appConfig,
													);

													return this.props.children({
														data: {
															...mock.data,
															currentUser: currentUserProps.currentUser!,
															posts: feedPosts,
															hasMorePosts:
																postsProps.posts.length - feedPosts.length > 0,
														},
														actions: {
															...mock.actions,
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
					</WithConfig>
				)}
			</WithI18n>
		);
	}
}
