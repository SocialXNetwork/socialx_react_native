import { IContext, IGunCallback, ILikeData, TABLE_ENUMS } from '../../types';
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

export const createComment = (
	context: IContext,
	createCommentInput: ICreateCommentInput,
	callback: IGunCallback<null>,
) => {
	const { account } = context;
	const errPrefix = 'failed to create comment';
	if (!account.is) {
		return callback(new ApiError(`${errPrefix}, user not logged in`));
	}

	const { postId, text } = createCommentInput;

	postHandles
		.postMetaById(context, postId)
		.docLoad((postMeta: IPostMetasCallback) => {
			if (!postMeta) {
				return callback(
					new ApiError(`${errPrefix}, no post found by this id`, {
						initialRequestBody: createCommentInput,
					}),
				);
			}

			const { postPath } = postMeta;
			const { owner, ownerPub, timestamp } = getContextMeta(context);

			const commentId = uuidv4();

			commentHandles
				.commentsByPostPath(context, postPath)
				.get(commentId)
				.put(
					{
						text,
						timestamp,
						owner: {
							alias: owner,
							pub: ownerPub,
						},
					},
					(commentCallback) => {
						if (commentCallback.err) {
							return callback(
								new ApiError(
									`${errPrefix}, failed to put comment ${commentCallback.err}`,
									{ initialRequestBody: createCommentInput },
								),
							);
						}

						commentHandles.commentMetaById(context, commentId).put(
							{
								owner: {
									alias: owner,
									pub: ownerPub,
								},
								postPath,
								timestamp,
								commentId,
							},
							(putCommentMetaCallback) => {
								if (putCommentMetaCallback.err) {
									return callback(
										new ApiError(
											`${errPrefix}, failed to put comment meta ${
												putCommentMetaCallback.err
											}`,
											{ initialRequestBody: createCommentInput },
										),
									);
								}
								return callback(null);
							},
						);
					},
				);
		});
};

export const removeComment = (
	context: IContext,
	{ commentId }: IRemoveCommentInput,
	callback: IGunCallback<null>,
) => {
	const errPrefix = 'failed to remove comment';

	commentHandles
		.commentMetaById(context, commentId)
		.docLoad((commentReturnCallback: ICommentMetasCallback) => {
			if (!commentReturnCallback) {
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

			commentHandles
				.commentsByPostPath(context, postPath)
				.get(commentId)
				.put(null, (removeCommentCallback) => {
					if (removeCommentCallback.err) {
						return callback(
							new ApiError(
								`${errPrefix}, failed to put null comment record ${
									removeCommentCallback.err
								}`,
								{
									initialRequestBody: { commentId },
								},
							),
						);
					}
					commentHandles
						.commentMetaById(context, commentId)
						.put(null, (removeCommentMetaCallback) => {
							if (removeCommentMetaCallback.err) {
								return callback(
									new ApiError(
										`${errPrefix}, failed to put null comment meta record ${
											removeCommentMetaCallback.err
										}`,
										{
											initialRequestBody: { commentId },
										},
									),
								);
							}
							return callback(null);
						});
				});
		});
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
			if (!commentMeta) {
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
				.docLoad((commentReturnCallback) => {
					if (commentReturnCallback) {
						return callback(
							new ApiError(`${errPrefix}, this comment is already liked`, {
								initialRequestBody: { commentId },
							}),
						);
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
	commentHandles
		.commentMetaById(context, commentId)
		.docLoad((commentMetaCallback: ICommentMetasCallback) => {
			if (!commentMetaCallback) {
				return callback(
					new ApiError(`${errPrefix}, no comment by this id`, {
						initialRequestBody: { commentId },
					}),
				);
			}

			const { postPath } = commentMetaCallback;
			const { owner } = getContextMeta(context);

			commentHandles
				.commentsByPostPath(context, postPath)
				.get(commentId)
				.get(TABLE_ENUMS.LIKES)
				.get(owner)
				.docLoad((likeReturnCallback: ILikeData) => {
					if (!likeReturnCallback) {
						return callback(
							new ApiError(`${errPrefix}, no like returned`, {
								initialRequestBody: { commentId },
							}),
						);
					}

					if (likeReturnCallback.owner.alias !== owner) {
						return callback(
							new ApiError(`${errPrefix}, user does not own this like`, {
								initialRequestBody: { commentId },
							}),
						);
					}

					commentHandles
						.commentsByPostPath(context, postPath)
						.get(commentId)
						.get(TABLE_ENUMS.LIKES)
						.get(owner)
						.put(null, (unlikeCommentCallback) => {
							if (unlikeCommentCallback.err) {
								return callback(
									new ApiError(
										`${errPrefix}, like was not removed ${
											unlikeCommentCallback.err
										}`,
										{
											initialRequestBody: { commentId },
										},
									),
								);
							}
							return callback(null);
						});
				});
		});
};

export default {
	createComment,
	likeComment,
	removeComment,
	unlikeComment,
};
