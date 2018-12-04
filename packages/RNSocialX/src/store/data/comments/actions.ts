import { ICommentsReturnData, IPostArrayData } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { syncAddCommentAction, syncRemoveCommentAction } from '../posts';
import {
	ActionTypes,
	ICreateCommentAction,
	ICreateCommentErrorAction,
	ICreateCommentInput,
	ILikeCommentAction,
	ILikeCommentErrorAction,
	ILikeCommentInput,
	ILoadCommentsAction,
	IRemoveCommentAction,
	IRemoveCommentInput,
	IUnlikeCommentAction,
	IUnlikeCommentErrorAction,
} from './Types';

export const loadCommentsAction: ActionCreator<ILoadCommentsAction> = (posts: IPostArrayData) => ({
	type: ActionTypes.LOAD_COMMENTS,
	payload: posts,
});

const createCommentAction: ActionCreator<ICreateCommentAction> = (
	comment: ICommentsReturnData,
) => ({
	type: ActionTypes.CREATE_COMMENT,
	payload: comment,
});

const createCommentErrorAction: ActionCreator<ICreateCommentErrorAction> = (commentId: string) => ({
	type: ActionTypes.CREATE_COMMENT_ERROR,
	payload: commentId,
});

export const createComment = (createCommentInput: ICreateCommentInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();

	const { text, alias, pub, postId } = createCommentInput;
	const comment = {
		commentId: uuid(),
		text,
		owner: {
			alias,
			pub,
		},
		timestamp: Number(new Date(Date.now())),
		likes: [],
	};

	try {
		dispatch(createCommentAction(comment));
		await dispatch(
			beginActivity({
				type: ActionTypes.CREATE_COMMENT,
				uuid: activityId,
			}),
		);
		dispatch(syncAddCommentAction({ postId, commentId: comment.commentId, error: false }));
		const id = await context.dataApi.comments.createComment({ text, postId });
		console.log(id);
	} catch (e) {
		dispatch(createCommentErrorAction(comment.commentId));
		dispatch(syncAddCommentAction({ postId, commentId: comment.commentId, error: true }));
		await dispatch(
			setError({
				type: ActionTypes.CREATE_COMMENT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const removeCommentAction: ActionCreator<IRemoveCommentAction> = (commentId: string) => ({
	type: ActionTypes.REMOVE_COMMENT,
	payload: commentId,
});

export const removeComment = (input: IRemoveCommentInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const { commentId, postId } = input;

	try {
		dispatch(removeCommentAction(commentId));
		await context.dataApi.comments.removeComment({ commentId });
		dispatch(syncRemoveCommentAction({ postId, commentId }));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.REMOVE_COMMENT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};

const likeCommentAction: ActionCreator<ILikeCommentAction> = (
	likeCommentInput: ILikeCommentInput,
) => ({
	type: ActionTypes.LIKE_COMMENT,
	payload: likeCommentInput,
});

const likeCommentErrorAction: ActionCreator<ILikeCommentErrorAction> = (
	likeCommentErrorInput: ILikeCommentInput,
) => ({
	type: ActionTypes.LIKE_COMMENT_ERROR,
	payload: likeCommentErrorInput,
});

export const likeComment = (likeCommentInput: ILikeCommentInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(likeCommentAction(likeCommentInput));
		await context.dataApi.comments.likeComment(likeCommentInput);
	} catch (e) {
		dispatch(likeCommentErrorAction(likeCommentInput));
		await dispatch(
			setError({
				type: ActionTypes.LIKE_COMMENT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};

const unlikeCommentAction: ActionCreator<IUnlikeCommentAction> = (
	unlikeCommentInput: ILikeCommentInput,
) => ({
	type: ActionTypes.UNLIKE_COMMENT,
	payload: unlikeCommentInput,
});

const unlikeCommentErrorAction: ActionCreator<IUnlikeCommentErrorAction> = (
	unlikeCommentErrorInput: ILikeCommentInput,
) => ({
	type: ActionTypes.UNLIKE_COMMENT_ERROR,
	payload: unlikeCommentErrorInput,
});

export const unlikeComment = (unlikeCommentInput: ILikeCommentInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(unlikeCommentAction(unlikeCommentInput));
		await context.dataApi.comments.unlikeComment(unlikeCommentInput);
	} catch (e) {
		dispatch(unlikeCommentErrorAction(unlikeCommentInput));
		await dispatch(
			setError({
				type: ActionTypes.UNLIKE_COMMENT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};
