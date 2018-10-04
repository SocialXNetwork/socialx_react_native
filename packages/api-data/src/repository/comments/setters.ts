import { IContext, IGunCallback, ILikeData, TABLE_ENUMS } from '../../types';
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

	if (!account.is) {
		return callback('a user has to be logged in to proceed');
	}

	const { postId, text } = createCommentInput;

	postHandles
		.postMetaById(context, postId)
		.docLoad((postMeta: IPostMetasCallback) => {
			if (!postMeta) {
				return callback('no post found by this id');
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
							return callback('failed, error => ' + commentCallback.err);
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
										'failed, error => ' + putCommentMetaCallback.err,
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
	commentHandles
		.commentMetaById(context, commentId)
		.docLoad((commentReturnCallback: ICommentMetasCallback) => {
			if (!commentReturnCallback) {
				return callback('failed, comment doesnt exist');
			}

			const {
				postPath,
				owner: { alias },
			} = commentReturnCallback;
			const { owner } = getContextMeta(context);

			if (owner !== alias) {
				return callback('failed, user doesnt own this comment to remove it');
			}

			commentHandles
				.commentsByPostPath(context, postPath)
				.get(commentId)
				.put(null, (removeCommentCallback) => {
					if (removeCommentCallback.err) {
						return callback('failed, error => ' + removeCommentCallback.err);
					}
					commentHandles
						.commentMetaById(context, commentId)
						.put(null, (removeCommentMetaCallback) => {
							if (removeCommentMetaCallback.err) {
								return callback(
									'failed, error => ' + removeCommentMetaCallback.err,
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

	if (!account.is) {
		return callback('a user needs to be logged in to proceed');
	}

	commentHandles
		.commentMetaById(context, commentId)
		.docLoad((commentMeta: ICommentMetasCallback) => {
			if (!commentMeta) {
				return callback('no comment found by this id');
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
						return callback('failed, comment already liked');
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
										'failed, error => ' + setCommentLikeCallback.err,
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
	commentHandles
		.commentMetaById(context, commentId)
		.docLoad((commentMetaCallback: ICommentMetasCallback) => {
			if (!commentMetaCallback) {
				return callback('failed, comment not found');
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
						return callback('failed, like has not been found to be removed');
					}

					if (likeReturnCallback.owner.alias !== owner) {
						return callback('failed, use does not own this like to remove it');
					}

					commentHandles
						.commentsByPostPath(context, postPath)
						.get(commentId)
						.get(TABLE_ENUMS.LIKES)
						.get(owner)
						.put(null, (unlikeCommentCallback) => {
							if (unlikeCommentCallback.err) {
								return callback(
									'failed, error => ' + unlikeCommentCallback.err,
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
