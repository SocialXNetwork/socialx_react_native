import {
	ICreatePostInput,
	IPostArrayData,
	IPostReturnData,
	IRemoveCommentInput,
	IRemovePostInput,
	IUnlikeCommentInput,
	IUnlikePostInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { beginActivity, endActivity } from '../../ui/activities';
import {
	ActionTypes,
	ICommentIdInput,
	ICreateCommentAction,
	ICreateCommentInput,
	ICreatePostAction,
	IDateInput,
	IGetPostByPathAction,
	IGetPostPathsByUserAction,
	IGetPublicPostsByDateAction,
	ILikeCommentAction,
	ILikePostAction,
	IPostIdInput,
	IPostPathInput,
	IRemoveCommentAction,
	IRemovePostAction,
	ISyncGetPostByPathAction,
	ISyncGetPostPathsByUserAction,
	ISyncGetPublicPostsByDateAction,
	IUnlikeCommentAction,
	IUnlikePostAction,
	IUsernameInput,
} from './Types';

// TODO: @jake check with serkan
const getPostPathsByUsernameAction: ActionCreator<IGetPostPathsByUserAction> = (
	getPostPathsByUsernameInput: IUsernameInput,
) => ({
	type: ActionTypes.GET_POST_PATHS_BY_USER,
	payload: getPostPathsByUsernameInput,
});

const syncGetPostPathsByUsernameAction: ActionCreator<
	ISyncGetPostPathsByUserAction
> = (postPaths: string[]) => ({
	type: ActionTypes.SYNC_GET_POST_PATHS_BY_USER,
	payload: postPaths,
});

export const getPostPathsByUsername = (
	getPostPathsByUsernameInput: IUsernameInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(getPostPathsByUsernameAction(getPostPathsByUsernameInput));
		dispatch(
			beginActivity({
				type: ActionTypes.GET_POST_PATHS_BY_USER,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const postPaths = await dataApi.posts.getPostPathsByUser(
			getPostPathsByUsernameInput,
		);
		dispatch(syncGetPostPathsByUsernameAction(postPaths));
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const getPostByPathAction: ActionCreator<IGetPostByPathAction> = (
	getPostPathInput: IPostPathInput,
) => ({
	type: ActionTypes.GET_POST_BY_PATH,
	payload: getPostPathInput,
});

const syncGetPostByPathAction: ActionCreator<ISyncGetPostByPathAction> = (
	post: IPostReturnData,
) => ({
	type: ActionTypes.SYNC_GET_POST_BY_PATH,
	payload: post,
});

export const getPostByPath = (
	getPostPathInput: IPostPathInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(getPostByPathAction(getPostPathInput));
		dispatch(
			beginActivity({
				type: ActionTypes.GET_POST_BY_PATH,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const post = await dataApi.posts.getPostByPath(getPostPathInput);
		dispatch(syncGetPostByPathAction(post));
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const getPublicPostsByDateAction: ActionCreator<IGetPublicPostsByDateAction> = (
	getPostByDateInput: IDateInput,
) => ({
	type: ActionTypes.GET_PUBLIC_POSTS_BY_DATE,
	payload: getPostByDateInput,
});

const syncGetPublicPostsByDateAction: ActionCreator<
	ISyncGetPublicPostsByDateAction
> = (posts: IPostArrayData) => ({
	type: ActionTypes.SYNC_GET_PUBLIC_POSTS_BY_DATE,
	payload: posts,
});

export const getPublicPostsByDate = (
	getPostByDateInput: IDateInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(getPublicPostsByDateAction(getPostByDateInput));
		dispatch(
			beginActivity({
				type: ActionTypes.GET_PUBLIC_POSTS_BY_DATE,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const posts = await dataApi.posts.getPublicPostsByDate(getPostByDateInput);
		dispatch(syncGetPublicPostsByDateAction(posts));
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
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
		const { dataApi } = context;
		await dataApi.posts.createPost(createPostInput);
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
		const { dataApi } = context;
		await dataApi.posts.likePost(likePostInput);
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
		const { dataApi } = context;
		await dataApi.posts.removePost(removePostInput);
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
		const { dataApi } = context;
		await dataApi.posts.unlikePost(unlikePostInput);
	} catch (e) {
		/**/
	}
};

// <================= comments =================>
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
		dispatch(createCommentAction(createCommentInput));
		const { dataApi } = context;
		await dataApi.comments.createComment(createCommentInput);
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
		dispatch(likeCommentAction(likeCommentInput));
		const { dataApi } = context;
		await dataApi.comments.likeComment(likeCommentInput);
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
		const { dataApi } = context;
		await dataApi.comments.removeComment(removeCommentInput);
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
		const { dataApi } = context;
		await dataApi.comments.unlikeComment(unlikeCommentInput);
	} catch (e) {
		/**/
	}
};
