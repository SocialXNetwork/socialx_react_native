import {
	ICommentsReturnData,
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
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { getCurrentProfile, getProfilesByPosts } from '../profiles';
import {
	ActionTypes,
	ICommentIdInput,
	ICreateCommentAction,
	ICreateCommentInput,
	ICreatePostAction,
	IDateInput,
	IGetPostByIdAction,
	IGetPostByPathAction,
	IGetPostsByUsernameAction,
	IGetPublicPostsByDateAction,
	ILikeCommentAction,
	ILikePostAction,
	ILoadMorePostsAction,
	IPostIdInput,
	IPostPathInput,
	IRemoveCommentAction,
	IRemovePostAction,
	IResetPostsAction,
	ISyncGetPostByIdAction,
	ISyncGetPostByPathAction,
	ISyncGetPostsByUserAction,
	ISyncGetPublicPostsByDateAction,
	IUnlikeCommentAction,
	IUnlikePostAction,
	IUsernameInput,
} from './Types';

import moment from 'moment';
import { setGlobal } from '../../ui/globals';

const resetPostsAction: ActionCreator<IResetPostsAction> = () => ({
	type: ActionTypes.RESET_POSTS,
});

export const resetPostsAndRefetch = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	dispatch(resetPostsAction);
	dispatch(
		getPublicPostsByDate({
			date: new Date(Date.now()),
		}),
	);
};

const getPostsByUsernameAction: ActionCreator<IGetPostsByUsernameAction> = (
	getPostsByUsernameInput: IUsernameInput,
) => ({
	type: ActionTypes.GET_POSTS_BY_USER,
	payload: getPostsByUsernameInput,
});

const syncGetPostsByUsernameAction: ActionCreator<ISyncGetPostsByUserAction> = (
	posts: IPostArrayData,
) => ({
	type: ActionTypes.SYNC_GET_POSTS_BY_USER,
	payload: posts,
});

export const getPostsByUsername = (
	getPostsByUsernameInput: IUsernameInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(getPostsByUsernameAction(getPostsByUsernameInput));
		dispatch(
			beginActivity({
				type: ActionTypes.GET_POSTS_BY_USER,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const posts = await dataApi.posts.getPostsByUser(getPostsByUsernameInput);
		dispatch(syncGetPostsByUsernameAction(posts));
		dispatch(getProfilesByPosts(posts));
	} catch (e) {
		dispatch(
			setError({
				type: ActionTypes.GET_POSTS_BY_USER,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		dispatch(
			endActivity({
				uuid: activityId,
			}),
		);
	}
};

const getPostByIdAction: ActionCreator<IGetPostByIdAction> = (
	getPostByIdInput: IPostIdInput,
) => ({
	type: ActionTypes.GET_POST_BY_ID,
	payload: getPostByIdInput,
});

const syncGetPostByIdAction: ActionCreator<ISyncGetPostByIdAction> = (
	post: IPostReturnData,
) => ({
	type: ActionTypes.SYNC_GET_POST_BY_ID,
	payload: post,
});

export const getPostById = (getPostByIdInput: IPostIdInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	try {
		dispatch(getPostByIdAction(getPostByIdInput));
		dispatch(
			beginActivity({ type: ActionTypes.GET_POST_BY_ID, uuid: activityId }),
		);
		const { dataApi } = context;
		const post = await dataApi.posts.getPostById(getPostByIdInput);
		dispatch(syncGetPostByIdAction(post));
		dispatch(getProfilesByPosts([post]));
	} catch (e) {
		dispatch(
			setError({
				type: ActionTypes.SYNC_GET_POST_BY_ID,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
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
		dispatch(getProfilesByPosts([post]));
	} catch (e) {
		dispatch(
			setError({
				type: ActionTypes.GET_POST_BY_PATH,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const loadMorePostsAction: ActionCreator<ILoadMorePostsAction> = () => ({
	type: ActionTypes.LOAD_MORE_POSTS,
});

export const loadMorePosts = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();

	dispatch(loadMorePostsAction());
	dispatch(
		beginActivity({ uuid: activityId, type: ActionTypes.LOAD_MORE_POSTS }),
	);

	const { dataApi } = context;

	const storeState = getState();
	const storePosts = storeState.data.posts.posts;
	const latestPost = [...storePosts].sort(
		(x, t) => x.timestamp - t.timestamp,
	)[0];

	let lastPostDate = moment(
		latestPost.timestamp || new Date().getTime(),
	).toDate();

	let days: number = 1;

	let posts: IPostArrayData = [];

	try {
		while (posts.length <= 0 && days <= 30) {
			lastPostDate = moment(lastPostDate)
				.subtract(1, 'd')
				.toDate();
			posts = await dataApi.posts.getPublicPostsByDate({ date: lastPostDate });
			days = days + 1;
		}
		dispatch(getPublicPostsByDate({ date: lastPostDate }));
		dispatch(getProfilesByPosts(posts));

		dispatch(
			setGlobal({
				canLoadMorePosts: days < 30,
			}),
		);
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
		dispatch(getProfilesByPosts(posts));
	} catch (e) {
		dispatch(
			setError({
				type: ActionTypes.GET_PUBLIC_POSTS_BY_DATE,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
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
	const storeState = getState();
	const auth = storeState.app.auth.auth;
	if (auth && auth.alias) {
		const activityId = uuidv4();
		try {
			dispatch(createPostAction(createPostInput));
			dispatch(
				beginActivity({
					type: ActionTypes.CREATE_POST,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.posts.createPost(createPostInput);

			dispatch(getPostsByUsername({ username: auth.alias }));
		} catch (e) {
			dispatch(
				setError({
					type: ActionTypes.CREATE_POST,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			dispatch(endActivity({ uuid: activityId }));
		}
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
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.app.auth.auth;
	if (auth && auth.alias) {
		try {
			dispatch(likePostAction(likePostInput));
			dispatch(
				beginActivity({
					type: ActionTypes.LIKE_POST,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.posts.likePost(likePostInput);
			dispatch(getPostById(likePostInput));
			dispatch(getCurrentProfile());
		} catch (e) {
			dispatch(
				setError({
					type: ActionTypes.LIKE_POST,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			dispatch(endActivity({ uuid: activityId }));
		}
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
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.app.auth.auth;
	if (auth && auth.alias) {
		try {
			dispatch(removePostAction(removePostInput));
			dispatch(
				beginActivity({
					type: ActionTypes.REMOVE_POST,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.posts.removePost(removePostInput);

			dispatch(getPostsByUsername({ username: auth.alias }));
		} catch (e) {
			dispatch(
				setError({
					type: ActionTypes.REMOVE_POST,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			dispatch(endActivity({ uuid: activityId }));
		}
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
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.app.auth.auth;
	if (auth && auth.alias) {
		try {
			dispatch(unlikePostAction(unlikePostInput));
			dispatch(
				beginActivity({
					type: ActionTypes.UNLIKE_POST,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.posts.unlikePost(unlikePostInput);
			dispatch(getPostById(unlikePostInput));
		} catch (e) {
			dispatch(
				setError({
					type: ActionTypes.UNLIKE_POST,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			dispatch(endActivity({ uuid: activityId }));
		}
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
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.app.auth.auth;
	if (auth && auth.alias) {
		try {
			dispatch(createCommentAction(createCommentInput));
			dispatch(
				beginActivity({
					type: ActionTypes.CREATE_COMMENT,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.comments.createComment(createCommentInput);
			dispatch(getPostById({ postId: createCommentInput.postId }));
		} catch (e) {
			dispatch(
				setError({
					type: ActionTypes.CREATE_COMMENT,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			dispatch(endActivity({ uuid: activityId }));
		}
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
	const { commentId } = likeCommentInput;

	const storeState = getState();
	const parentPost = storeState.data.posts.posts.find(
		(post) =>
			post.comments.find((comment) => comment.commentId === commentId)
				? true
				: false,
	);
	const auth = storeState.app.auth.auth;
	if (auth && auth.alias) {
		const activityId = uuidv4();
		try {
			dispatch(likeCommentAction(likeCommentInput));
			dispatch(
				beginActivity({
					type: ActionTypes.LIKE_COMMENT,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.comments.likeComment(likeCommentInput);
			dispatch(getPostById({ postId: parentPost ? parentPost.postId : '' }));
		} catch (e) {
			dispatch(
				setError({
					type: ActionTypes.LIKE_COMMENT,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			dispatch(endActivity({ uuid: activityId }));
		}
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
	const { commentId } = removeCommentInput;

	const storeState = getState();
	const parentPost = [...storeState.data.posts.posts].find(
		(post) =>
			post.comments.find((comment) => comment.commentId === commentId)
				? true
				: false,
	);
	const auth = storeState.app.auth.auth;
	if (auth && auth.alias) {
		const activityId = uuidv4();
		try {
			dispatch(removeCommentAction(removeCommentInput));
			dispatch(
				beginActivity({
					type: ActionTypes.REMOVE_COMMENT,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.comments.removeComment(removeCommentInput);
			dispatch(getPostById({ postId: parentPost ? parentPost.postId : '' }));
		} catch (e) {
			dispatch(
				setError({
					type: ActionTypes.REMOVE_COMMENT,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			dispatch(endActivity({ uuid: activityId }));
		}
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
	const { commentId } = unlikeCommentInput;

	const storeState = getState();
	const parentPost = [...storeState.data.posts.posts].find(
		(post) =>
			post.comments.find((comment) => comment.commentId === commentId)
				? true
				: false,
	);
	const auth = storeState.app.auth.auth;
	if (auth && auth.alias) {
		const activityId = uuidv4();
		try {
			dispatch(unlikeCommentAction(unlikeCommentInput));
			dispatch(
				beginActivity({
					type: ActionTypes.UNLIKE_COMMENT,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.comments.unlikeComment(unlikeCommentInput);
			dispatch(getPostById({ postId: parentPost ? parentPost.postId : '' }));
		} catch (e) {
			dispatch(
				setError({
					type: ActionTypes.UNLIKE_COMMENT,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			dispatch(endActivity({ uuid: activityId }));
		}
	}
};
