import {ActionCreator} from 'redux';
import {IThunk} from '../../types';
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

const postCommentsAction: ActionCreator<IPostCommentsAction> = (postCommentsArguments: IPostIdArgument) => ({
	type: ActionTypes.POST_COMMENTS,
	payload: postCommentsArguments,
});

export const postComments = (postCommentsArguments: IPostIdArgument): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(postCommentsAction(postCommentsArguments));
	} catch (e) {
		// dispatch(setGlobalLoadingIndicator(false);
		// dispatch(addNotificationtoQueue('there was an error');
	}
};

const commentLikesAction: ActionCreator<ICommentLikesAction> = (commentLikesArgument: ICommentIdArgument) => ({
	type: ActionTypes.COMMENT_LIKES,
	payload: commentLikesArgument,
});

export const commentLikes = (commentLikesArgument: ICommentIdArgument): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(commentLikesAction(commentLikesArgument));
	} catch (e) {
		/**/
	}
};

const createCommentAction: ActionCreator<ICreateCommentAction> = (createCommentArgument: ICreateCommentInput) => ({
	type: ActionTypes.CREATE_COMMENT,
	payload: createCommentArgument,
});

export const createComment = (createCommentArgument: ICreateCommentInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(createCommentAction(createCommentArgument));
	} catch (e) {
		/**/
	}
};

const likeCommentAction: ActionCreator<ILikeCommentAction> = (likeCommentArgument: ICommentIdArgument) => ({
	type: ActionTypes.LIKE_COMMENT,
	payload: likeCommentArgument,
});

export const likeComment = (likeCommentArgument: ICommentIdArgument): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(likeCommentAction(likeCommentArgument));
	} catch (e) {
		/**/
	}
};
