import {
	ILikeData,
	IRemoveCommentInput,
	IUnlikeCommentInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	ICommentIdInput,
	ICommentsApiData,
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
	postComments: IPostIdInput & { comments: ICommentsApiData[] },
) => ({
	type: ActionTypes.GET_POST_COMMENTS,
	payload: postComments,
});

export const getPostComments = (
	getPostCommentsInput: IPostIdInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		const { dataApi } = context;
		const comments = await dataApi.comments.getPostComments(
			getPostCommentsInput,
		);
		dispatch(getPostCommentsAction({ ...getPostCommentsInput, comments }));
	} catch (e) {
		/**/
	}
};

const getCommentLikesAction: ActionCreator<IGetCommentLikesAction> = (
	commentLikesData: ICommentIdInput & { likes: ILikeData[] },
) => ({
	type: ActionTypes.GET_COMMENT_LIKES,
	payload: commentLikesData,
});

export const getCommentLikes = (
	getCommentLikesInput: ICommentIdInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		const { dataApi } = context;
		const likes = await dataApi.comments.getCommentLikes(getCommentLikesInput);

		dispatch(
			getCommentLikesAction({
				...getCommentLikesInput,
				likes,
			}),
		);
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
