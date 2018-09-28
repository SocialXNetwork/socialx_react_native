import { IRemovePostInput, IUnlikePostInput } from '@socialx/api-data';
import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	createPost,
	getPostByPath,
	getPostLikes,
	getPostPathsByUsername,
	getPublicPostsByDate,
	IDateInput,
	IPostData,
	IPostIdInput,
	IPostPathInput,
	IUsernameInput,
	likePost,
	removePost,
	unlikePost,
} from '../../../store/data/posts';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	posts: IPostData[] | null;
	postMetaById: {
		[postId: string]: IPostData;
	} | null;
	postMetasByUser: {
		[username: string]: IPostData;
	} | null;
}

interface IActionProps {
	createPost: (createPostInput: IPostData) => void;
	likePost: (likePostInput: IPostIdInput) => void;
	getPostByPath: (getPostByPathInput: IPostPathInput) => void;
	getPostLikes: (getPostLikesInput: IPostIdInput) => void;
	getPostPathsByUsername: (getPostPathsByUsernameInput: IUsernameInput) => void;
	getPublicPostsByDate: (getPostByDateInput: IDateInput) => void;
	removePost: (removePostInput: IRemovePostInput) => void;
	unlikePost: (unlikePostInput: IUnlikePostInput) => void;
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

const selectPosts = createSelector(
	(state: IApplicationState) => state.data.posts.posts,
	(posts) => posts,
);

const selectPostMetaById = createSelector(
	(state: IApplicationState) => state.data.posts.postMetaById,
	(postMetaById) => postMetaById,
);

const selectPostMetasByUser = createSelector(
	(state: IApplicationState) => state.data.posts.postMetasByUser,
	(postMetasByUser) => postMetasByUser,
);

const mapStateToProps = (state: IApplicationState) => ({
	posts: selectPosts(state),
	postMetaById: selectPostMetaById(state),
	postMetasByUser: selectPostMetasByUser(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	createPost: (createPostInput: IPostData) =>
		dispatch(createPost(createPostInput)),
	likePost: (likePostInput: IPostIdInput) => dispatch(likePost(likePostInput)),
	getPostByPath: (getPostPathInput: IPostPathInput) =>
		dispatch(getPostByPath(getPostPathInput)),
	getPostLikes: (getPostLikesInput: IPostIdInput) =>
		dispatch(getPostLikes(getPostLikesInput)),
	getPostPathsByUser: (getPostPathsByUsernameInput: IUsernameInput) =>
		dispatch(getPostPathsByUsername(getPostPathsByUsernameInput)),
	getPublicPostsByDate: (getPostByDateInput: IDateInput) =>
		dispatch(getPublicPostsByDate(getPostByDateInput)),
	removePost: (removePostInput: IRemovePostInput) =>
		dispatch(removePost(removePostInput)),
	unlikePost: (unlikePostInput: IUnlikePostInput) =>
		dispatch(unlikePost(unlikePostInput)),
});

export const WithPosts: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
