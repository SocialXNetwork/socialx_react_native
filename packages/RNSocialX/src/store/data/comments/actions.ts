import { IRemoveCommentInput, IUnlikeCommentInput } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	ICommentIdInput,
	ICommentsApiData,
	ICreateCommentAction,
	ICreateCommentInput,
	ILikeCommentAction,
	IPostIdInput,
	IRemoveCommentAction,
	IUnlikeCommentAction,
} from './Types';

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
		const { dataApi } = context;
		await dataApi.comments.createComment(createCommentInput);
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
		const { dataApi } = context;
		await dataApi.comments.likeComment(likeCommentInput);
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
		const { dataApi } = context;
		await dataApi.comments.removeComment(removeCommentInput);
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
		const { dataApi } = context;
		await dataApi.comments.unlikeComment(unlikeCommentInput);
		dispatch(unlikeCommentAction(unlikeCommentInput));
	} catch (e) {
		/**/
	}
};
