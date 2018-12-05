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

import { IWallPostPhotoOptimized } from '../../../types';
import { getUserPosts } from '../../aggregations/posts';
import { setUploadStatus } from '../../storage/files';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { setGlobal } from '../../ui/globals';
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
	ILoadMoreFriendsPostsAction,
	ILoadMorePostsAction,
	IPostIdInput,
	IPostPathInput,
	IRemoveCommentAction,
	IRemovePostAction,
	IResetFriendsFeedAction,
	IResetGlobalFeedAction,
	ISyncGetPostByIdAction,
	ISyncGetPostByPathAction,
	ISyncGetPostsByUserAction,
	ISyncGetPublicPostsByDateAction,
	ISyncLoadMoreFriendsPostsAction,
	ISyncLoadMorePostsAction,
	ISyncRemovePostAction,
	IUnlikeCommentAction,
	IUnlikePostAction,
	IUsernameInput,
} from './Types';

const resetGlobalFeedAction: ActionCreator<IResetGlobalFeedAction> = () => ({
	type: ActionTypes.RESET_GLOBAL_FEED,
});

export const resetGlobalFeedAndRefetch = (): IThunk => async (dispatch, getState, context) => {
	dispatch(resetGlobalFeedAction());
	await dispatch(loadMorePosts());
};

const resetFriendsFeedAction: ActionCreator<IResetFriendsFeedAction> = () => ({
	type: ActionTypes.RESET_FRIENDS_FEED,
});

export const resetFriendsFeedAndRefetch = (): IThunk => async (dispatch, getState, context) => {
	dispatch(resetFriendsFeedAction());
	await dispatch(loadMoreFriendsPosts());
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
		console.log('current Token', { nextToken });
		const data = await dataApi.posts.loadMorePosts({ nextToken, limit: 5 });
		await dispatch(getProfilesByPosts(data.posts));
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
				console.log('Media', media);

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

// <================= comments =================>
const createCommentAction: ActionCreator<ICreateCommentAction> = (
	createCommentInput: ICreateCommentInput,
) => ({
	type: ActionTypes.CREATE_COMMENT,
	payload: createCommentInput,
});

export const createComment = (createCommentInput: ICreateCommentInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(createCommentAction(createCommentInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.CREATE_COMMENT,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.comments.createComment(createCommentInput);
			await dispatch(getPostById({ postId: createCommentInput.postId }));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.CREATE_COMMENT,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const likeCommentAction: ActionCreator<ILikeCommentAction> = (
	likeCommentInput: ICommentIdInput,
) => ({
	type: ActionTypes.LIKE_COMMENT,
	payload: likeCommentInput,
});

export const likeComment = (likeCommentInput: ICommentIdInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const { commentId } = likeCommentInput;

	const storeState = getState();
	const parentGlobalPost = storeState.data.posts.global.posts.find((post) =>
		post.comments.find((comment) => comment.commentId === commentId) ? true : false,
	);
	const parentFriendPost = storeState.data.posts.friends.posts.find((post) =>
		post.comments.find((comment) => comment.commentId === commentId) ? true : false,
	);
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		const activityId = uuidv4();
		try {
			dispatch(likeCommentAction(likeCommentInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.LIKE_COMMENT,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.comments.likeComment(likeCommentInput);
			await dispatch(
				getPostById({
					postId: parentGlobalPost
						? parentGlobalPost.postId
						: parentFriendPost
						? parentFriendPost.postId
						: '',
				}),
			);
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.LIKE_COMMENT,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const removeCommentAction: ActionCreator<IRemoveCommentAction> = (
	removeCommentInput: IRemoveCommentInput,
) => ({
	type: ActionTypes.REMOVE_COMMENT,
	payload: removeCommentInput,
});

export const removeComment = (removeCommentInput: IRemoveCommentInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const { commentId } = removeCommentInput;

	const storeState = getState();
	const parentGlobalPost = [...storeState.data.posts.global.posts].find((post) =>
		post.comments.find((comment) => comment.commentId === commentId) ? true : false,
	);
	const parentFriendPost = [...storeState.data.posts.friends.posts].find((post) =>
		post.comments.find((comment) => comment.commentId === commentId) ? true : false,
	);
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		const activityId = uuidv4();
		try {
			dispatch(removeCommentAction(removeCommentInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.REMOVE_COMMENT,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.comments.removeComment(removeCommentInput);
			await dispatch(
				getPostById({
					postId: parentGlobalPost
						? parentGlobalPost.postId
						: parentFriendPost
						? parentFriendPost.postId
						: '',
				}),
			);
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.REMOVE_COMMENT,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const unlikeCommentAction: ActionCreator<IUnlikeCommentAction> = (
	unlikeCommentInput: IUnlikeCommentInput,
) => ({
	type: ActionTypes.UNLIKE_COMMENT,
	payload: unlikeCommentInput,
});

export const unlikeComment = (unlikeCommentInput: IUnlikeCommentInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const { commentId } = unlikeCommentInput;

	const storeState = getState();
	const parentGlobalPost = [...storeState.data.posts.global.posts].find((post) =>
		post.comments.find((comment) => comment.commentId === commentId) ? true : false,
	);
	const parentFriendsPost = [...storeState.data.posts.friends.posts].find((post) =>
		post.comments.find((comment) => comment.commentId === commentId) ? true : false,
	);
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		const activityId = uuidv4();
		try {
			dispatch(unlikeCommentAction(unlikeCommentInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.UNLIKE_COMMENT,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.comments.unlikeComment(unlikeCommentInput);
			await dispatch(
				getPostById({
					postId: parentGlobalPost
						? parentGlobalPost.postId
						: parentFriendsPost
						? parentFriendsPost.postId
						: '',
				}),
			);
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.UNLIKE_COMMENT,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};
