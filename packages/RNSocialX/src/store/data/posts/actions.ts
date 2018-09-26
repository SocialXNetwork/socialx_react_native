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

const getPostPathsByUsernameAction: ActionCreator<IPostPathsByUserAction> = (
	getPostPathsByUsernameInput: IUsernameArgument,
) => ({
	type: ActionTypes.POST_PATHS_BY_USER,
	payload: getPostPathsByUsernameInput,
});

export const getPostPathsByUsername = (
	getPostPathsByUsernameInput: IUsernameArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getPostPathsByUsernameAction(getPostPathsByUsernameInput));
	} catch (e) {
		/**/
	}
};

const getPostByPathAction: ActionCreator<IPostByPathAction> = (
	getPostPathArgument: IPostPathArgument,
) => ({
	type: ActionTypes.POST_BY_PATH,
	payload: getPostPathArgument,
});

export const getPostByPath = (
	getPostPathArgument: IPostPathArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getPostByPathAction(getPostPathArgument));
	} catch (e) {
		/**/
	}
};

const getPublicPostsByDateAction: ActionCreator<IPublicPostsByDateAction> = (
	getPostByDateArgument: IDateArgument,
) => ({
	type: ActionTypes.PUBLIC_POSTS_BY_DATE,
	payload: getPostByDateArgument,
});

export const getPublicPostsByDate = (
	getPostByDateArgument: IDateArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getPublicPostsByDateAction(getPostByDateArgument));
	} catch (e) {
		/**/
	}
};

const getPostLikesAction: ActionCreator<IPostLikesAction> = (
	getPostLikesArgument: IPostIdArgument,
) => ({
	type: ActionTypes.POST_LIKES,
	payload: getPostLikesArgument,
});

export const getPostLikes = (
	getPostLikesArgument: IPostIdArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getPostLikesAction(getPostLikesArgument));
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
