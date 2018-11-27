import {
	ICreatePostInput,
	IPostArrayData,
	IPostReturnData,
	IRemovePostInput,
	IUnlikePostInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';

import { IWallPostPhotoOptimized } from '../../../types';
import { getUserPosts } from '../../aggregations/posts';
import { setUploadStatus } from '../../storage/files';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { setGlobal } from '../../ui/globals';
import { loadCommentsAction } from '../comments';
import { getCurrentProfile, getProfilesByPosts } from '../profiles';
import {
	ActionTypes,
	ICreatePostAction,
	IDateInput,
	IGetPostByIdAction,
	IGetPostByPathAction,
	IGetPostsByUsernameAction,
	IGetPublicPostsByDateAction,
	ILikePostAction,
	ILoadMoreFriendsPostsAction,
	ILoadMorePostsAction,
	IPostIdInput,
	IPostPathInput,
	IRemovePostAction,
	IResetPostsAction,
	ISyncAddCommentAction,
	ISyncCommentInput,
	ISyncGetPostByIdAction,
	ISyncGetPostByPathAction,
	ISyncGetPostsByUserAction,
	ISyncGetPublicPostsByDateAction,
	ISyncLoadMoreFriendsPostsAction,
	ISyncLoadMorePostsAction,
	ISyncRemoveCommentAction,
	ISyncRemovePostAction,
	IUnlikePostAction,
	IUsernameInput,
} from './Types';

const resetPostsAction: ActionCreator<IResetPostsAction> = () => ({
	type: ActionTypes.RESET_POSTS,
});

export const resetPostsAndRefetch = (): IThunk => async (dispatch, getState, context) => {
	dispatch(resetPostsAction);
	await dispatch(
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

export const getPostsByUsername = (getPostsByUsernameInput: IUsernameInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	try {
		dispatch(getPostsByUsernameAction(getPostsByUsernameInput));
		await dispatch(
			beginActivity({
				type: ActionTypes.GET_POSTS_BY_USER,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const posts = await dataApi.posts.getPostsByUser(getPostsByUsernameInput);
		await dispatch(setGlobal({ skeletonPost: null }));
		dispatch(syncGetPostsByUsernameAction(posts));
		await dispatch(getProfilesByPosts(posts));
		await dispatch(getUserPosts(getPostsByUsernameInput));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_POSTS_BY_USER,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		await dispatch(
			endActivity({
				uuid: activityId,
			}),
		);
	}
};

const getPostByIdAction: ActionCreator<IGetPostByIdAction> = (getPostByIdInput: IPostIdInput) => ({
	type: ActionTypes.GET_POST_BY_ID,
	payload: getPostByIdInput,
});

const syncGetPostByIdAction: ActionCreator<ISyncGetPostByIdAction> = (post: IPostReturnData) => ({
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
		await dispatch(beginActivity({ type: ActionTypes.GET_POST_BY_ID, uuid: activityId }));
		const { dataApi } = context;
		const post = await dataApi.posts.getPostById(getPostByIdInput);
		dispatch(syncGetPostByIdAction(post));
		await dispatch(getProfilesByPosts([post]));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SYNC_GET_POST_BY_ID,
				error: e.message,
				uuid: uuidv4(),
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
	const activityId = uuidv4();
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
				uuid: uuidv4(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const loadMorePostsAction: ActionCreator<ILoadMorePostsAction> = () => ({
	type: ActionTypes.LOAD_MORE_POSTS,
});

const syncLoadMorePostsAction: ActionCreator<ISyncLoadMorePostsAction> = (data: {
	posts: IPostArrayData;
	canLoadMore: boolean;
	nextToken: string;
}) => ({
	type: ActionTypes.SYNC_LOAD_MORE_POSTS,
	payload: data,
});

export const loadMorePosts = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();

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

		const { dataApi } = context;
		const data = await dataApi.posts.loadMorePosts({ nextToken, limit: 5 });
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

const loadMoreFriendsPostsAction: ActionCreator<ILoadMoreFriendsPostsAction> = () => ({
	type: ActionTypes.LOAD_MORE_FRIENDS_POSTS,
});

const syncLoadMoreFriendsPostsAction: ActionCreator<ISyncLoadMoreFriendsPostsAction> = (data: {
	posts: IPostArrayData;
	canLoadMore: boolean;
	nextToken: string;
}) => ({
	type: ActionTypes.SYNC_LOAD_MORE_FRIENDS_POSTS,
	payload: data,
});

export const loadMoreFriendsPosts = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();

	try {
		const {
			global: { nextToken },
		} = getState().data.posts;
		await dispatch(
			beginActivity({
				type: ActionTypes.LOAD_MORE_FRIENDS_POSTS,
				uuid: activityId,
			}),
		);
		dispatch(loadMoreFriendsPostsAction());

		const { dataApi } = context;
		const data = await dataApi.posts.loadMoreFriendsPosts({ nextToken, limit: 5 });
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

const getPublicPostsByDateAction: ActionCreator<IGetPublicPostsByDateAction> = (
	getPostByDateInput: IDateInput,
) => ({
	type: ActionTypes.GET_PUBLIC_POSTS_BY_DATE,
	payload: getPostByDateInput,
});

const syncGetPublicPostsByDateAction: ActionCreator<ISyncGetPublicPostsByDateAction> = (
	posts: IPostArrayData,
) => ({
	type: ActionTypes.SYNC_GET_PUBLIC_POSTS_BY_DATE,
	payload: posts,
});

export const getPublicPostsByDate = (getPostByDateInput: IDateInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	//
};

const createPostAction: ActionCreator<ICreatePostAction> = (createPostInput: ICreatePostInput) => ({
	type: ActionTypes.CREATE_POST,
	payload: createPostInput,
});

// TODO @Jake move this
interface IUploadResponse {
	uploadId: string;
	responseBody: string;
}

export const createPost = (
	createPostInput: ICreatePostInput & { media: IWallPostPhotoOptimized[] },
): IThunk => async (dispatch, getState, context) => {
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		const activityId = uuidv4();
		try {
			dispatch(createPostAction(createPostInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.CREATE_POST,
					uuid: activityId,
				}),
			);
			const { dataApi, storageApi } = context;

			if (createPostInput.media && createPostInput.media.length > 0) {
				const { media, ...postRest } = createPostInput;

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
					media.map((obj: IWallPostPhotoOptimized | any) =>
						storageApi.uploadFile(
							obj.type.includes('gif') || obj.type.includes('video')
								? obj.sourceURL
								: obj.contentOptimizedPath,
							obj.type,
							bootstrapStatus,
							updateStatus,
						),
					),
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
						category: 'Photography',
					},
				}));

				const finalInput = { ...postRest, media: finalMedia };
				await dataApi.posts.createPost(finalInput as any);
			} else {
				await dataApi.posts.createPost(createPostInput);
			}

			await dispatch(getPostsByUsername({ username: auth.alias }));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.CREATE_POST,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const likePostAction: ActionCreator<ILikePostAction> = (likePostInput: IPostIdInput) => ({
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
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(likePostAction(likePostInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.LIKE_POST,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.posts.likePost(likePostInput);
			await dispatch(getPostById(likePostInput));
			await dispatch(getCurrentProfile());
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.LIKE_POST,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const removePostAction: ActionCreator<IRemovePostAction> = (removePostInput: IRemovePostInput) => ({
	type: ActionTypes.REMOVE_POST,
	payload: removePostInput,
});

const syncRemovePostAction: ActionCreator<ISyncRemovePostAction> = (postId: string) => ({
	type: ActionTypes.SYNC_REMOVE_POST,
	payload: postId,
});

export const removePost = (removePostInput: IRemovePostInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(removePostAction(removePostInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.REMOVE_POST,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.posts.removePost(removePostInput);
			dispatch(syncRemovePostAction(removePostInput.postId));
			await dispatch(getUserPosts({ username: auth.alias }));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.REMOVE_POST,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const unlikePostAction: ActionCreator<IUnlikePostAction> = (unlikePostInput: IUnlikePostInput) => ({
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
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(unlikePostAction(unlikePostInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.UNLIKE_POST,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.posts.unlikePost(unlikePostInput);
			await dispatch(getPostById(unlikePostInput));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.UNLIKE_POST,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

export const syncAddCommentAction: ActionCreator<ISyncAddCommentAction> = (
	input: ISyncCommentInput,
) => ({
	type: ActionTypes.SYNC_ADD_COMMENT,
	payload: input,
});

export const syncRemoveCommentAction: ActionCreator<ISyncRemoveCommentAction> = (
	input: ISyncCommentInput,
) => ({
	type: ActionTypes.SYNC_REMOVE_COMMENT,
	payload: input,
});
