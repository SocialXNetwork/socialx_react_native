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
