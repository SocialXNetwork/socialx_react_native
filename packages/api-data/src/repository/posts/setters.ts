import uuidv4 from 'uuid/v4';
import {
	IContext,
	IGunCallback,
	IGunSetterCallback,
	ILikeData,
	TABLE_ENUMS,
	TABLES,
} from '../../types';
import { ApiError } from '../../utils/errors';
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
		return callback(new ApiError('user not logged in'));
	}

	const { owner, ownerPub, timestamp } = getContextMeta(context);

	const datePath = datePathFromDate(new Date(timestamp));

	const publicPath = `${datePath}.${TABLE_ENUMS.PUBLIC}`;
	const privatePath = `${datePath}.${TABLE_ENUMS.PRIVATE}.${owner}`;

	const { privatePost } = createPostInput;

	const postId = uuidv4();
	const postPath = (privatePost ? privatePath : publicPath) + `.${postId}`;

	const errPrefix = 'failed to create post';
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
				return callback(
					new ApiError(
						`${errPrefix}, error creating post ${setPostCallback.err}`,
					),
				);
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
						return callback(
							new ApiError(
								`${errPrefix}, error creating post meta of current account ${
									setPostMetaCallback.err
								}`,
							),
						);
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
								return callback(
									new ApiError(
										`${errPrefix}, error creating post meta ${
											setPostMetaCallback.err
										}`,
									),
								);
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

	const errPrefix = 'failed to like post';
	postHandles
		.postMetaById(context, postId)
		.docLoad((postMeta: IPostMetasCallback) => {
			if (!postMeta) {
				return callback(
					new ApiError(`${errPrefix}, no post found with id`, {
						initialRequestBody: { postId },
					}),
				);
			}

			postHandles
				.postLikesByCurrentUser(context, postMeta.postPath)
				.docLoad((likePostCallback) => {
					if (likePostCallback) {
						return callback(
							new ApiError(`${errPrefix}, post already liked`, {
								initialRequestBody: { postId },
							}),
						);
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
								return callback(
									new ApiError(
										`${errPrefix}, failed to set like ${
											putPostLikeCallback.err
										}`,
										{
											initialRequestBody: { postId },
										},
									),
								);
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
	const errPrefix = 'failed to remove post';
	postHandles
		.postMetaById(context, postId)
		.docLoad((postMetaIdCallback: IPostMetasCallback) => {
			if (!postMetaIdCallback) {
				return callback(
					new ApiError(`${errPrefix}, no post found by id`, {
						initialRequestBody: { postId },
					}),
				);
			}

			const { owner } = getContextMeta(context);

			const {
				postPath,
				owner: { alias },
			} = postMetaIdCallback;

			if (owner !== alias) {
				return callback(
					new ApiError(`${errPrefix}, user does not own this post`, {
						initialRequestBody: { postId },
					}),
				);
			}

			postHandles
				.postByPath(context, postPath)
				.put(null, (postRemoveCallback) => {
					if (postRemoveCallback.err) {
						return callback(
							new ApiError(
								`${errPrefix}, error removing post ${postRemoveCallback.err}`,
								{
									initialRequestBody: { postId },
								},
							),
						);
					}
					postHandles
						.postMetaById(context, postId)
						.put(null, (metaRemoveCallback) => {
							if (metaRemoveCallback.err) {
								return callback(
									new ApiError(
										`${errPrefix}, error removing post ${
											metaRemoveCallback.err
										}`,
										{
											initialRequestBody: { postId },
										},
									),
								);
							}
							postHandles
								.postMetasByPostIdOfCurrentAccount(context, postId)
								.put(null, (postMetasRemoveCallback) => {
									if (postMetasRemoveCallback.err) {
										return callback(
											new ApiError(
												`${errPrefix}, error removing post meta ${
													postMetasRemoveCallback.err
												}`,
												{
													initialRequestBody: { postId },
												},
											),
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
	const errPrefix = 'failed to unlike post';
	postHandles
		.postMetaById(context, postId)
		.docLoad((postMetaCallback: IPostMetasCallback) => {
			if (!postMetaCallback) {
				return callback(
					new ApiError(`${errPrefix}, no post found by id`, {
						initialRequestBody: { postId },
					}),
				);
			}

			const { postPath } = postMetaCallback;
			const { owner } = getContextMeta(context);

			postHandles
				.postLikesByCurrentUser(context, postPath)
				.docLoad((likeData: ILikeData) => {
					if (!likeData) {
						return callback(
							new ApiError(`${errPrefix}, like was not removed`, {
								initialRequestBody: { postId },
							}),
						);
					}

					if (likeData.owner.alias !== owner) {
						return callback(
							new ApiError(`${errPrefix}, user does not own post`, {
								initialRequestBody: { postId },
							}),
						);
					}

					postHandles
						.postLikesByCurrentUser(context, postPath)
						.put(null, (unlikePostCallback) => {
							if (unlikePostCallback.err) {
								return callback(
									new ApiError(
										`${errPrefix}, failed to put ${unlikePostCallback.err}`,
										{
											initialRequestBody: { postId },
										},
									),
								);
							}
							return callback(null);
						});
				});
		});
};

export default { createPost, likePost, removePost, unlikePost };
