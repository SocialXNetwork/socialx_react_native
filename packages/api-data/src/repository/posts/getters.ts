import * as postHandles from './handles';

import {
	IContext,
	IGunCallback,
	ILikesMetasCallback,
	IMetasCallback,
	TABLE_ENUMS,
	TABLES,
} from '../../types';
import {
	datePathFromDate,
	setToArray,
	setToArrayWithKey,
} from '../../utils/helpers';

import { IPostData, IPostDataCallback } from './types';

export const getPostPathsByUser = (
	context: IContext,
	{ username }: { username: string },
	callback: IGunCallback<string[]>,
) => {
	postHandles
		.postMetasByUsername(context, username)
		.docLoad((postMeta: IMetasCallback) => {
			if (!postMeta) {
				return callback('failed, no posts found');
			}

			const paths = setToArray(postMeta).map(({ postPath }: any) => postPath);

			return callback(null, paths);
		});
};

export const getPostByPath = (
	context: IContext,
	{ postPath }: { postPath: string },
	callback: IGunCallback<IPostData>,
) => {
	postHandles.postByPath(context, postPath).docLoad((postData: IPostData) => {
		return callback(null, postData);
	});
};

export const getPublicPostsByDate = (
	context: IContext,
	{ date }: { date: Date },
	callback: IGunCallback<IPostData[]>,
) => {
	const datePath = datePathFromDate(date);

	postHandles
		.postsByDate(context, datePath)
		.docLoad(async (postsData: IPostDataCallback) => {
			if (!postsData) {
				return callback('failed, no posts found by date');
			}

			const posts: IPostData[] = setToArray(postsData).map((post) => post);

			// some big hook
			const postsWithMeta = posts.map<Promise<IPostData>>(
				// k is the key which is the postId
				async ({ k: postId, ...rest }: any): Promise<IPostData> => {
					const postPath = `${TABLES.POSTS}/${datePath}/${
						TABLE_ENUMS.PUBLIC
					}/${postId}`;
					const promiseHook: Promise<IPostData> = new Promise((resolve) => {
						postHandles
							.likesByPostPath(context, postPath)
							.docLoad((postLikes: ILikesMetasCallback) => {
								if (!postLikes) {
									resolve({
										...rest,
										postPath,
									});
								}
								resolve({
									...rest,
									postPath,
									likes: postLikes,
								});
							});
					});
					return promiseHook;
				},
			);

			const allPostsWithMeta = await Promise.all(postsWithMeta);

			return callback(null, allPostsWithMeta);
		});
};

export const getPostLikes = (
	context: IContext,
	{ postId }: { postId: string },
	callback: IGunCallback<ILikesMetasCallback>,
) => {
	postHandles
		.postMetaById(context, postId)
		.docLoad((postMeta: { postPath: string }) => {
			if (!postMeta) {
				return callback('no post found by this id');
			}
			postHandles
				.likesByPostPath(context, postMeta.postPath)
				.docLoad((likesMeta: ILikesMetasCallback) => {
					if (!likesMeta) {
						return callback('no post found by this path');
					}
					return callback(null, likesMeta);
				});
		});
};

export default {
	getPostByPath,
	getPostLikes,
	getPostPathsByUser,
	getPublicPostsByDate,
};
