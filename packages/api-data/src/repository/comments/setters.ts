import { IContext, IGunCallback, TABLES } from '../../types';
import { getContextMeta } from '../../utils/helpers';
import * as postHandles from '../posts/handles';
import * as commentHandles from './handles';

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

			commentHandles.commentsByPostPath(context, postPath).set(
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

					const commentId = commentCallback['#'];

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

// todo: properly fix this
// to change - {commentId} to {postPath, commentId} instead of getting metas
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
			// who ever wrote this is bananas
			const commentPath = `${TABLES.POSTS}/${commentMeta.postPath}/${
				TABLES.COMMENTS
			}/${commentId}`;

			commentHandles.likesByCommentPath(context, commentPath).set(
				{
					owner: {
						alias: owner,
						pub: ownerPub,
					},
					timestamp,
				},
				(setCommentLikeCallback) => {
					if (setCommentLikeCallback.err) {
						return callback('failed, error => ' + setCommentLikeCallback.err);
					}

					return callback(null);
				},
			);
		});
};

export const removeComment = (
	context: IContext,
	{ postPath, commentId }: IRemoveCommentInput,
	callback: IGunCallback<null>,
) => {
	commentHandles
		.commentsByPostPath(context, postPath)
		.get(commentId)
		.put(null, (removePostCallback) => {
			if (removePostCallback.err) {
				return callback('failed, error => ' + removePostCallback.err);
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
};

export const unlikeComment = (
	context: IContext,
	{ postPath, commentId }: IUnlikeCommentInput,
	callback: IGunCallback<null>,
) => {
	commentHandles
		.likesByCommentPath(context, postPath)
		.get(commentId)
		.put(null, (unlikeCommentCallback) => {
			if (unlikeCommentCallback.err) {
				return callback('failed, error => ' + unlikeCommentCallback.err);
			}
			return callback(null);
		});
};

export default {
	createComment,
	likeComment,
	removeComment,
	unlikeComment,
};
