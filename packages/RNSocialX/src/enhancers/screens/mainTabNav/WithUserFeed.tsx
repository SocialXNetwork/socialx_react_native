/**
 * TODO list:
 * 1. Props data: currentUser, posts, hasMorePosts, refreshingFeed, loadingMorePosts, loadingFeed
 * 2. Props actions: loadPosts, refreshFeed, likePost, unlikePost, deletePost, postComment, blockUser, reportProblem
 */

import * as React from 'react';
import { FEED_TYPES } from '../../../environment/consts';
import { currentUser, posts } from '../../../mocks';
import {
	ICurrentUser,
	ITranslatedProps,
	IWallPostCardData,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

// TODO: @alex @ionut the posts mock is mixed with actions, what is this?
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

export interface IWithUserFeedEnhancedActions extends ITranslatedProps {
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
				{(i18nProps) =>
					this.props.children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
