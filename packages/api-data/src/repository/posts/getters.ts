import * as postHandles from './handles';

import {
	IContext,
	IGunCallback,
	ILikesArray,
	ILikesMetasCallback,
	IMetasCallback,
} from '../../types';
import { ApiError } from '../../utils/errors';
import {
	convertGunSetToArray,
	convertGunSetToArrayWithKey,
	datePathFromDate,
} from '../../utils/helpers';

import moment from 'moment';
import { ICommentCallbackData, ICommentData, ICommentsPostData } from '../comments';
import {
	IMedia,
	IPostArrayData,
	IPostCallbackData,
	IPostMetasCallback,
	IPostReturnData,
	IPostsDataCallback,
	IPostUserMetasCallback,
} from './types';

const noop = () => {
	///
};

export const getPostPathsByUser = (
	context: IContext,
	{ username }: { username: string },
	callback: IGunCallback<string[]>,
) => {
	postHandles.postMetasByUsername(context, username).docLoad(
		(postsMeta: IPostUserMetasCallback) => {
			if (!Object.keys(postsMeta).length) {
				return callback([]);
			}
			const paths = convertGunSetToArray(postsMeta).map(
				(postMeta: any = {}) => (postMeta ? postMeta.postPath : undefined),
			);
			return callback(null, paths);
		},
		{ wait: 800, timeout: 1000 },
	);
};

const convertLikesToArray = (likes: ILikesMetasCallback): ILikesArray =>
	convertGunSetToArrayWithKey(likes).reduce((likesAgg: any[], like: any) => {
		const { k, ...rest } = like;
		if (!like['#'] && rest.owner) {
			likesAgg = [...likesAgg, rest];
		}
		return likesAgg;
	}, []);

const convertMediaToArray = (media: any): IMedia[] =>
	convertGunSetToArray(media).reduce((mediaAgg: any[], m: any) => {
		const { ...rest } = m;
		if (!m['#'] && Object.keys(rest).length > 0) {
			mediaAgg = [...mediaAgg, m];
		}
		return mediaAgg;
	}, []);

const convertCommentsToArray = (comments: any): ICommentData[] =>
	convertGunSetToArrayWithKey(comments).reduce(
		(commentsAgg: any[], { k, ...postComment }: any & { k: string }) => {
			// convert comment likes into an array with key
			const commentLikes = convertLikesToArray(postComment.likes);
			const { likes, ...postRest } = postComment;
			if (!postComment['#'] && postComment.owner) {
				commentsAgg = [
					...commentsAgg,
					{
						commentId: k,
						likes: commentLikes,
						...postRest,
					},
				];
			}
			return commentsAgg;
		},
		[],
	);

export const getPostByPath = (
	context: IContext,
	{ postPath }: { postPath: string },
	callback: IGunCallback<IPostReturnData>,
) => {
	postHandles.postByPath(context, postPath).docLoad((postData: IPostCallbackData) => {
		if (!Object.keys(postData).length) {
			return callback(
				new ApiError('failed, no post found', {
					initialRequestBody: { postPath },
				}),
			);
		}
		if (!postData.owner) {
			return callback(null, { deleted: true } as any);
		}
		// const keys = Object.keys()
		const { likes, comments, media, ...restPost } = postData;
		// convert likes into an array with keys
		const postLikes = convertLikesToArray(likes);
		// convert comments and their likes into an array with keys
		const postComments: any = convertCommentsToArray(comments);
		// convert media to an array
		const mediaReturn = convertMediaToArray(media) || [];

		const post: IPostReturnData = {
			postId: postPath.split('.').reverse()[0],
			likes: postLikes,
			comments: postComments,
			media: mediaReturn,
			...restPost,
		};
		return callback(null, post);
	});
};

export const getPostById = (
	context: IContext,
	{ postId }: { postId: string },
	callback: IGunCallback<IPostReturnData>,
) => {
	postHandles.postMetaById(context, postId).docLoad((postMeta: IPostMetasCallback) => {
		if (!Object.keys(postMeta).length) {
			return callback(
				new ApiError('failed, no post was found with this id', {
					initialRequestBody: { postId },
				}),
			);
		}
		const { postPath } = postMeta;

		getPostByPath(context, { postPath }, callback);
	});
};

const getAllPostRelevantData = (
	context: IContext,
	datePath: string,
	{ timeout, wait, tries }: { timeout: number; wait: number; tries: number },
	callback: IGunCallback<IPostArrayData>,
) =>
	postHandles.postsByDate(context, datePath).docLoad(
		(postsData: IPostsDataCallback) => {
			console.log('getAllPostRelevantData', { timeout, wait, tries });
			if (!Object.keys(postsData).length) {
				return callback(null, []);
			}

			const allPosts: any = Object.entries(postsData).map(([key, value]) => {
				return {
					...value,
					postId: key,
				};
			});

			let shouldWaitAndTryAgain = false;
			const posts = allPosts
				.map((post: IPostCallbackData & { k: string }) => {
					// convert likes into an array with keys
					const postLikes = convertLikesToArray(post.likes);
					// convert comments and their likes into an array with keys
					const postComments: ICommentData[] = convertCommentsToArray(post.comments);
					// Convert media to an array
					const mediaReturn = convertMediaToArray(post.media) || [];

					// If we don't get data proper data i.e. a hashtag key is present,
					// stop current operation, append 100 to both timeout and wait
					// Try again the current operation
					[post.likes, post.comments, post.media].forEach((propArray: any = []) => {
						if (propArray && propArray.length) {
							propArray.forEach((obj: any) => {
								if (obj && typeof obj === 'object' && Object.keys(obj).includes('#')) {
									shouldWaitAndTryAgain = true;
								}
							});
						}
					});

					const { likes, comments, media, ...postRest } = post;
					if (postRest.owner) {
						return {
							...postRest,
							likes: postLikes,
							comments: postComments,
							media: mediaReturn,
						};
					} else {
						return null;
					}
				})
				.filter((post: any) => post !== null);

			if (!shouldWaitAndTryAgain) {
				return callback(null, posts);
			}

			getAllPostRelevantData(
				context,
				datePath,
				{ timeout: timeout + 100, wait: wait + 100, tries: tries + 1 },
				callback,
			);
		},
		{ timeout, wait },
	);

export const getPublicPostsByDate = (
	context: IContext,
	{ date }: { date: Date },
	callback: IGunCallback<IPostArrayData>,
) => {
	const datePath = datePathFromDate(date);
	getAllPostRelevantData(context, datePath, { timeout: 700, wait: 300, tries: 0 }, callback);
};

const recursiveSearchForPosts = (
	context: IContext,
	{ startTimestamp, daysBack }: { startTimestamp: number; daysBack: number },
	callback: IGunCallback<IPostArrayData>,
) => {
	if (daysBack > 5) {
		return callback(null, []);
	}
	const nextDate = moment(startTimestamp)
		.subtract(daysBack, 'd')
		.toDate();

	getPublicPostsByDate(context, { date: nextDate }, (err, posts) => {
		if (err) {
			return callback(err);
		}
		if (posts && posts.length) {
			return callback(null, posts);
		}
		return recursiveSearchForPosts(context, { startTimestamp, daysBack: daysBack + 1 }, callback);
	});
};

export const getMostRecentPosts = (
	context: IContext,
	{ timestamp }: { timestamp: number },
	callback: IGunCallback<IPostArrayData>,
) => {
	return recursiveSearchForPosts(context, { startTimestamp: timestamp, daysBack: 0 }, callback);
};

export default {
	getMostRecentPosts,
	getPostByPath,
	getPostById,
	getPostPathsByUser,
	getPublicPostsByDate,
};
