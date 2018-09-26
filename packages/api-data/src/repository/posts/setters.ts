import {
	IContext,
	ICreatePostInput,
	IGunCallback,
	IGunSetterCallback,
	IPostMetasCallback,
	TABLE_ENUMS,
	TABLES,
} from '../../types';
import { datePathFromDate, getContextMeta } from '../../utils/helpers';
import * as postHandles from './handles';

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

	const publicPath = `${datePath}/${TABLE_ENUMS.PUBLIC}/`;
	const privatePath = `${datePath}/${TABLE_ENUMS.PRIVATE}/${owner}`;

	const { privatePost } = createPostInput;

	const path = privatePost ? privatePath : publicPath;

	const method = privatePost ? 'encrypt' : 'set';

	// TODO: can we extract this as an external handle?
	gun
		.get(TABLES.POSTS)
		.get(path)
		[method](
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
				const postId = setPostCallback['#'];
				const postPath = `${path}/${postId}`;

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

export default { createPost, likePost };
