import { IRemoveCommentInput, IUnlikeCommentInput } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	ICommentIdArgument,
	ICreateCommentAction,
	ICreateCommentInput,
	IGetCommentLikesAction,
	IGetPostCommentsAction,
	ILikeCommentAction,
	IPostIdArgument,
	IRemoveCommentAction,
	IUnlikeCommentAction,
} from './Types';

// todo: add the new api actions here
// removeComment
// unlikeComment

const getPostCommentsAction: ActionCreator<IGetPostCommentsAction> = (
	getPostCommentsArguments: IPostIdArgument,
) => ({
	type: ActionTypes.GET_POST_COMMENTS,
	payload: getPostCommentsArguments,
});

export const getPostComments = (
	getPostCommentsArguments: IPostIdArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getPostCommentsAction(getPostCommentsArguments));
	} catch (e) {
		/**/
	}
};

const getCommentLikesAction: ActionCreator<IGetCommentLikesAction> = (
	commentLikesArgument: ICommentIdArgument,
) => ({
	type: ActionTypes.GET_COMMENT_LIKES,
	payload: commentLikesArgument,
});

export const getCommentLikes = (
	getCommentLikesArgument: ICommentIdArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getCommentLikesAction(getCommentLikesArgument));
	} catch (e) {
		/**/
	}
};

const createCommentAction: ActionCreator<ICreateCommentAction> = (
	createCommentArgument: ICreateCommentInput,
) => ({
	type: ActionTypes.CREATE_COMMENT,
	payload: createCommentArgument,
});

export const createComment = (
	createCommentArgument: ICreateCommentInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(createCommentAction(createCommentArgument));
	} catch (e) {
		/**/
	}
};

const likeCommentAction: ActionCreator<ILikeCommentAction> = (
	likeCommentArgument: ICommentIdArgument,
) => ({
	type: ActionTypes.LIKE_COMMENT,
	payload: likeCommentArgument,
});

export const likeComment = (
	likeCommentArgument: ICommentIdArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(likeCommentAction(likeCommentArgument));
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
