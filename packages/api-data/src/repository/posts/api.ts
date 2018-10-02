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
		createPost: async (createPostInput: ICreatePostInput): Promise<null> => {
			let validatedInput: any;
			try {
				validatedInput = await schemas.postData.validate(createPostInput, {
					stripUnknown: true,
				});
			} catch (e) {
				throw typeof e.errors === 'string' ? e.errors : e.errors.join();
			}

			return new Promise<null>((resolve, reject) => {
				setters.createPost(
					context,
					validatedInput as ICreatePostInput,
					resolveCallback(resolve, reject),
				);
			});
		},
		async getPostByPath({
			postPath,
		}: {
			postPath: string;
		}): Promise<IPostReturnData> {
			let validatedInput: any;
			try {
				validatedInput = await schemas.getPostByPath.validate(postPath, {
					stripUnknown: true,
				});
			} catch (e) {
				throw typeof e.errors === 'string' ? e.errors : e.errors.join();
			}
			return new Promise<IPostReturnData>(async (resolve, reject) => {
				getters.getPostByPath(
					context,
					validatedInput as { postPath: string },
					resolveCallback(resolve, reject),
				);
			});
		},
		async getPostsByUser({
			username,
		}: {
			username: string;
		}): Promise<IPostReturnData[]> {
			let validatedInput: any;
			try {
				// TODO: create a new schema validator for this
				validatedInput = await schemas.getPostPathsByUser.validate(
					{ username },
					{
						stripUnknown: true,
					},
				);
			} catch (e) {
				throw typeof e.errors === 'string' ? e.errors : e.errors.join();
			}

			// ! keep an eye on this
			return new Promise<IPostReturnData[]>((resolve, reject) => {
				getters.getPostPathsByUser(
					context,
					validatedInput as { username: string },
					(err, paths) => {
						if (err) {
							reject(err);
						}
						const posts =
							paths &&
							Promise.all(
								paths.map((path: string) =>
									this.getPostByPath({ postPath: path }),
								),
							);
						resolve(posts);
					},
				);
			});
		},
		getPublicPostsByDate: async ({
			date,
		}: {
			date: Date;
		}): Promise<IPostArrayData> => {
			let validatedInput: any;
			try {
				validatedInput = await schemas.getPublicPostsByDate.validate(
					{ date },
					{
						stripUnknown: true,
					},
				);
			} catch (e) {
				throw typeof e.errors === 'string' ? e.errors : e.errors.join();
			}

			return new Promise<IPostArrayData>((resolve, reject) => {
				getters.getPublicPostsByDate(
					context,
					validatedInput as { date: Date },
					resolveCallback(resolve, reject),
				);
			});
		},
		likePost: async ({ postId }: { postId: string }): Promise<null> => {
			let validatedInput: any;
			try {
				validatedInput = await schemas.likePost.validate(
					{ postId },
					{
						stripUnknown: true,
					},
				);
			} catch (e) {
				throw typeof e.errors === 'string' ? e.errors : e.errors.join();
			}

			return new Promise<null>((resolve, reject) => {
				setters.likePost(
					context,
					validatedInput as { postId: string },
					resolveCallback(resolve, reject),
				);
			});
		},
		removePost: async (removePostInput: IRemovePostInput): Promise<null> => {
			let validatedInput: any;
			try {
				validatedInput = await schemas.removePost.validate(removePostInput, {
					stripUnknown: true,
				});
			} catch (e) {
				throw typeof e.errors === 'string' ? e.errors : e.errors.join();
			}

			return new Promise<null>((resolve, reject) => {
				setters.removePost(
					context,
					validatedInput as IRemovePostInput,
					resolveCallback(resolve, reject),
				);
			});
		},
		unlikePost: async (unlikePostInput: IUnlikePostInput): Promise<null> => {
			let validatedInput: any;
			try {
				validatedInput = await schemas.unlikePost.validate(unlikePostInput, {
					stripUnknown: true,
				});
			} catch (e) {
				throw typeof e.errors === 'string' ? e.errors : e.errors.join();
			}

			return new Promise<null>((resolve, reject) => {
				setters.unlikePost(
					context,
					validatedInput as IUnlikePostInput,
					resolveCallback(resolve, reject),
				);
			});
		},
	};
	return api;
}
