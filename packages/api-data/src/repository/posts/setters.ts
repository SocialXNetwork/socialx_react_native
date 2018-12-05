import uuidv4 from 'uuid/v4';
import {
	IContext,
	IGunCallback,
	IGunInstance,
	IGunSetterCallback,
	ILikeData,
	TABLE_ENUMS,
	TABLES,
} from '../../types';
import { ApiError } from '../../utils/errors';
import { datePathFromDate, getContextMeta } from '../../utils/helpers';
import * as postHandles from './handles';

import { ICreatePostInput, IPostMetasCallback, IRemovePostInput, IUnlikePostInput } from './types';

const loadMetaIdAndPass = (gun: IGunInstance, cb: any) => {
	gun.get(TABLES.POST_META_BY_ID).once(
		(data: any) => {
			cb(data);
		},
		{ wait: 500 },
	);
};

const loadMetaUserAndPass = (gun: IGunInstance, cb: any) => {
	gun.get(TABLES.POST_METAS_BY_USER).once(
		(data: any) => {
			cb(data);
		},
		{ wait: 500 },
	);
};

const loadMetaIdTimestampAndPass = (gun: IGunInstance, cb: any) => {
	gun.get(TABLES.POST_META_BY_ID_TIMESTAMP).once(
		(data: any) => {
			cb(data);
		},
		{ wait: 500 },
	);
};

const loadAllMetasAndPass = (gun: IGunInstance, cb: any) => {
	loadMetaIdAndPass(gun, (metaId: any) => {
		loadMetaUserAndPass(gun, (metaUser: any) => {
			loadMetaIdTimestampAndPass(gun, (metaIdTimestamp: any) => {
				cb({ metaId, metaUser, metaIdTimestamp });
			});
		});
	});
};

export const createPost = (
	context: IContext,
	createPostInput: ICreatePostInput,
	callback: IGunCallback<string>,
) => {
	const { account, gun } = context;
	if (!account.is) {
		return callback(new ApiError('user not logged in'));
	}

	const { owner, ownerPub, timestamp } = getContextMeta(context);

	const datePath = datePathFromDate(new Date(timestamp));

	const publicPath = `${datePath}.${TABLE_ENUMS.PUBLIC}`;
	const privatePath = `${datePath}.${TABLE_ENUMS.PRIVATE}.${owner}`;

	const { privatePost, media } = createPostInput;

	const postId = uuidv4();
	const postPath = (privatePost ? privatePath : publicPath) + `.${postId}`;

	const errPrefix = 'failed to create post';
	const mediaSetData = media
		? media.reduce((res, item, i) => {
				res = {
					...res,
					[i]: item,
				};
				return res;
				// tslint bug here???????? pls halp
				// tslint:disable-next-line
		    }, {})
		: {};
	const mainRunner = () => {
		gun
			.get(TABLES.POSTS)
			.path(publicPath)
			.once(
				() => {
					addPostAndPass();
				},
				{ wait: 400 },
			);
	};
	const addPostAndPass = () => {
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
				media: mediaSetData,
			},
			(createPostCallback: IGunSetterCallback) => {
				if (createPostCallback.err) {
					return callback(
						new ApiError(`${errPrefix}, error creating post ${createPostCallback.err}`),
					);
				}
				loadAllMetasAndPass(gun, createPostMetaByUser);
			},
		);
	};
	const createPostMetaByUser = () =>
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
			(createPostMetaByUserCallback) => {
				if (createPostMetaByUserCallback.err) {
					return callback(
						new ApiError(
							`${errPrefix}, error creating post meta of current account ${
								createPostMetaByUserCallback.err
							}`,
						),
					);
				}
				createPostMetaById();
			},
		);

	const createPostMetaById = () =>
		postHandles.postMetaById(context, postId).put(
			{
				postPath,
				privatePost,
				timestamp,
				owner: {
					alias: owner,
					pub: ownerPub,
				},
			},
			(createOistMetaByIdCallback) => {
				if (createOistMetaByIdCallback.err) {
					return callback(
						new ApiError(
							`${errPrefix}, error creating post meta ${createOistMetaByIdCallback.err}`,
						),
					);
				}

				createPostMetaByIdTimestamp();
			},
		);

	const createPostMetaByIdTimestamp = () =>
		postHandles.postMetaByIdTimestamp(context, `${timestamp}|${postId}|${owner}`).put(
			{
				postPath,
				timestamp,
				owner: {
					alias: owner,
					pub: ownerPub,
				},
			},
			(cpmbitCallback) => {
				if (cpmbitCallback.err) {
					return callback(
						new ApiError(`${errPrefix}, error creating post meta ${cpmbitCallback.err}`),
					);
				}

				return callback(null, postId);
			},
		);

	mainRunner();
};

export const likePost = (
	context: IContext,
	{ postId }: { postId: string },
	callback: IGunCallback<null>,
) => {
	const { owner, ownerPub, timestamp } = getContextMeta(context);

	const errPrefix = 'failed to like post';
	postHandles.postMetaById(context, postId).docLoad((postMeta: IPostMetasCallback) => {
		if (!postMeta || !Object.keys(postMeta).length) {
			return callback(
				new ApiError(`${errPrefix}, no post found with id`, {
					initialRequestBody: { postId },
				}),
			);
		}

		postHandles
			.postLikesByCurrentUser(context, postMeta.postPath)
			.docLoad((likePostCallback: any) => {
				if (likePostCallback !== null) {
					if (Object.keys(likePostCallback).length && likePostCallback.owner) {
						return callback(
							new ApiError(`${errPrefix}, post already liked`, {
								initialRequestBody: { postId },
							}),
						);
					}
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
								new ApiError(`${errPrefix}, failed to set like ${putPostLikeCallback.err}`, {
									initialRequestBody: { postId },
								}),
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
	const { gun } = context;
	const errPrefix = 'failed to remove post';
	let postTimestamp = 0;
	let ownerAlias = '';

	const mainRunner = () => {
		postHandles.postMetaById(context, postId).docLoad(
			(postMetaIdCallback: IPostMetasCallback) => {
				if (!postMetaIdCallback || !Object.keys(postMetaIdCallback).length) {
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
					timestamp,
				} = postMetaIdCallback;

				postTimestamp = timestamp;
				ownerAlias = owner;

				if (owner !== alias) {
					return callback(
						new ApiError(`${errPrefix}, user does not own this post`, {
							initialRequestBody: { postId },
						}),
					);
				}
				erasePostNode(postPath);
			},
			{ wait: 500, timeout: 1000 },
		);
	};
	const erasePostNode = (postPath: string) => {
		postHandles.postsRecordByPostPath(context, postPath).erase(postId, (postRemoveCallback) => {
			if (postRemoveCallback.err) {
				return callback(
					new ApiError(`${errPrefix}, error removing post ${postRemoveCallback.err}`, {
						initialRequestBody: { postId },
					}),
				);
			}
			erasePostMetaNodeById();
		});
	};
	const erasePostMetaNodeById = () => {
		postHandles.postMetaIdsRecord(context).erase(postId, (metaRemoveCallback) => {
			if (metaRemoveCallback.err) {
				return callback(
					new ApiError(`${errPrefix}, error removing post meta ${metaRemoveCallback.err}`, {
						initialRequestBody: { postId },
					}),
				);
			}
			erasePostMetaNodeByUser();
		});
	};
	const erasePostMetaNodeByUser = () => {
		postHandles.postMetasByCurrentUser(context).erase(postId, (postMetasRemoveCallback) => {
			if (postMetasRemoveCallback.err) {
				return callback(
					new ApiError(`${errPrefix}, error removing post meta ${postMetasRemoveCallback.err}`, {
						initialRequestBody: { postId },
					}),
				);
			}
			erasePostMetaNodeByIdTimestamp();
		});
	};
	const erasePostMetaNodeByIdTimestamp = () => {
		postHandles.postMetaByIdTimestampRecord(context).put(
			{
				[`${postTimestamp}|${postId}|${ownerAlias}`]: null,
			},
			(postIdTimestampCallback) => {
				if (postIdTimestampCallback.err) {
					return callback(new ApiError('failed to delete id timestamp'));
				}
				return callback(null);
			},
		);
	};
	loadAllMetasAndPass(gun, mainRunner);
};

export const unlikePost = (
	context: IContext,
	{ postId }: IUnlikePostInput,
	callback: IGunCallback<null>,
) => {
	const errPrefix = 'failed to unlike post';
	/**
	 * get the post meta by its id
	 */
	const mainRunner = () => {
		postHandles.postMetaById(context, postId).docLoad((postMetaCallback: IPostMetasCallback) => {
			if (!postMetaCallback || !Object.keys(postMetaCallback).length) {
				return callback(
					new ApiError(`${errPrefix}, no post found by id`, {
						initialRequestBody: { postId },
					}),
				);
			}
			const { postPath } = postMetaCallback;
			const { owner } = getContextMeta(context);
			checkIfLikedAndOwned(postPath, owner);
		});
	};
	/**
	 * check if the like exists and the current user owns it too
	 * @param postPath string absoulte path to the post
	 * @param owner string owner alias/username
	 */
	const checkIfLikedAndOwned = (postPath: string, owner: string) => {
		postHandles.postLikesByCurrentUser(context, postPath).docLoad((likeData: ILikeData) => {
			if (!likeData || (!Object.keys(likeData).length && !likeData.owner)) {
				return callback(
					new ApiError(`${errPrefix}, can not remove a like that doesnt exist`, {
						initialRequestBody: { postId },
					}),
				);
			}

			if (likeData.owner.alias !== owner) {
				return callback(
					new ApiError(`${errPrefix}, user does not own the like? something is wrong here..`, {
						initialRequestBody: { postId },
					}),
				);
			}
			removeLike(postPath, owner);
		});
	};
	/**
	 * removes the like by the current user on a post
	 * @param postPath string absolute path to the post
	 * @param owner string owner alias/username
	 */
	const removeLike = (postPath: string, owner: string) => {
		postHandles.likesByPostPath(context, postPath).erase(owner, (unlikePostCallback) => {
			if (unlikePostCallback.err) {
				return callback(
					new ApiError(`${errPrefix}, failed to remove like on post ${unlikePostCallback.err}`, {
						initialRequestBody: { postId },
					}),
				);
			}
			return callback(null);
		});
	};
	// run sequence
	mainRunner();
};

export default { createPost, likePost, removePost, unlikePost };
