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
} from '../../../store/data/posts';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	posts: IPostData[];
	postMetaById: {
		[postId: string]: IPostData;
	};
	postMetasByUser: {
		[username: string]: IPostData;
	};
}

interface IActionProps {
	createPost: (createPostInput: IPostData) => void;
	likePost: (likePostInput: IPostIdInput) => void;
	getPostByPath: (getPostByPathInput: IPostPathInput) => void;
	getPostLikes: (getPostLikesInput: IPostIdInput) => void;
	getPostPathsByUsername: (getPostPathsByUsernameInput: IUsernameInput) => void;
	getPublicPostsByDate: (getPostByDateInput: IDateInput) => void;
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
});

export const WithPosts: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
