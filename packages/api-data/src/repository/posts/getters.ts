import * as postHandles from './handles';

import {
	IContext,
	IGunCallback,
	ILikesArray,
	ILikesMetasCallback,
} from '../../types';
import {
	convertGunSetToArray,
	convertGunSetToArrayWithKey,
	datePathFromDate,
} from '../../utils/helpers';

import {
	ICommentCallbackData,
	ICommentData,
	ICommentsPostData,
} from '../comments';
import {
	IPostArrayData,
	IPostCallbackData,
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
		.docLoad((postMeta: IPostUserMetasCallback) => {
			if (!postMeta) {
				return callback('failed, no posts found');
			}

			const paths = convertGunSetToArray(postMeta).map(
				({ postPath }: any) => postPath,
			);

			return callback(null, paths);
		});
};

const convertLikesToArray = (likes: ILikesMetasCallback): ILikesArray =>
	convertGunSetToArrayWithKey(likes).map(({ k, postLike }: any) => ({
		likeId: k,
		...postLike,
	}));

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
			const { likes, comments, ...restPost } = postData;
			// convert likes into an array with keys
			const postLikes = convertLikesToArray(likes);
			// convert comments and their likes into an array with keys
			const postComments: any = convertCommentsToArray(comments);

			const post: IPostReturnData = {
				postId: postPath.split('/').reverse()[0],
				likes: postLikes,
				comments: postComments,
				...restPost,
			};
			return callback(null, post);
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
		.docLoad(async (postsData: IPostsDataCallback) => {
			if (!postsData) {
				return callback('failed, no posts found by date');
			}

			const posts = convertGunSetToArrayWithKey(postsData).map(
				({ k: postId, ...post }: IPostCallbackData & { k: string }) => {
					// convert likes into an array with keys
					const postLikes = convertLikesToArray(post.likes);
					// convert comments and their likes into an array with keys
					const postComments = convertCommentsToArray(post.comments);
					const { likes, comments, ...postRest } = post;
					return {
						postId,
						likes: postLikes,
						comments: postComments,
						...postRest,
					};
				},
			);

			return callback(null, posts);
		});
};

export default {
	getPostByPath,
	getPostPathsByUser,
	getPublicPostsByDate,
};
