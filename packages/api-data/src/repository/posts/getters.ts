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

const noop = () => {
	///
};

export const getPostPathsByUser = (
	context: IContext,
	{ username }: { username: string },
	callback: IGunCallback<string[]>,
) => {
	postHandles
		.postMetasByUsername(context, username)
		.docLoad((postsMeta: IPostUserMetasCallback) => {
			if (!Object.keys(postsMeta).length) {
				return callback([]);
			}
			const paths = convertGunSetToArray(postsMeta).map(
				(postMeta: any = {}) => (postMeta ? postMeta.postPath : undefined),
			);
			return callback(null, paths);
		});
};

const convertLikesToArray = (likes: ILikesMetasCallback): ILikesArray =>
	convertGunSetToArrayWithKey(likes).reduce((likesAgg: any[], like: any) => {
		const { k, ...rest } = like;
		if (!like['#']) {
			likesAgg = [...likesAgg, rest];
		}
		return likesAgg;
	}, []);

const convertMediaToArray = (media: any): IMedia[] =>
	convertGunSetToArray(media).reduce((mediaAgg: any[], m: any) => {
		if (!m['#']) {
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
			if (!postComment['#']) {
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
	postHandles
		.postByPath(context, postPath)
		.docLoad((postData: IPostCallbackData) => {
			if (!Object.keys(postData).length) {
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

export const getPublicPostsByDate = (
	context: IContext,
	{ date }: { date: Date },
	callback: IGunCallback<IPostArrayData>,
) => {
	const datePath = datePathFromDate(date);

	postHandles.postsByDate(context, datePath).docLoad(
		(postsData: IPostsDataCallback) => {
			if (!Object.keys(postsData).length) {
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
				const postComments: ICommentData[] = convertCommentsToArray(
					post.comments,
				);
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
		},
		{ timeout: 700, wait: 300 },
	);
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
		{ startTimestamp: timestamp, daysBack: 0 },
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
