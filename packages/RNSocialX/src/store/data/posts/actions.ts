import { ICreatePostInput, IPostReturnData } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { IOptimizedMedia } from '../../../types';
import { setUploadStatus } from '../../storage/files';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { setGlobal } from '../../ui/globals';
import { loadCommentsAction } from '../comments';
import { addPostsToProfile, getProfilesByPosts, removePostFromProfile } from '../profiles';
import {
	ActionTypes,
	IAddCommentAction,
	ICommentToPostInput,
	ICreatePostAction,
	IGetPostByIdAction,
	IGetPostByPathAction,
	IGetUserPostsAction,
	ILikePostAction,
	ILikePostErrorAction,
	ILoadMoreFriendsPostsAction,
	ILoadMorePostsAction,
	IPostIdInput,
	IPostLikeInput,
	IPostPathInput,
	IRefreshFriendsPostsAction,
	IRefreshGlobalPostsAction,
	IRemoveCommentAction,
	IRemovePostAction,
	IReplaceCommentAction,
	IReplaceCommentInput,
	ISyncGetPostByIdAction,
	ISyncGetPostByPathAction,
	ISyncGetUserPostsAction,
	ISyncLoadMoreFriendsPostsAction,
	ISyncLoadMoreInput,
	ISyncLoadMorePostsAction,
	ISyncRefreshFriendsPostsAction,
	ISyncRefreshGlobalPostsAction,
	ISyncRemovePostAction,
	IUnlikePostAction,
	IUnlikePostErrorAction,
} from './Types';

import { sleep } from '../../../utilities';

/**
 * 	Retrieves a post, given the id
 */

const getPostByIdAction: ActionCreator<IGetPostByIdAction> = (getPostByIdInput: IPostIdInput) => ({
	type: ActionTypes.GET_POST_BY_ID,
	payload: getPostByIdInput,
});

const syncGetPostByIdAction: ActionCreator<ISyncGetPostByIdAction> = (post: IPostReturnData) => ({
	type: ActionTypes.SYNC_GET_POST_BY_ID,
	payload: post,
});

export const getPostById = (input: IPostIdInput): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		dispatch(getPostByIdAction(input));
		await dispatch(beginActivity({ type: ActionTypes.GET_POST_BY_ID, uuid: activityId }));

		const post = await context.dataApi.posts.getPostById(input);
		dispatch(syncGetPostByIdAction(post));
		dispatch(addPostsToProfile({ alias: post.owner.alias, postIds: [post.postId] }));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SYNC_GET_POST_BY_ID,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
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

export const getPostByPath = (getPostPathInput: IPostPathInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();
	try {
		dispatch(getPostByPathAction(getPostPathInput));
		await dispatch(
			beginActivity({
				type: ActionTypes.GET_POST_BY_PATH,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const post = await dataApi.posts.getPostByPath(getPostPathInput);
		dispatch(syncGetPostByPathAction(post));
		await dispatch(getProfilesByPosts([post]));
	} catch (e) {
		dispatch(
			setError({
				type: ActionTypes.GET_POST_BY_PATH,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

/**
 * 	Retrieves a number of posts for the global feed
 */

const loadMorePostsAction: ActionCreator<ILoadMorePostsAction> = () => ({
	type: ActionTypes.LOAD_MORE_POSTS,
});

const syncLoadMorePostsAction: ActionCreator<ISyncLoadMorePostsAction> = (
	input: ISyncLoadMoreInput,
) => ({
	type: ActionTypes.SYNC_LOAD_MORE_POSTS,
	payload: input,
});

export const loadMorePosts = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		const {
			global: { nextToken },
		} = getState().data.posts;
		await dispatch(
			beginActivity({
				type: ActionTypes.LOAD_MORE_POSTS,
				uuid: activityId,
			}),
		);
		dispatch(loadMorePostsAction());

		const data = await context.dataApi.posts.loadMorePosts({ nextToken, limit: 5 });
		await dispatch(getProfilesByPosts(data.posts));

		dispatch(loadCommentsAction(data.posts));
		dispatch(syncLoadMorePostsAction(data));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.LOAD_MORE_POSTS,
				error: e.message,
				uuid: activityId,
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

/**
 * 	Retrieves a number of posts for the friends feed
 */

const loadMoreFriendsPostsAction: ActionCreator<ILoadMoreFriendsPostsAction> = () => ({
	type: ActionTypes.LOAD_MORE_FRIENDS_POSTS,
});

const syncLoadMoreFriendsPostsAction: ActionCreator<ISyncLoadMoreFriendsPostsAction> = (
	input: ISyncLoadMoreInput,
) => ({
	type: ActionTypes.SYNC_LOAD_MORE_FRIENDS_POSTS,
	payload: input,
});

export const loadMoreFriendsPosts = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		const {
			friends: { nextToken },
		} = getState().data.posts;
		await dispatch(
			beginActivity({
				type: ActionTypes.LOAD_MORE_FRIENDS_POSTS,
				uuid: activityId,
			}),
		);
		dispatch(loadMoreFriendsPostsAction());

		const data = await context.dataApi.posts.loadMoreFriendsPosts({ nextToken, limit: 5 });
		await dispatch(getProfilesByPosts(data.posts));

		dispatch(loadCommentsAction(data.posts));
		dispatch(syncLoadMoreFriendsPostsAction(data));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.LOAD_MORE_FRIENDS_POSTS,
				error: e.message,
				uuid: activityId,
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

/**
 * 	Retrieves all the posts of a user, given his alias, adds
 * 	them to the store and dispatches an action to update
 * 	the profile with an array of post ids
 */

export const getUserPostsAction: ActionCreator<IGetUserPostsAction> = (alias: string) => ({
	type: ActionTypes.GET_USER_POSTS,
	payload: alias,
});

export const syncGetUserPostsAction: ActionCreator<ISyncGetUserPostsAction> = (
	posts: IPostReturnData[],
) => ({
	type: ActionTypes.SYNC_GET_USER_POSTS,
	payload: posts,
});

export const getUserPosts = (alias: string): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		dispatch(getUserPostsAction(alias));
		await dispatch(
			beginActivity({
				type: ActionTypes.GET_USER_POSTS,
				uuid: activityId,
			}),
		);
		const posts = await context.dataApi.posts.getPostsByUser({ username: alias });
		const postIds = posts.sort((x, y) => y.timestamp - x.timestamp).map((post) => post.postId);

		await dispatch(getProfilesByPosts(posts));
		dispatch(syncGetUserPostsAction(posts));
		dispatch(addPostsToProfile({ alias, postIds }));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SYNC_GET_USER_POSTS,
				error: e.message,
				uuid: activityId,
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

/**
 * 	Uploads the media to the IPFS, creates the post
 * 	and fetches it based on the id
 */

const createPostAction: ActionCreator<ICreatePostAction> = (input: ICreatePostInput) => ({
	type: ActionTypes.CREATE_POST,
	payload: input,
});

export const createPost = (
	input: ICreatePostInput & { media: IOptimizedMedia[] },
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		dispatch(createPostAction(input));
		await dispatch(
			beginActivity({
				type: ActionTypes.CREATE_POST,
				uuid: activityId,
			}),
		);
		const { dataApi, storageApi } = context;

		let postId;
		if (input.media && input.media.length > 0) {
			const { media, ...postRest } = input;
			console.log('media', input.media);

			const bootstrapStatus = async (uploadIdStarted: string) => {
				await dispatch(
					setUploadStatus({
						path: '',
						uploadId: uploadIdStarted,
						progress: 0,
						aborting: false,
						done: false,
						hash: '',
					}),
				);
			};

			const updateStatus = async ({
				uploadId: uploadIdUpdated,
				progress,
			}: any & { uploadId: string }) => {
				await dispatch(
					setUploadStatus({
						uploadId: uploadIdUpdated,
						progress,
						path: '',
						aborting: false,
						done: false,
						hash: '',
					}),
				);
			};

			const uploadedFiles = await Promise.all(
				// TODO: fix the media type
				media.map((obj: IOptimizedMedia | any) => {
					const path = () => {
						if (obj.type.includes('image') && obj.contentOptimizedPath) {
							return obj.contentOptimizedPath;
						} else if ((obj.type.includes('gif') || obj.type.includes('video')) && obj.sourceURL) {
							return obj.sourceURL;
						} else {
							return obj.path;
						}
					};
					return storageApi.uploadFile(path(), obj.type, bootstrapStatus, updateStatus);
				}),
			);

			uploadedFiles.forEach(async (resp) => {
				await dispatch(
					setUploadStatus({
						uploadId: '',
						progress: 100,
						path: '',
						aborting: false,
						done: true,
						hash: resp.Hash,
					}),
				);
			});

			const finalMedia = uploadedFiles.map((resp, index) => ({
				hash: resp.Hash,
				extension: media[index].type,
				size: media[index].size,
				type: {
					key: media[index].type,
					name: media[index].type.indexOf('image') < 0 ? 'Video' : 'Photo',
					category: media[index].type.indexOf('image') < 0 ? 'Videos' : 'Photography',
				},
			}));

			const finalInput = { ...postRest, media: finalMedia };
			postId = await dataApi.posts.createPost(finalInput as any);
		} else {
			postId = await dataApi.posts.createPost(input);
		}
		await dispatch(getPostById({ postId }));
		await dispatch(setGlobal({ placeholderPost: null }));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.CREATE_POST,
				error: e.message,
				uuid: uuid(),
			}),
		);
		await dispatch(setGlobal({ placeholderPost: null }));
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

/**
 * 	Deletes a post, given the id
 */

const removePostAction: ActionCreator<IRemovePostAction> = (postId: string) => ({
	type: ActionTypes.REMOVE_POST,
	payload: postId,
});

const syncRemovePostAction: ActionCreator<ISyncRemovePostAction> = (postId: string) => ({
	type: ActionTypes.SYNC_REMOVE_POST,
	payload: postId,
});

export const removePost = (postId: string): IThunk => async (dispatch, getState, context) => {
	const store = getState();
	const auth = store.auth.database.gun;
	const activityId = uuid();

	if (auth) {
		try {
			dispatch(removePostAction(postId));
			await dispatch(
				beginActivity({
					type: ActionTypes.REMOVE_POST,
					uuid: activityId,
				}),
			);

			await context.dataApi.posts.removePost({ postId });
			dispatch(removePostFromProfile({ postId, alias: auth.alias }));
			dispatch(syncRemovePostAction(postId));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.REMOVE_POST,
					error: e.message,
					uuid: uuid(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

/**
 * 	Optimistically creates a like, given the id of the post
 * 	and the alias of the user, reverting the action if gun
 * 	throws an error
 */

const likePostAction: ActionCreator<ILikePostAction> = (input: IPostLikeInput) => ({
	type: ActionTypes.LIKE_POST,
	payload: input,
});

const likePostErrorAction: ActionCreator<ILikePostErrorAction> = (input: IPostLikeInput) => ({
	type: ActionTypes.LIKE_POST_ERROR,
	payload: input,
});

export const likePost = (input: IPostLikeInput): IThunk => async (dispatch, getState, context) => {
	const { postId } = input;

	try {
		dispatch(likePostAction(input));
		await context.dataApi.posts.likePost({ postId });
	} catch (e) {
		dispatch(likePostErrorAction(input));
		await dispatch(
			setError({
				type: ActionTypes.LIKE_POST,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};

/**
 * 	Optimistically removes a like, given the id of the post
 * 	and the alias of the user, reverting the action if gun
 * 	throws an error
 */

const unlikePostAction: ActionCreator<IUnlikePostAction> = (input: IPostLikeInput) => ({
	type: ActionTypes.UNLIKE_POST,
	payload: input,
});

const unlikePostErrorAction: ActionCreator<IUnlikePostErrorAction> = (input: IPostLikeInput) => ({
	type: ActionTypes.UNLIKE_POST_ERROR,
	payload: input,
});

export const unlikePost = (input: IPostLikeInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const { postId } = input;

	try {
		dispatch(unlikePostAction(input));
		await context.dataApi.posts.unlikePost({ postId });
	} catch (e) {
		dispatch(unlikePostErrorAction(input));
		await dispatch(
			setError({
				type: ActionTypes.UNLIKE_POST,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};

/**
 * 	Called when pulling the global feed to refresh,
 *  gets a new batch of posts and updates the store
 */

const refreshGlobalPostsAction: ActionCreator<IRefreshGlobalPostsAction> = () => ({
	type: ActionTypes.REFRESH_GLOBAL_POSTS,
});

const syncRefreshGlobalPostsAction: ActionCreator<ISyncRefreshGlobalPostsAction> = (
	input: ISyncLoadMoreInput,
) => ({
	type: ActionTypes.SYNC_REFRESH_GLOBAL_POSTS,
	payload: input,
});

export const refreshGlobalPosts = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		await dispatch(
			beginActivity({
				type: ActionTypes.REFRESH_GLOBAL_POSTS,
				uuid: activityId,
			}),
		);
		dispatch(refreshGlobalPostsAction());

		const data = await context.dataApi.posts.loadMorePosts({ limit: 5 });
		await dispatch(getProfilesByPosts(data.posts));

		dispatch(loadCommentsAction(data.posts));
		dispatch(syncRefreshGlobalPostsAction(data));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.REFRESH_GLOBAL_POSTS,
				error: e.message,
				uuid: activityId,
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

/**
 * 	Called when pulling the friends feed to refresh,
 *  gets a new batch of posts and updates the store
 */

const refreshFriendsPostsAction: ActionCreator<IRefreshFriendsPostsAction> = () => ({
	type: ActionTypes.REFRESH_FRIENDS_POSTS,
});

const syncRefreshFriendsPostsAction: ActionCreator<ISyncRefreshFriendsPostsAction> = (
	input: ISyncLoadMoreInput,
) => ({
	type: ActionTypes.SYNC_REFRESH_FRIENDS_POSTS,
	payload: input,
});

export const refreshFriendsPosts = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		await dispatch(
			beginActivity({
				type: ActionTypes.REFRESH_FRIENDS_POSTS,
				uuid: activityId,
			}),
		);
		dispatch(refreshFriendsPostsAction());

		const data = await context.dataApi.posts.loadMoreFriendsPosts({ limit: 5 });
		await dispatch(getProfilesByPosts(data.posts));

		dispatch(loadCommentsAction(data.posts));
		dispatch(syncRefreshFriendsPostsAction(data));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.REFRESH_FRIENDS_POSTS,
				error: e.message,
				uuid: activityId,
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

/**
 * 	Called when creating a comment, adds the id to the
 * 	comments array of the post
 */

export const addCommentToPostAction: ActionCreator<IAddCommentAction> = (
	input: ICommentToPostInput,
) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: input,
});

/**
 * 	Called when creating a comment, replaces the frontend
 * 	generated comment id with the proper one generated
 *  on the backend
 */

export const replaceCommentOnPostAction: ActionCreator<IReplaceCommentAction> = (
	input: IReplaceCommentInput,
) => ({
	type: ActionTypes.REPLACE_COMMENT,
	payload: input,
});

/**
 * 	Called when deleting a comment, removes the id
 *  from the comments array of the post
 */

export const removeCommentFromPostAction: ActionCreator<IRemoveCommentAction> = (
	input: ICommentToPostInput,
) => ({
	type: ActionTypes.REMOVE_COMMENT,
	payload: input,
});
