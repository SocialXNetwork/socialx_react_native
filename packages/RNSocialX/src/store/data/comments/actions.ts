import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	ICommentIdArgument,
	ICommentLikesAction,
	ICreateCommentAction,
	ICreateCommentInput,
	ILikeCommentAction,
	IPostCommentsAction,
	IPostIdArgument,
} from './Types';

const getPostCommentsAction: ActionCreator<IPostCommentsAction> = (
	getPostCommentsArguments: IPostIdArgument,
) => ({
	type: ActionTypes.POST_COMMENTS,
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

const getCommentLikesAction: ActionCreator<ICommentLikesAction> = (
	commentLikesArgument: ICommentIdArgument,
) => ({
	type: ActionTypes.COMMENT_LIKES,
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
