import {
	ICreatePostInput,
	IRemovePostInput,
	IUnlikePostInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	ICreatePostAction,
	IDateInput,
	IGetPostByPathAction,
	IGetPostPathsByUserAction,
	IGetPublicPostsByDateAction,
	ILikePostAction,
	IPostIdInput,
	IPostPathInput,
	IRemovePostAction,
	IUnlikePostAction,
	IUsernameInput,
} from './Types';

const getPostPathsByUsernameAction: ActionCreator<IGetPostPathsByUserAction> = (
	getPostPathsByUsernameInput: IUsernameInput,
) => ({
	type: ActionTypes.GET_POST_PATHS_BY_USER,
	payload: getPostPathsByUsernameInput,
});

export const getPostPathsByUsername = (
	getPostPathsByUsernameInput: IUsernameInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getPostPathsByUsernameAction(getPostPathsByUsernameInput));
	} catch (e) {
		/**/
	}
};

const getPostByPathAction: ActionCreator<IGetPostByPathAction> = (
	getPostPathInput: IPostPathInput,
) => ({
	type: ActionTypes.GET_POST_BY_PATH,
	payload: getPostPathInput,
});

export const getPostByPath = (
	getPostPathInput: IPostPathInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getPostByPathAction(getPostPathInput));
	} catch (e) {
		/**/
	}
};

const getPublicPostsByDateAction: ActionCreator<IGetPublicPostsByDateAction> = (
	getPostByDateInput: IDateInput,
) => ({
	type: ActionTypes.GET_PUBLIC_POSTS_BY_DATE,
	payload: getPostByDateInput,
});

export const getPublicPostsByDate = (
	getPostByDateInput: IDateInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getPublicPostsByDateAction(getPostByDateInput));
	} catch (e) {
		/**/
	}
};

const createPostAction: ActionCreator<ICreatePostAction> = (
	createPostInput: ICreatePostInput,
) => ({
	type: ActionTypes.CREATE_POST,
	payload: createPostInput,
});

export const createPost = (createPostInput: ICreatePostInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(createPostAction(createPostInput));
	} catch (e) {
		/**/
	}
};

const likePostAction: ActionCreator<ILikePostAction> = (
	likePostInput: IPostIdInput,
) => ({
	type: ActionTypes.LIKE_POST,
	payload: likePostInput,
});

export const likePost = (likePostInput: IPostIdInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(likePostAction(likePostInput));
	} catch (e) {
		/**/
	}
};

const removePostAction: ActionCreator<IRemovePostAction> = (
	removePostInput: IRemovePostInput,
) => ({
	type: ActionTypes.REMOVE_POST,
	payload: removePostInput,
});

export const removePost = (removePostInput: IRemovePostInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(removePostAction(removePostInput));
	} catch (e) {
		/**/
	}
};

const unlikePostAction: ActionCreator<IUnlikePostAction> = (
	unlikePostInput: IUnlikePostInput,
) => ({
	type: ActionTypes.UNLIKE_POST,
	payload: unlikePostInput,
});

export const unlikePost = (unlikePostInput: IUnlikePostInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(unlikePostAction(unlikePostInput));
	} catch (e) {
		/**/
	}
};
