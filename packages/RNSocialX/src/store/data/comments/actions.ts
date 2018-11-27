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
	IRemoveCommentErrorAction,
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
		dispatch(syncAddCommentAction({ postId, comment, error: false }));
		await context.dataApi.comments.createComment({ text, postId });
	} catch (e) {
		dispatch(createCommentErrorAction(comment.commentId));
		dispatch(syncAddCommentAction({ postId, comment, error: true }));
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

const removeCommentErrorAction: ActionCreator<IRemoveCommentErrorAction> = (
	comment: ICommentsReturnData,
) => ({
	type: ActionTypes.REMOVE_COMMENT_ERROR,
	payload: comment,
});

export const removeComment = (removeCommentInput: IRemoveCommentInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();

	const { text, alias, pub, commentId, postId } = removeCommentInput;
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
		dispatch(removeCommentAction(commentId));
		await dispatch(
			beginActivity({
				type: ActionTypes.REMOVE_COMMENT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		dispatch(syncRemoveCommentAction({ postId, comment, commentId, error: false }));
		await dataApi.comments.removeComment({ commentId });
	} catch (e) {
		dispatch(removeCommentErrorAction(comment));
		dispatch(syncRemoveCommentAction({ postId, comment, commentId, error: true }));
		await dispatch(
			setError({
				type: ActionTypes.REMOVE_COMMENT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
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
	const activityId = uuid();

	try {
		dispatch(likeCommentAction(likeCommentInput));
		await dispatch(
			beginActivity({
				type: ActionTypes.LIKE_COMMENT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.comments.likeComment(likeCommentInput);
	} catch (e) {
		dispatch(likeCommentErrorAction(likeCommentInput));
		await dispatch(
			setError({
				type: ActionTypes.LIKE_COMMENT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
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
	const activityId = uuid();
	try {
		dispatch(unlikeCommentAction(unlikeCommentInput));
		await dispatch(
			beginActivity({
				type: ActionTypes.UNLIKE_COMMENT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.comments.unlikeComment(unlikeCommentInput);
	} catch (e) {
		dispatch(unlikeCommentErrorAction(unlikeCommentInput));
		await dispatch(
			setError({
				type: ActionTypes.UNLIKE_COMMENT,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};
