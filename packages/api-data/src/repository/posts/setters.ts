import uuidv4 from 'uuid/v4';
import {
	IContext,
	IGunCallback,
	IGunSetterCallback,
	TABLE_ENUMS,
	TABLES,
} from '../../types';
import { datePathFromDate, getContextMeta } from '../../utils/helpers';
import * as postHandles from './handles';

import {
	ICreatePostInput,
	IPostMetasCallback,
	IRemovePostInput,
	IUnlikePostInput,
} from './types';

export const createPost = (
	context: IContext,
	createPostInput: ICreatePostInput,
	callback: IGunCallback<null>,
) => {
	const { account, gun } = context;
	if (!account.is) {
		return callback('a user needs to be logged in to proceed');
	}

	const { owner, ownerPub, timestamp } = getContextMeta(context);

	const datePath = datePathFromDate(new Date(timestamp));

	const publicPath = `${datePath}.${TABLE_ENUMS.PUBLIC}`;
	const privatePath = `${datePath}.${TABLE_ENUMS.PRIVATE}.${owner}`;

	const { privatePost } = createPostInput;

	const postId = uuidv4();
	const postPath = (privatePost ? privatePath : publicPath) + `.${postId}`;

	// TODO: can we extract this as an external handle?
	gun
		.get(TABLES.POSTS)
		.path(postPath)
		.put(
			{
				...createPostInput,
				owner: {
					alias: owner,
					pub: ownerPub,
				},
				timestamp,
			},
			(setPostCallback: IGunSetterCallback) => {
				if (setPostCallback.err) {
					return callback('failed, error => ' + setPostCallback.err);
				}
				postHandles.postMetasByCurrentUser(context).set(
					{
						postPath,
						timestamp,
						owner: {
							alias: owner,
							pub: ownerPub,
						},
					},
					(setPostMetaCallback) => {
						if (setPostMetaCallback.err) {
							return callback('failed, error => ' + setPostMetaCallback.err);
						}

						postHandles
							.postMetaById(context, postId)
							.put({ postPath, privatePost, owner }, (putPostMetaCallback) => {
								if (putPostMetaCallback.err) {
									return callback(
										'failed, error => ' + putPostMetaCallback.err,
									);
								}
								return callback(null);
							});
					},
				);
			},
		);
};

export const likePost = (
	context: IContext,
	{ postId }: { postId: string },
	callback: IGunCallback<null>,
) => {
	const { owner, ownerPub, timestamp } = getContextMeta(context);

	postHandles
		.postMetaById(context, postId)
		.docLoad((postMeta: IPostMetasCallback) => {
			if (!postMeta) {
				return callback('no post found by this id');
			}

			postHandles.postLikesByCurrentUser(context, postMeta.postPath).put(
				{
					timestamp,
					owner: {
						alias: owner,
						pub: ownerPub,
					},
				},
				(putPostLikeCallback) => {
					if (putPostLikeCallback.err) {
						return callback('failed, error => ' + putPostLikeCallback.err);
					}

					return callback(null);
				},
			);
		});
};

export const removePost = (
	context: IContext,
	{ postMetaId, postPath }: IRemovePostInput,
	callback: IGunCallback<null>,
) => {
	postHandles
		.postMetaById(context, postMetaId)
		.put(null, (deleteMetaCallback) => {
			if (deleteMetaCallback.err) {
				return callback('failed, error => ' + deleteMetaCallback.err);
			}
			postHandles
				.postByPath(context, postPath)
				.put(null, (removePostCallback) => {
					if (removePostCallback.err) {
						return callback('failed, error => ' + removePostCallback.err);
					}
					return callback(null);
				});
		});
};

export const unlikePost = (
	context: IContext,
	{ postPath }: IUnlikePostInput,
	callback: IGunCallback<null>,
) => {
	postHandles
		.postLikesByCurrentUser(context, postPath)
		.put(null, (unlikePostCallback) => {
			if (unlikePostCallback.err) {
				return callback('couldnt unlike post => ' + unlikePostCallback.err);
			}
			return callback(null);
		});
};

export default { createPost, likePost, removePost, unlikePost };
