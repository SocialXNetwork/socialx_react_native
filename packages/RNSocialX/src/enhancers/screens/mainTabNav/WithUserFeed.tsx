/**
 * TODO list:
 * 1. Props data: currentUser, posts, hasMorePosts, refreshingFeed, loadingMorePosts, loadingFeed
 * 2. Props actions: loadPosts, refreshFeed, likePost, unlikePost, deletePost, showActivityIndicator, hideActivityIndicator, postComment
 */

import * as React from 'react';
import {FEED_TYPES} from '../../../environment/consts';
import {currentUser, posts} from '../../../mocks';
import {ICurrentUser, ITranslatedProps, IWallPostCardProps} from '../../../types';

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
		deletePost: (postId: string) => {
			/**/
		},
		showActivityIndicator: (message: string) => {
			/**/
		},
		hideActivityIndicator: () => {
			/**/
		},
		postComment: (escapedComment: string, postId: string) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithUserFeedEnhancedData {
	currentUser: ICurrentUser;
	posts: IWallPostCardProps[];
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
	showActivityIndicator: (message: string) => void;
	hideActivityIndicator: () => void;
	postComment: (escapedComment: string, postId: string) => void;
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
		return this.props.children({data: mock.data, actions: mock.actions});
	}
}
