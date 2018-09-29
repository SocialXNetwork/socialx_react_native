import * as postHandles from '../posts/handles';
import * as commentHandles from './handles';

import {
	IContext,
	IGunCallback,
	ILikeData,
	ILikesMetasCallback,
	TABLES,
} from '../../types';
import { setToArray, setToArrayWithKey } from '../../utils/helpers';

import { IPostMetasCallback } from '../posts';

import {
	ICommentDataCallback,
	ICommentMetasCallback,
	ICommentsData,
} from './types';

export const getPostComments = (
	context: IContext,
	{ postId }: { postId: string },
	callback: IGunCallback<ICommentDataCallback[]>,
) => {
	postHandles
		.postMetaById(context, postId)
		.docLoad((postMeta: IPostMetasCallback) => {
			if (!postMeta) {
				return callback('no post found with this id');
			}
			commentHandles
				.commentsByPostPath(context, postMeta.postPath)
				.docLoad(async (commentsData: ICommentsData) => {
					if (!commentsData) {
						return callback('no posts found by this path');
					}

					const comments = setToArray(commentsData).map(
						({ text, timestamp, owner, commentId }): ICommentDataCallback => ({
							owner,
							text,
							timestamp,
							commentId,
							// we set it to the default
							likes: null,
						}),
					);

					const commentsReturnData: Array<
						Promise<ICommentDataCallback>
					> = comments.map<Promise<ICommentDataCallback>>(
						async (comment): Promise<ICommentDataCallback> => {
							const { commentId } = comment;
							const { postPath } = postMeta;
							// get the comment path
							const commentPath = `${postPath}/${TABLES.COMMENTS}/${commentId}`;
							// since our docLoad is para sync, we have to convert it to promise to get the data
							// into this parent function callback instantly
							const promiseHook = new Promise((resolve) => {
								// get all the comment likes here
								commentHandles
									.likesByCommentPath(context, commentPath)
									.docLoad((commentLikesData: ILikesMetasCallback) => {
										if (!commentLikesData) {
											resolve(comment);
										}
										resolve({ ...comment, likes: commentLikesData });
									});
							});
							return promiseHook as Promise<ICommentDataCallback>;
						},
					);
					const allCommentsReturnData = await Promise.all(commentsReturnData);
					return callback(null, allCommentsReturnData);
				});
		});
};

export const getCommentLikes = (
	context: IContext,
	{ commentId }: { commentId: string },
	callback: IGunCallback<ILikeData[]>,
) => {
	commentHandles
		.commentMetaById(context, commentId)
		.docLoad((commentMeta: ICommentMetasCallback) => {
			if (!commentMeta) {
				return callback('no comment by this id was found');
			}

			const commentPath = `${TABLES.POSTS}/${commentMeta.postPath}/${
				TABLES.COMMENTS
			}/${commentId}`;
			commentHandles
				.likesByCommentPath(context, commentPath)
				.docLoad((likesMeta: ILikesMetasCallback) => {
					if (!likesMeta) {
						return callback('no likes found by this comment');
					}

					const likes: ILikeData[] = setToArrayWithKey(likesMeta).map(
						({ owner, timestamp, k }: ILikesMetasCallback) => ({
							owner,
							timestamp,
							likeId: k,
						}),
					);
					return callback(null, likes);
				});
		});
};

export default {
	getCommentLikes,
	getPostComments,
};
