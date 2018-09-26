import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	createPost,
	IDateArgument,
	IPostData,
	IPostIdArgument,
	IPostPathArgument,
	IUsernameArgument,
	likePost,
	postByPath,
	postLikes,
	postPathsByUser,
	publicPostsByDate,
} from '../../../store/data/posts';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	posts: IPostData[];
	postMetaById: IPostData[];
	postMetasByUser: IPostData[];
}

interface IActionProps {
	createPost: (createPostArgument: IPostData) => void;
	likePost: (likePostArgument: IPostIdArgument) => void;
	postByPath: (postPathArgument: IPostPathArgument) => void;
	postLikes: (postLikesArgument: IPostIdArgument) => void;
	postPathsByUser: (postPathsByUsernameInput: IUsernameArgument) => void;
	publicPostsByDate: (postByDateArgument: IDateArgument) => void;
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
	postByPath: (postPathArgument: IPostPathArgument) =>
		dispatch(postByPath(postPathArgument)),
	postLikes: (postLikesArgument: IPostIdArgument) =>
		dispatch(postLikes(postLikesArgument)),
	postPathsByUser: (postPathsByUsernameInput: IUsernameArgument) =>
		dispatch(postPathsByUser(postPathsByUsernameInput)),
	publicPostsByDate: (postByDateArgument: IDateArgument) =>
		dispatch(publicPostsByDate(postByDateArgument)),
});

export const WithAccounts: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer) as any;
