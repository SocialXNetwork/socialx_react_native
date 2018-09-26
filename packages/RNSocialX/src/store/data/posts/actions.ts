import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	ICreatePostAction,
	IDateArgument,
	ILikePostAction,
	IPostByPathAction,
	IPostData,
	IPostIdArgument,
	IPostLikesAction,
	IPostPathArgument,
	IPostPathsByUserAction,
	IPublicPostsByDateAction,
	IUsernameArgument,
} from './Types';

const postPathsByUserAction: ActionCreator<IPostPathsByUserAction> = (
	postPathsByUsernameInput: IUsernameArgument,
) => ({
	type: ActionTypes.POST_PATHS_BY_USER,
	payload: postPathsByUsernameInput,
});

export const postPathsByUser = (
	postPathsByUsernameInput: IUsernameArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(postPathsByUserAction(postPathsByUsernameInput));
	} catch (e) {
		/**/
	}
};

const postByPathAction: ActionCreator<IPostByPathAction> = (
	postPathArgument: IPostPathArgument,
) => ({
	type: ActionTypes.POST_BY_PATH,
	payload: postPathArgument,
});

export const postByPath = (
	postPathArgument: IPostPathArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(postByPathAction(postPathArgument));
	} catch (e) {
		/**/
	}
};

const publicPostsByDateAction: ActionCreator<IPublicPostsByDateAction> = (
	postByDateArgument: IDateArgument,
) => ({
	type: ActionTypes.PUBLIC_POSTS_BY_DATE,
	payload: postByDateArgument,
});

export const publicPostsByDate = (
	postByDateArgument: IDateArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(publicPostsByDateAction(postByDateArgument));
	} catch (e) {
		/**/
	}
};

const postLikesAction: ActionCreator<IPostLikesAction> = (
	postLikesArgument: IPostIdArgument,
) => ({
	type: ActionTypes.POST_LIKES,
	payload: postLikesArgument,
});

export const postLikes = (postLikesArgument: IPostIdArgument): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(postLikesAction(postLikesArgument));
	} catch (e) {
		/**/
	}
};

const createPostAction: ActionCreator<ICreatePostAction> = (
	createPostArgument: IPostData,
) => ({
	type: ActionTypes.CREATE_POST,
	payload: createPostArgument,
});

export const createPost = (createPostArgument: IPostData): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(createPostAction(createPostArgument));
	} catch (e) {
		/**/
	}
};

const likePostAction: ActionCreator<ILikePostAction> = (
	likePostArgument: IPostIdArgument,
) => ({
	type: ActionTypes.LIKE_POST,
	payload: likePostArgument,
});

export const likePost = (likePostArgument: IPostIdArgument): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(likePostAction(likePostArgument));
	} catch (e) {
		/**/
	}
};
