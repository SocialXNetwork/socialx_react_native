/**
 * TODO list:
 * 1. Props data: currentUser, posts, hasMorePosts, refreshingFeed, loadingMorePosts, loadingFeed
 * 2. Props actions: loadPosts, refreshFeed, likePost, unlikePost, deletePost, showActivityIndicator, hideActivityIndicator
 */

import * as React from 'react';
import {IWallPostCardProps} from '../../../components';
import {FEED_TYPES} from '../../../environment/consts';
import {currentUser, posts} from '../../../mocks';
import {ICurrentUser, ITranslatedProps} from '../../../types';

const mock = {
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
}

interface IUserFeedEnhancedProps {
	data: IWithUserFeedEnhancedData;
	actions: IWithUserFeedEnhancedActions;
}

interface IUserFeedProps {
	children(props: IUserFeedEnhancedProps): JSX.Element;
}

interface IUserFeedState {}

export class WithUserFeed extends React.Component<IUserFeedProps, IUserFeedState> {
	render() {
		return this.props.children({data: mock.data, actions: mock.actions});
	}
}
