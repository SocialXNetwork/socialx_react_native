import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	createComment,
	createPost,
	getPostByPath,
	getPostsByUsername,
	getPublicPostsByDate,
	ICommentIdInput,
	ICreateCommentInput,
	ICreatePostInput,
	IDateInput,
	IPostArrayData,
	IPostIdInput,
	IPostPathInput,
	IRemoveCommentInput,
	IRemovePostInput,
	IUnlikeCommentInput,
	IUnlikePostInput,
	IUsernameInput,
	likeComment,
	likePost,
	removeComment,
	removePost,
	unlikeComment,
	unlikePost,
} from '../../../store/data/posts';

import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	posts: IPostArrayData;
}

interface IActionProps {
	createPost: (createPostInput: ICreatePostInput) => void;
	getPostByPath: (getPostByPathInput: IPostPathInput) => void;
	getPostsByUsername: (getPostsByUsernameInput: IUsernameInput) => void;
	getPublicPostsByDate: (getPostByDateInput: IDateInput) => void;
	removePost: (removePostInput: IRemovePostInput) => void;
	unlikePost: (unlikePostInput: IUnlikePostInput) => void;
	likePost: (likePostInput: IPostIdInput) => void;
	// comments
	createComment: (createCommentInput: ICreateCommentInput) => void;
	removeComment: (removeCommentInput: IRemoveCommentInput) => void;
	likeComment: (likeCommentInput: ICommentIdInput) => void;
	unlikeComment: (unlikeCommentInput: IUnlikeCommentInput) => void;
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

const mapStateToProps = (state: IApplicationState) => ({
	posts: selectPosts(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	createPost: (createPostInput: ICreatePostInput) =>
		dispatch(createPost(createPostInput)),
	likePost: (likePostInput: IPostIdInput) => dispatch(likePost(likePostInput)),
	getPostByPath: (getPostPathInput: IPostPathInput) =>
		dispatch(getPostByPath(getPostPathInput)),
	getPostsByUsername: (getPostsByUsernameInpiut: IUsernameInput) =>
		dispatch(getPostsByUsername(getPostsByUsernameInpiut)),
	getPublicPostsByDate: (getPostByDateInput: IDateInput) =>
		dispatch(getPublicPostsByDate(getPostByDateInput)),
	removePost: (removePostInput: IRemovePostInput) =>
		dispatch(removePost(removePostInput)),
	unlikePost: (unlikePostInput: IUnlikePostInput) =>
		dispatch(unlikePost(unlikePostInput)),
	// comments
	createComment: (createCommentInput: ICreateCommentInput) =>
		dispatch(createComment(createCommentInput)),
	removeComment: (removeCommentInput: IRemoveCommentInput) =>
		dispatch(removeComment(removeCommentInput)),
	likeComment: (likeCommentInput: ICommentIdInput) =>
		dispatch(likeComment(likeCommentInput)),
	unlikeComment: (unlikeCommentInput: IUnlikeCommentInput) =>
		dispatch(unlikeComment(unlikeCommentInput)),
});

export const WithPosts: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
