import { IRemoveCommentInput, IUnlikeCommentInput } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	ICommentIdInput,
	ICreateCommentAction,
	ICreateCommentInput,
	IGetCommentLikesAction,
	IGetPostCommentsAction,
	ILikeCommentAction,
	IPostIdInput,
	IRemoveCommentAction,
	IUnlikeCommentAction,
} from './Types';

const getPostCommentsAction: ActionCreator<IGetPostCommentsAction> = (
	getPostCommentsInput: IPostIdInput,
) => ({
	type: ActionTypes.GET_POST_COMMENTS,
	payload: getPostCommentsInput,
});

export const getPostComments = (
	getPostCommentsInput: IPostIdInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getPostCommentsAction(getPostCommentsInput));
	} catch (e) {
		/**/
	}
};

const getCommentLikesAction: ActionCreator<IGetCommentLikesAction> = (
	commentLikesInput: ICommentIdInput,
) => ({
	type: ActionTypes.GET_COMMENT_LIKES,
	payload: commentLikesInput,
});

export const getCommentLikes = (
	getCommentLikesInput: ICommentIdInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getCommentLikesAction(getCommentLikesInput));
	} catch (e) {
		/**/
	}
};

const createCommentAction: ActionCreator<ICreateCommentAction> = (
	createCommentInput: ICreateCommentInput,
) => ({
	type: ActionTypes.CREATE_COMMENT,
	payload: createCommentInput,
});

export const createComment = (
	createCommentInput: ICreateCommentInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(createCommentAction(createCommentInput));
	} catch (e) {
		/**/
	}
};

const likeCommentAction: ActionCreator<ILikeCommentAction> = (
	likeCommentInput: ICommentIdInput,
) => ({
	type: ActionTypes.LIKE_COMMENT,
	payload: likeCommentInput,
});

export const likeComment = (
	likeCommentInput: ICommentIdInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(likeCommentAction(likeCommentInput));
	} catch (e) {
		/**/
	}
};

const removeCommentAction: ActionCreator<IRemoveCommentAction> = (
	removeCommentInput: IRemoveCommentInput,
) => ({
	type: ActionTypes.REMOVE_COMMENT,
	payload: removeCommentInput,
});

export const removeComment = (
	removeCommentInput: IRemoveCommentInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(removeCommentAction(removeCommentInput));
	} catch (e) {
		/**/
	}
};

const unlikeCommentAction: ActionCreator<IUnlikeCommentAction> = (
	unlikeCommentInput: IUnlikeCommentInput,
) => ({
	type: ActionTypes.UNLIKE_COMMENT,
	payload: unlikeCommentInput,
});

export const unlikeComment = (
	unlikeCommentInput: IUnlikeCommentInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(unlikeCommentAction(unlikeCommentInput));
	} catch (e) {
		/**/
	}
};
