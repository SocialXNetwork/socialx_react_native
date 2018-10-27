import { IContext, IGunCallback, IGunInstance, ILikeData, TABLE_ENUMS, TABLES } from '../../types';
import { ApiError } from '../../utils/errors';
import { getContextMeta } from '../../utils/helpers';
import * as postHandles from '../posts/handles';
import * as commentHandles from './handles';

import uuidv4 from 'uuid/v4';

import { IPostMetasCallback } from '../posts';

import {
	ICommentMetasCallback,
	ICreateCommentInput,
	IRemoveCommentInput,
	IUnlikeCommentInput,
} from './types';

const loadAllMetas = (gun: IGunInstance, cb: any) => {
	gun.get(TABLES.COMMENT_META_BY_ID).once(() => {
		cb();
	});
};

export const createComment = (
	context: IContext,
	createCommentInput: ICreateCommentInput,
	callback: IGunCallback<null>,
) => {
	const { account, gun } = context;
	const errPrefix = 'failed to create comment';
	if (!account.is) {
		return callback(new ApiError(`${errPrefix}, user not logged in`));
	}

	const { postId, text } = createCommentInput;

	const mainRunner = () => {
		postHandles.postMetaById(context, postId).docLoad((postMeta: IPostMetasCallback) => {
			if (!Object.keys(postMeta).length) {
				return callback(
					new ApiError(`${errPrefix}, no post found by this id`, {
						initialRequestBody: createCommentInput,
					}),
				);
			}

			const { postPath } = postMeta;
			const { owner, ownerPub, timestamp } = getContextMeta(context);

			const commentId = uuidv4();
			const commentData = {
				text,
				timestamp,
				owner: {
					alias: owner,
					pub: ownerPub,
				},
			};
			loadAllMetas(gun, () => {
				createCommentByPostPath(commentData, commentId, postPath);
			});
		});
	};
	const createCommentByPostPath = (commentData: any, commentId: string, postPath: string) => {
		commentHandles
			.commentsByPostPath(context, postPath)
			.get(commentId)
			.put(commentData, (commentCallback) => {
				if (commentCallback.err) {
					return callback(
						new ApiError(`${errPrefix}, failed to put comment ${commentCallback.err}`, {
							initialRequestBody: createCommentInput,
						}),
					);
				}
				const commentMetaIdData = {
					owner: commentData.owner,
					postPath,
					timestamp: commentData.timestamp,
					commentId,
				};
				createCommentMeta(commentMetaIdData, commentId);
			});
	};
	const createCommentMeta = (commentMetaIdData: any, commentId: string) => {
		commentHandles
			.commentMetaById(context, commentId)
			.put(commentMetaIdData, (putCommentMetaCallback) => {
				if (putCommentMetaCallback.err) {
					return callback(
						new ApiError(`${errPrefix}, failed to put comment meta ${putCommentMetaCallback.err}`, {
							initialRequestBody: createCommentInput,
						}),
					);
				}
				return callback(null);
			});
	};
	mainRunner();
};

export const removeComment = (
	context: IContext,
	{ commentId }: IRemoveCommentInput,
	callback: IGunCallback<null>,
) => {
	const errPrefix = 'failed to remove comment';

	/**
	 * fetch the comment meta and check if the current user owns the comment
	 */
	const mainRunner = () => {
		commentHandles
			.commentMetaById(context, commentId)
			.docLoad((commentReturnCallback: ICommentMetasCallback) => {
				if (!Object.keys(commentReturnCallback).length) {
					return callback(
						new ApiError(`${errPrefix}, failed to find comment`, {
							initialRequestBody: { commentId },
						}),
					);
				}

				const {
					postPath,
					owner: { alias },
				} = commentReturnCallback;
				const { owner } = getContextMeta(context);

				if (owner !== alias) {
					return callback(
						new ApiError(`${errPrefix}, user does not own comment`, {
							initialRequestBody: { commentId },
						}),
					);
				}
				eraseCommentNode(postPath);
			});
	};
	/**
	 * erase the comment on the post
	 * @param postPath string absolute path to the post
	 */
	const eraseCommentNode = (postPath: string) => {
		commentHandles
			.commentsByPostPath(context, postPath)
			.erase(commentId, (removeCommentCallback) => {
				if (removeCommentCallback.err) {
					return callback(
						new ApiError(
							`${errPrefix}, failed to put null comment record ${removeCommentCallback.err}`,
							{
								initialRequestBody: { commentId },
							},
						),
					);
				}
				eraseCommentMetaNode();
			});
	};
	/**
	 * erase the comment meta data from the public record
	 */
	const eraseCommentMetaNode = () => {
		commentHandles.commentMetaById(context, commentId).put(null, (removeCommentMetaCallback) => {
			if (removeCommentMetaCallback.err) {
				return callback(
					new ApiError(
						`${errPrefix}, failed to put null comment meta record ${removeCommentMetaCallback.err}`,
						{
							initialRequestBody: { commentId },
						},
					),
				);
			}
			return callback(null);
		});
	};
	// run sequence
	mainRunner();
};

export const likeComment = (
	context: IContext,
	{ commentId }: { commentId: string },
	callback: IGunCallback<null>,
) => {
	const { account } = context;
	const errPrefix = 'failed to like comment';

	if (!account.is) {
		return callback(
			new ApiError(`${errPrefix}, user not logged in`, {
				initialRequestBody: { commentId },
			}),
		);
	}

	commentHandles
		.commentMetaById(context, commentId)
		.docLoad((commentMeta: ICommentMetasCallback) => {
			if (!Object.keys(commentMeta).length) {
				return callback(
					new ApiError(`${errPrefix}, no comment found by this id`, {
						initialRequestBody: { commentId },
					}),
				);
			}

			const { owner, ownerPub, timestamp } = getContextMeta(context);
			const { postPath } = commentMeta;

			commentHandles
				.commentsByPostPath(context, postPath)
				.get(commentId)
				.get(TABLE_ENUMS.LIKES)
				.get(owner)
				.docLoad((commentReturnCallback: any) => {
					if (commentReturnCallback !== null) {
						if (Object.keys(commentReturnCallback).length && commentReturnCallback.owner) {
							return callback(
								new ApiError(`${errPrefix}, this comment is already liked`, {
									initialRequestBody: { commentId },
								}),
							);
						}
					}

					commentHandles
						.commentsByPostPath(context, postPath)
						.get(commentId)
						.get(TABLE_ENUMS.LIKES)
						.get(owner)
						.put(
							{
								owner: {
									alias: owner,
									pub: ownerPub,
								},
								timestamp,
							},
							(setCommentLikeCallback) => {
								if (setCommentLikeCallback.err) {
									return callback(
										new ApiError(
											`${errPrefix}, failed to put new comment record ${
												setCommentLikeCallback.err
											}`,
											{
												initialRequestBody: { commentId },
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

export const unlikeComment = (
	context: IContext,
	{ commentId }: IUnlikeCommentInput,
	callback: IGunCallback<null>,
) => {
	const errPrefix = 'failed to unlike comment';
	/**
	 * fetch comment meta and get the related post path
	 */
	const mainRunner = () => {
		commentHandles
			.commentMetaById(context, commentId)
			.docLoad((commentMetaCallback: ICommentMetasCallback) => {
				if (!Object.keys(commentMetaCallback).length) {
					return callback(
						new ApiError(`${errPrefix}, no comment by this id`, {
							initialRequestBody: { commentId },
						}),
					);
				}

				const { postPath } = commentMetaCallback;
				const { owner } = getContextMeta(context);
				checkCommentLike(postPath, owner);
			});
	};
	/**
	 * check if the like exists on the comment and the current user owns it
	 * @param postPath string absolute post path
	 * @param owner string current user alias/username
	 */
	const checkCommentLike = (postPath: string, owner: string) => {
		commentHandles
			.commentsByPostPath(context, postPath)
			.path(`${commentId}.${TABLE_ENUMS.LIKES}.${owner}`)
			.docLoad((likeReturnCallback: ILikeData) => {
				if (!Object.keys(likeReturnCallback).length && !likeReturnCallback.owner) {
					return callback(
						new ApiError(`${errPrefix}, no like found to be erased`, {
							initialRequestBody: { commentId },
						}),
					);
				}

				if (likeReturnCallback.owner.alias !== owner) {
					return callback(
						new ApiError(`${errPrefix}, user does not own this like? something is wrong here`, {
							initialRequestBody: { commentId },
						}),
					);
				}

				eraseCommentLike(postPath, owner);
			});
	};
	/**
	 * erase the like from the comment
	 * @param postPath string absolute post path
	 * @param owner string current user alias/username
	 */
	const eraseCommentLike = (postPath: string, owner: string) => {
		commentHandles
			.commentsByPostPath(context, postPath)
			.path(`${commentId}.${TABLE_ENUMS.LIKES}`)
			.erase(owner, (unlikeCommentCallback) => {
				if (unlikeCommentCallback.err) {
					return callback(
						new ApiError(`${errPrefix}, like was not removed ${unlikeCommentCallback.err}`, {
							initialRequestBody: { commentId },
						}),
					);
				}
				return callback(null);
			});
	};
	// run sequence
	mainRunner();
};

export default {
	createComment,
	likeComment,
	removeComment,
	unlikeComment,
};
