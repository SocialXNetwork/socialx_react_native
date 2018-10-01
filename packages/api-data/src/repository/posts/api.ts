import { IContext, ILikesMetasCallback } from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters from './setters';

import {
	ICreatePostInput,
	IPostArrayData,
	IPostReturnData,
	IRemovePostInput,
	IUnlikePostInput,
} from './types';

import { resolveCallback } from '../../utils/helpers';

export default function(context: IContext) {
	const api = {
		createPost: (createPostInput: ICreatePostInput): Promise<null> =>
			new Promise(async (resolve, reject) => {
				try {
					const validatedInput = await schemas.postData.validate(
						createPostInput,
						{
							stripUnknown: true,
						},
					);
					setters.createPost(
						context,
						validatedInput as ICreatePostInput,
						resolveCallback(resolve, reject),
					);
				} catch (e) {
					reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
				}
			}),
		getPostByPath({
			postPath,
		}: {
			postPath: string;
		}): Promise<IPostReturnData> {
			return new Promise(async (resolve, reject) => {
				try {
					const validatedInput = await schemas.getPostByPath.validate(
						{ postPath },
						{
							stripUnknown: true,
						},
					);
					getters.getPostByPath(
						context,
						validatedInput as { postPath: string },
						resolveCallback(resolve, reject),
					);
				} catch (e) {
					reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
				}
			});
		},
		getPostsByUser({
			username,
		}: {
			username: string;
		}): Promise<IPostReturnData[]> {
			return new Promise(async (resolve, reject) => {
				try {
					const validatedInput = await schemas.getPostPathsByUser.validate(
						{ username },
						{
							stripUnknown: true,
						},
					);
					getters.getPostPathsByUser(
						context,
						validatedInput as { username: string },
						async (err, paths) => {
							if (err) {
								reject(err);
							}
							const posts =
								paths &&
								(await Promise.all(
									paths.map((path: string) =>
										this.getPostByPath({ postPath: path }),
									),
								));
							resolve(posts || []);
						},
					);
				} catch (e) {
					reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
				}
			});
		},
		getPublicPostsByDate: ({ date }: { date: Date }): Promise<IPostArrayData> =>
			new Promise(async (resolve, reject) => {
				try {
					const validatedInput = await schemas.getPublicPostsByDate.validate(
						{ date },
						{
							stripUnknown: true,
						},
					);
					getters.getPublicPostsByDate(
						context,
						validatedInput as { date: Date },
						resolveCallback(resolve, reject),
					);
				} catch (e) {
					reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
				}
			}),
		likePost: ({ postId }: { postId: string }): Promise<null> =>
			new Promise(async (resolve, reject) => {
				try {
					const validatedInput = await schemas.likePost.validate(
						{ postId },
						{
							stripUnknown: true,
						},
					);
					setters.likePost(
						context,
						validatedInput as { postId: string },
						resolveCallback(resolve, reject),
					);
				} catch (e) {
					reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
				}
			}),
		removePost: (removePostInput: IRemovePostInput): Promise<null> =>
			new Promise(async (resolve, reject) => {
				try {
					const validatedInput = await schemas.removePost.validate(
						removePostInput,
						{ stripUnknown: true },
					);
					setters.removePost(
						context,
						validatedInput as IRemovePostInput,
						resolveCallback(resolve, reject),
					);
				} catch (e) {
					reject(e);
				}
			}),
		unlikePost: (unlikePostInput: IUnlikePostInput): Promise<null> =>
			new Promise(async (resolve, reject) => {
				try {
					const validatedInput = await schemas.unlikePost.validate(
						unlikePostInput,
						{ stripUnknown: true },
					);
					setters.unlikePost(
						context,
						validatedInput as IUnlikePostInput,
						resolveCallback(resolve, reject),
					);
				} catch (e) {
					reject(e);
				}
			}),
	};
	return api;
}
