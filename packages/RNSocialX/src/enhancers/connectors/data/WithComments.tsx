import { ICommentMetasCallback } from '@socialx/api-data';
import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	createComment,
	getCommentLikes,
	getPostComments,
	ICommentData,
	ICommentIdArgument,
	ICreateCommentInput,
	IPostIdArgument,
	likeComment,
} from '../../../store/data/comments';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	comments: ICommentData[];
	commentMetaById: {
		[commentId: string]: ICommentMetasCallback;
	};
}

interface IActionProps {
	createComment: (createCommentArgument: ICreateCommentInput) => void;
	likeComment: (likeCommentArgument: ICommentIdArgument) => void;
	getCommentLikes: (getCommentLikesArgument: ICommentIdArgument) => void;
	getPostComments: (postCommentsArguments: IPostIdArgument) => void;
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

const selectComments = createSelector(
	(state: IApplicationState) => state.data.comments.comments,
	(comments) => comments,
);
const selectCommentMetaById = createSelector(
	(state: IApplicationState) => state.data.comments.commentMetaById,
	(commentMetaById) => commentMetaById,
);

const mapStateToProps = (state: IApplicationState) => ({
	comments: selectComments(state),
	commentMetaById: selectCommentMetaById(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	createComment: (createCommentArgument: ICreateCommentInput) =>
		dispatch(createComment(createCommentArgument)),
	getCommentLikes: (getCommentLikesArgument: ICommentIdArgument) =>
		dispatch(getCommentLikes(getCommentLikesArgument)),
	getPostComments: (getPostCommentsArguments: IPostIdArgument) =>
		dispatch(getPostComments(getPostCommentsArguments)),
	likeComment: (likeCommentArgument: ICommentIdArgument) =>
		dispatch(likeComment(likeCommentArgument)),
});

export const WithAccounts: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer) as any;
