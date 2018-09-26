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
	IDateArgument,
	IPostData,
	IPostIdArgument,
	IPostPathArgument,
	IUsernameArgument,
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
	createPost: (createPostArgument: IPostData) => void;
	likePost: (likePostArgument: IPostIdArgument) => void;
	getPostByPath: (getPostByPathArgument: IPostPathArgument) => void;
	getPostLikes: (getPostLikesArgument: IPostIdArgument) => void;
	getPostPathsByUsername: (
		getPostPathsByUsernameInput: IUsernameArgument,
	) => void;
	getPublicPostsByDate: (getPostByDateArgument: IDateArgument) => void;
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
	createPost: (createPostArgument: IPostData) =>
		dispatch(createPost(createPostArgument)),
	likePost: (likePostArgument: IPostIdArgument) =>
		dispatch(likePost(likePostArgument)),
	getPostByPath: (getPostPathArgument: IPostPathArgument) =>
		dispatch(getPostByPath(getPostPathArgument)),
	getPostLikes: (getPostLikesArgument: IPostIdArgument) =>
		dispatch(getPostLikes(getPostLikesArgument)),
	getPostPathsByUser: (getPostPathsByUsernameInput: IUsernameArgument) =>
		dispatch(getPostPathsByUsername(getPostPathsByUsernameInput)),
	getPublicPostsByDate: (getPostByDateArgument: IDateArgument) =>
		dispatch(getPublicPostsByDate(getPostByDateArgument)),
});

export const WithAccounts: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer) as any;
