import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	createPost,
	getPostByPath,
	getPostsByUsername,
	getPublicPostsByDate,
	ICreatePostInput,
	IDateInput,
	IPost,
	IPostLikeInput,
	IPostPathInput,
	IRemovePostInput,
	IUsernameInput,
	likePost,
	loadMoreFriendsPosts,
	loadMorePosts,
	removePost,
	resetPostsAndRefetch,
	unlikePost,
} from '../../../store/data/posts';

import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	all: {
		[postId: string]: IPost;
	};
	global: {
		canLoadMore: boolean;
		posts: IPost[];
	};
	friends: {
		canLoadMore: boolean;
		posts: IPost[];
	};
}

interface IActionProps {
	loadMorePosts: () => void;
	loadMoreFriendsPosts: () => void;
	getPostByPath: (getPostByPathInput: IPostPathInput) => void;
	getPostsByUsername: (getPostsByUsernameInput: IUsernameInput) => void;
	getPublicPostsByDate: (getPostByDateInput: IDateInput) => void;
	resetPostsAndRefetch: () => void;
	createPost: (createPostInput: ICreatePostInput) => void;
	removePost: (removePostInput: IRemovePostInput) => void;
	likePost: (input: IPostLikeInput) => void;
	unlikePost: (input: IPostLikeInput) => void;
}

type IProps = IDataProps & IActionProps;

interface IChildren {
	children: (props: IProps) => JSX.Element;
}

class Enhancer extends React.Component<IProps & IChildren> {
	render() {
		const { children, ...props } = this.props;
		return children(props);
	}
}

const selectAllPosts = createSelector(
	(state: IApplicationState) => state.data.posts.all,
	(posts) => posts,
);

const selectGlobalPosts = createSelector(
	(state: IApplicationState) => state.data.posts.global.posts,
	(posts) => posts,
);

const selectGlobalCanLoad = createSelector(
	(state: IApplicationState) => state.data.posts.global.canLoadMore,
	(canLoad) => canLoad,
);

const selectFriendsPosts = createSelector(
	(state: IApplicationState) => state.data.posts.friends.posts,
	(posts) => posts,
);

const selectFriendsCanLoad = createSelector(
	(state: IApplicationState) => state.data.posts.friends.canLoadMore,
	(canLoad) => canLoad,
);

const mapStateToProps = (state: IApplicationState) => ({
	all: selectAllPosts(state),
	global: {
		posts: selectGlobalPosts(state),
		canLoadMore: selectGlobalCanLoad(state),
	},
	friends: {
		posts: selectFriendsPosts(state),
		canLoadMore: selectFriendsCanLoad(state),
	},
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	loadMorePosts: () => dispatch(loadMorePosts()),
	loadMoreFriendsPosts: () => dispatch(loadMoreFriendsPosts()),
	getPostByPath: (getPostPathInput: IPostPathInput) => dispatch(getPostByPath(getPostPathInput)),
	getPostsByUsername: (getPostsByUsernameInpiut: IUsernameInput) =>
		dispatch(getPostsByUsername(getPostsByUsernameInpiut)),
	getPublicPostsByDate: (getPostByDateInput: IDateInput) =>
		dispatch(getPublicPostsByDate(getPostByDateInput)),
	resetPostsAndRefetch: () => dispatch(resetPostsAndRefetch()),
	createPost: (createPostInput: ICreatePostInput) => dispatch(createPost(createPostInput as any)),
	removePost: (removePostInput: IRemovePostInput) => dispatch(removePost(removePostInput)),
	likePost: (input: IPostLikeInput) => dispatch(likePost(input)),
	unlikePost: (input: IPostLikeInput) => dispatch(unlikePost(input)),
});

export const WithPosts: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
