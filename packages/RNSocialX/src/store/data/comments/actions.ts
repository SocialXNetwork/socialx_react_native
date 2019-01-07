import { IPostArrayData } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { setGlobal } from '../../ui/globals';
import {
	addCommentToPostAction,
	removeCommentFromPostAction,
	replaceCommentOnPostAction,
} from '../posts';
import {
	ActionTypes,
	IComment,
	ICreateCommentAction,
	ICreateCommentErrorAction,
	ICreateCommentInput,
	ILikeCommentAction,
	ILikeCommentErrorAction,
	ILikeCommentInput,
	ILoadCommentsAction,
	IRemoveCommentAction,
	IRemoveCommentInput,
	IReplaceCommentInput,
	ISyncCreateCommentAction,
	ISyncRemoveCommentAction,
	IUnlikeCommentAction,
	IUnlikeCommentErrorAction,
} from './Types';

export const loadCommentsAction: ActionCreator<ILoadCommentsAction> = (posts: IPostArrayData) => ({
	type: ActionTypes.LOAD_COMMENTS,
	payload: posts,
});

const createCommentAction: ActionCreator<ICreateCommentAction> = (comment: IComment) => ({
	type: ActionTypes.CREATE_COMMENT,
	payload: comment,
});

const createCommentErrorAction: ActionCreator<ICreateCommentErrorAction> = (commentId: string) => ({
	type: ActionTypes.CREATE_COMMENT_ERROR,
	payload: commentId,
});

const syncCreateCommentAction: ActionCreator<ISyncCreateCommentAction> = (
	input: IReplaceCommentInput,
) => ({
	type: ActionTypes.SYNC_CREATE_COMMENT,
	payload: input,
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
		posting: true,
	};

	try {
		dispatch(createCommentAction(comment));
		await dispatch(
			beginActivity({
				type: ActionTypes.CREATE_COMMENT,
				uuid: activityId,
			}),
		);
		dispatch(addCommentToPostAction({ postId, commentId: comment.commentId, error: false }));
		const id = await context.dataApi.comments.createComment({ text, postId });

		dispatch(syncCreateCommentAction({ previousCommentId: comment.commentId, commentId: id }));
		dispatch(
			replaceCommentOnPostAction({ postId, previousCommentId: comment.commentId, commentId: id }),
		);
	} catch (e) {
		dispatch(createCommentErrorAction(comment.commentId));
		dispatch(addCommentToPostAction({ postId, commentId: comment.commentId, error: true }));
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

const syncRemoveCommentAction: ActionCreator<ISyncRemoveCommentAction> = (commentId: string) => ({
	type: ActionTypes.SYNC_REMOVE_COMMENT,
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
		dispatch(removeCommentFromPostAction({ postId, commentId }));
		dispatch(syncRemoveCommentAction(commentId));
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

const likeCommentAction: ActionCreator<ILikeCommentAction> = (input: ILikeCommentInput) => ({
	type: ActionTypes.LIKE_COMMENT,
	payload: input,
});

const likeCommentErrorAction: ActionCreator<ILikeCommentErrorAction> = (
	input: ILikeCommentInput,
) => ({
	type: ActionTypes.LIKE_COMMENT_ERROR,
	payload: input,
});

export const likeComment = (input: ILikeCommentInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(likeCommentAction(input));
		await context.dataApi.comments.likeComment(input);
	} catch (e) {
		dispatch(likeCommentErrorAction(input));
		await dispatch(
			setError({
				type: ActionTypes.LIKE_COMMENT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};

const unlikeCommentAction: ActionCreator<IUnlikeCommentAction> = (input: ILikeCommentInput) => ({
	type: ActionTypes.UNLIKE_COMMENT,
	payload: input,
});

const unlikeCommentErrorAction: ActionCreator<IUnlikeCommentErrorAction> = (
	input: ILikeCommentInput,
) => ({
	type: ActionTypes.UNLIKE_COMMENT_ERROR,
	payload: input,
});

export const unlikeComment = (input: ILikeCommentInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(unlikeCommentAction(input));
		await context.dataApi.comments.unlikeComment(input);
	} catch (e) {
		dispatch(unlikeCommentErrorAction(input));
		await dispatch(
			setError({
				type: ActionTypes.UNLIKE_COMMENT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};
