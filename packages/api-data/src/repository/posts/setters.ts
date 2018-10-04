import uuidv4 from 'uuid/v4';
import {
	IContext,
	IGunCallback,
	IGunSetterCallback,
	ILikeData,
	TABLE_ENUMS,
	TABLES,
} from '../../types';
import { datePathFromDate, getContextMeta } from '../../utils/helpers';
import * as postHandles from './handles';

import {
	ICreatePostInput,
	IPostMetasCallback,
	IRemovePostInput,
	IUnlikePostInput,
} from './types';

export const createPost = (
	context: IContext,
	createPostInput: ICreatePostInput,
	callback: IGunCallback<null>,
) => {
	const { account, gun } = context;
	if (!account.is) {
		return callback('a user needs to be logged in to proceed');
	}

	const { owner, ownerPub, timestamp } = getContextMeta(context);

	const datePath = datePathFromDate(new Date(timestamp));

	const publicPath = `${datePath}.${TABLE_ENUMS.PUBLIC}`;
	const privatePath = `${datePath}.${TABLE_ENUMS.PRIVATE}.${owner}`;

	const { privatePost } = createPostInput;

	const postId = uuidv4();
	const postPath = (privatePost ? privatePath : publicPath) + `.${postId}`;

	postHandles.postByPath(context, postPath).put(
		{
			...createPostInput,
			owner: {
				alias: owner,
				pub: ownerPub,
			},
			timestamp,
			likes: {},
			comments: {},
		},
		(setPostCallback: IGunSetterCallback) => {
			if (setPostCallback.err) {
				return callback('failed, error => ' + setPostCallback.err);
			}
			postHandles.postMetasByPostIdOfCurrentAccount(context, postId).put(
				{
					postPath,
					privatePost,
					timestamp,
					owner: {
						alias: owner,
						pub: ownerPub,
					},
				},
				(setPostMetaCallback) => {
					if (setPostMetaCallback.err) {
						return callback('failed, error => ' + setPostMetaCallback.err);
					}

					postHandles.postMetaById(context, postId).put(
						{
							postPath,
							privatePost,
							owner: {
								alias: owner,
								pub: ownerPub,
							},
						},
						(putPostMetaCallback) => {
							if (putPostMetaCallback.err) {
								return callback('failed, error => ' + putPostMetaCallback.err);
							}
							return callback(null);
						},
					);
				},
			);
		},
	);
};

export const likePost = (
	context: IContext,
	{ postId }: { postId: string },
	callback: IGunCallback<null>,
) => {
	const { owner, ownerPub, timestamp } = getContextMeta(context);

	postHandles
		.postMetaById(context, postId)
		.docLoad((postMeta: IPostMetasCallback) => {
			if (!postMeta) {
				return callback('no post found by this id');
			}

			postHandles
				.postLikesByCurrentUser(context, postMeta.postPath)
				.docLoad((likePostCallback) => {
					if (likePostCallback) {
						return callback('failed, post already liked');
					}
					postHandles.postLikesByCurrentUser(context, postMeta.postPath).put(
						{
							timestamp,
							owner: {
								alias: owner,
								pub: ownerPub,
							},
						},
						(putPostLikeCallback) => {
							if (putPostLikeCallback.err) {
								return callback('failed, error => ' + putPostLikeCallback.err);
							}

							return callback(null);
						},
					);
				});
		});
};

export const removePost = (
	context: IContext,
	{ postId }: IRemovePostInput,
	callback: IGunCallback<null>,
) => {
	postHandles
		.postMetaById(context, postId)
		.docLoad((postMetaIdCallback: IPostMetasCallback) => {
			if (!postMetaIdCallback) {
				return callback('failed, post does not exist');
			}

			const { owner } = getContextMeta(context);

			const {
				postPath,
				owner: { alias },
			} = postMetaIdCallback;

			if (owner !== alias) {
				return callback(
					'failed, current user does not own this post to remove it',
				);
			}

			postHandles
				.postByPath(context, postPath)
				.put(null, (postRemoveCallback) => {
					if (postRemoveCallback.err) {
						return callback('failed, error => ' + postRemoveCallback.err);
					}
					postHandles
						.postMetaById(context, postId)
						.put(null, (metaRemoveCallback) => {
							if (metaRemoveCallback.err) {
								return callback('failed, error => ' + metaRemoveCallback.err);
							}
							postHandles
								.postMetasByPostIdOfCurrentAccount(context, postId)
								.put(null, (postMetasRemoveCallback) => {
									if (postMetasRemoveCallback.err) {
										return callback(
											'failed, error => ' + postMetasRemoveCallback.err,
										);
									}
									return callback(null);
								});
						});
				});
		});
};

export const unlikePost = (
	context: IContext,
	{ postId }: IUnlikePostInput,
	callback: IGunCallback<null>,
) => {
	postHandles
		.postMetaById(context, postId)
		.docLoad((postMetaCallback: IPostMetasCallback) => {
			if (!postMetaCallback) {
				return callback('failed, post does not exist');
			}

			const { postPath } = postMetaCallback;
			const { owner } = getContextMeta(context);

			postHandles
				.postLikesByCurrentUser(context, postPath)
				.docLoad((likeData: ILikeData) => {
					if (!likeData) {
						return callback('failed, like has not been found to be removed');
					}

					if (likeData.owner.alias !== owner) {
						return callback('failed, use does not own this like to remove it');
					}

					postHandles
						.postLikesByCurrentUser(context, postPath)
						.put(null, (unlikePostCallback) => {
							if (unlikePostCallback.err) {
								return callback('failed, error => ' + unlikePostCallback.err);
							}
							return callback(null);
						});
				});
		});
};

export default { createPost, likePost, removePost, unlikePost };
