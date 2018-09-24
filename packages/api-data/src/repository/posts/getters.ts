import * as postHandles from './handles';
import {IPostData} from './setters';

import {datePathFromDate, setToArray} from '../../utils/helpers';

export const getPostPathsByUser = (
	context: IContext,
	{username}: {username: string},
	callback: IGunCallback<string[]>,
) => {
	postHandles.postMetasByUsername(context, username).docLoad((postMeta: IMetasCallback) => {
		if (!postMeta) {
			return callback('failed, no posts found');
		}

		const paths = setToArray(postMeta).map(({postPath}: any) => postPath);

		return callback(null, paths);
	});
};

export const getPostByPath = (context: IContext, {postPath}: {postPath: string}, callback: IGunCallback<IPostData>) => {
	postHandles.postByPath(context, postPath).docLoad((postData: IPostData) => {
		return callback(null, postData);
	});
};

export const getPublicPostsByDate = (context: IContext, {date}: {date: Date}, callback: IGunCallback<IPostData>) => {
	const datePath = datePathFromDate(date);

	postHandles.postsByDate(context, datePath).docLoad((postData: IPostData) => {
		if (!postData) {
			return callback('failed, no posts found by date');
		}

		return callback(null, postData);
	});
};

export const getPostLikes = (
	context: IContext,
	{postId}: {postId: string},
	callback: IGunCallback<ILikesMetasCallback>,
) => {
	postHandles.postMetaById(context, postId).docLoad((postMeta: {postPath: string}) => {
		if (!postMeta) {
			return callback('no post found by this id');
		}
		postHandles.likesByPostPath(context, postMeta.postPath).docLoad((likesMeta: ILikesMetasCallback) => {
			if (!likesMeta) {
				return callback('no post found by this path');
			}
			return callback(null, likesMeta);
		});
	});
};
