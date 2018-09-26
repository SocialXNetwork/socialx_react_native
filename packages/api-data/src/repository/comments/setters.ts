import {
	ICommentMetasCallback,
	IContext,
	ICreateCommentInput,
	IGunCallback,
	IPostMetasCallback,
	TABLES,
} from '../../types';
import { getContextMeta } from '../../utils/helpers';
import * as postHandles from '../posts/handles';
import * as commentHandles from './handles';

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
				(flags) => {
					if (flags.err) {
						return callback('failed, error => ' + flags.err);
					}

					const commentId = flags['#'];

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

export default {
	createComment,
	likeComment,
};
