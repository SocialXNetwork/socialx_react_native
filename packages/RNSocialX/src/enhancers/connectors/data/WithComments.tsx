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
	ICommentIdInput,
	ICreateCommentInput,
	IPostIdInput,
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
	createComment: (createCommentInput: ICreateCommentInput) => void;
	likeComment: (likeCommentInput: ICommentIdInput) => void;
	getCommentLikes: (getCommentLikesInput: ICommentIdInput) => void;
	getPostComments: (postCommentsInput: IPostIdInput) => void;
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
	createComment: (createCommentInput: ICreateCommentInput) =>
		dispatch(createComment(createCommentInput)),
	getCommentLikes: (getCommentLikesInput: ICommentIdInput) =>
		dispatch(getCommentLikes(getCommentLikesInput)),
	getPostComments: (getPostCommentsInput: IPostIdInput) =>
		dispatch(getPostComments(getPostCommentsInput)),
	likeComment: (likeCommentInput: ICommentIdInput) =>
		dispatch(likeComment(likeCommentInput)),
});

export const WithComments: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
