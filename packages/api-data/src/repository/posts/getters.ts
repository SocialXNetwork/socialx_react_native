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
import {
	ICommentCallbackData,
	ICommentData,
	ICommentsPostData,
} from '../comments';
import {
	IMedia,
	IPostArrayData,
	IPostCallbackData,
	IPostMetasCallback,
	IPostReturnData,
	IPostsDataCallback,
	IPostUserMetasCallback,
} from './types';

export const getPostPathsByUser = (
	context: IContext,
	{ username }: { username: string },
	callback: IGunCallback<string[]>,
) => {
	postHandles
		.postMetasByUsername(context, username)
		.docLoad((postsMeta: IPostUserMetasCallback) => {
			if (!postsMeta) {
				return callback([]);
			}
			const paths = convertGunSetToArray(postsMeta).map(
				(postMeta: any = {}) => (postMeta ? postMeta.postPath : undefined),
			);

			return callback(null, paths);
		});
};

const convertLikesToArray = (likes: ILikesMetasCallback): ILikesArray =>
	convertGunSetToArrayWithKey(likes).map((like: any) => {
		const { k, ...rest } = like;
		return rest;
	});

const convertMediaToArray = (media: any): IMedia[] =>
	convertGunSetToArray(media).map((m: any) => m);

const convertCommentsToArray = (comments: ICommentsPostData): ICommentData =>
	convertGunSetToArrayWithKey(comments).map(
		({ k, ...postComment }: ICommentCallbackData & { k: string }) => {
			// convert comment likes into an array with key
			const commentLikes = convertLikesToArray(postComment.likes);
			const { likes, ...postRest } = postComment;
			return {
				commentId: k,
				likes: commentLikes,
				...postRest,
			} as any;
		},
	);

export const getPostByPath = (
	context: IContext,
	{ postPath }: { postPath: string },
	callback: IGunCallback<IPostReturnData>,
) => {
	postHandles
		.postByPath(context, postPath)
		.docLoad((postData: IPostCallbackData) => {
			if (!postData) {
				return callback(
					new ApiError('failed, no post found', {
						initialRequestBody: { postPath },
					}),
				);
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
	postHandles
		.postMetaById(context, postId)
		.docLoad((postMeta: IPostMetasCallback) => {
			if (!postMeta) {
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

export const getPublicPostsByDate = (
	context: IContext,
	{ date }: { date: Date },
	callback: IGunCallback<IPostArrayData>,
) => {
	const datePath = datePathFromDate(date);

	postHandles
		.postsByDate(context, datePath)
		.docLoad((postsData: IPostsDataCallback) => {
			if (!postsData) {
				return callback(null, []);
			}

			const allPosts: any = Object.entries(postsData).map(([key, value]) => {
				return {
					...value,
					postId: key,
				};
			});

			const posts = allPosts.map((post: IPostCallbackData & { k: string }) => {
				// convert likes into an array with keys
				const postLikes = convertLikesToArray(post.likes);
				// convert comments and their likes into an array with keys
				const postComments = convertCommentsToArray(post.comments);
				// convert media to an array
				const mediaReturn = convertMediaToArray(post.media) || [];

				const { likes, comments, media, ...postRest } = post;
				return {
					...postRest,
					likes: postLikes,
					comments: postComments,
					media: mediaReturn,
				};
			});

			return callback(null, posts);
		});
};

const recursiveSearchForPosts = (
	context: IContext,
	{ startTimestamp, daysBack }: { startTimestamp: number; daysBack: number },
	callback: IGunCallback<IPostArrayData>,
) => {
	if (daysBack > 30) {
		return callback(null, []);
	}
	const nextDate = moment(startTimestamp)
		.subtract(daysBack, 'days')
		.toDate();

	getPublicPostsByDate(context, { date: nextDate }, (err, posts) => {
		if (err) {
			return callback(err);
		}
		if (posts && posts.length) {
			return callback(null, posts);
		}
		return recursiveSearchForPosts(
			context,
			{ startTimestamp, daysBack: daysBack + 1 },
			callback,
		);
	});
};

export const getMostRecentPosts = (
	context: IContext,
	{ timestamp }: { timestamp: number },
	callback: IGunCallback<IPostArrayData>,
) => {
	return recursiveSearchForPosts(
		context,
		{ startTimestamp: timestamp, daysBack: 1 },
		callback,
	);
};

export default {
	getMostRecentPosts,
	getPostByPath,
	getPostById,
	getPostPathsByUser,
	getPublicPostsByDate,
};
