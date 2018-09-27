import { ICreatePostInput } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	ICreatePostAction,
	IDateInput,
	IGetPostByPathAction,
	IGetPostLikesAction,
	IGetPostPathsByUserAction,
	IGetPublicPostsByDateAction,
	ILikePostAction,
	IPostIdInput,
	IPostPathInput,
	IUsernameInput,
} from './Types';

// todo: @jake add the new api actions here
// removePost
// unlikePost

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

const getPostLikesAction: ActionCreator<IGetPostLikesAction> = (
	getPostLikesInput: IPostIdInput,
) => ({
	type: ActionTypes.GET_POST_LIKES,
	payload: getPostLikesInput,
});

export const getPostLikes = (getPostLikesInput: IPostIdInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(getPostLikesAction(getPostLikesInput));
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
