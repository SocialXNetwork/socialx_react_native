import { ICommentMetasCallback } from '@socialx/api-data';
import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	commentLikes,
	createComment,
	ICommentData,
	ICommentIdArgument,
	ICreateCommentInput,
	IPostIdArgument,
	likeComment,
	postComments,
} from '../../../store/data/comments';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	comments: ICommentData[];
	commentMetaById: ICommentMetasCallback[];
}

interface IActionProps {
	commentLikes: (commentLikesArgument: ICommentIdArgument) => void;
	createComment: (createCommentArgument: ICreateCommentInput) => void;
	likeComment: (likeCommentArgument: ICommentIdArgument) => void;
	postComments: (postCommentsArguments: IPostIdArgument) => void;
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
	commentLikes: (commentLikesArgument: ICommentIdArgument) =>
		dispatch(commentLikes(commentLikesArgument)),
	createComment: (createCommentArgument: ICreateCommentInput) =>
		dispatch(createComment(createCommentArgument)),
	likeComment: (likeCommentArgument: ICommentIdArgument) =>
		dispatch(likeComment(likeCommentArgument)),
	postComments: (postCommentsArguments: IPostIdArgument) =>
		dispatch(postComments(postCommentsArguments)),
});

export const WithAccounts: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer) as any;
