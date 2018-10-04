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

import { ValidationError } from '../../utils/errors';
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
				throw new ValidationError(
					typeof e.errors === 'string' ? e.errors : e.errors.join(),
					{ validationInput: createPostInput },
				);
			}

			return new Promise<null>((resolve, reject) => {
				setters.createPost(
					context,
					validatedInput as ICreatePostInput,
					resolveCallback(resolve, reject),
				);
			});
		},
		async getPostByPath(getPostByPathInput: {
			postPath: string;
		}): Promise<IPostReturnData> {
			let validatedInput: any;
			try {
				validatedInput = await schemas.getPostByPath.validate(
					getPostByPathInput,
					{
						stripUnknown: true,
					},
				);
			} catch (e) {
				throw new ValidationError(
					typeof e.errors === 'string' ? e.errors : e.errors.join(),
					{ validationInput: getPostByPathInput },
				);
			}
			return new Promise<IPostReturnData>(async (resolve, reject) => {
				getters.getPostByPath(
					context,
					validatedInput as { postPath: string },
					resolveCallback(resolve, reject),
				);
			});
		},
		async getPostsByUser(getPostByUserInput: {
			username: string;
		}): Promise<IPostReturnData[]> {
			let validatedInput: any;
			try {
				// TODO: create a new schema validator for this
				validatedInput = await schemas.getPostPathsByUser.validate(
					getPostByUserInput,
					{
						stripUnknown: true,
					},
				);
			} catch (e) {
				throw new ValidationError(
					typeof e.errors === 'string' ? e.errors : e.errors.join(),
					{ validationInput: getPostByUserInput },
				);
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
								paths
									.filter((v) => v)
									.map((path: string) =>
										this.getPostByPath({ postPath: path }),
									),
							);
						resolve(posts);
					},
				);
			});
		},
		getPublicPostsByDate: async (getPublicPostsByDateInput: {
			date: Date;
		}): Promise<IPostArrayData> => {
			let validatedInput: any;
			try {
				validatedInput = await schemas.getPublicPostsByDate.validate(
					getPublicPostsByDateInput,
					{
						stripUnknown: true,
					},
				);
			} catch (e) {
				throw new ValidationError(
					typeof e.errors === 'string' ? e.errors : e.errors.join(),
					{ validationInput: getPublicPostsByDateInput },
				);
			}

			return new Promise<IPostArrayData>((resolve, reject) => {
				getters.getPublicPostsByDate(
					context,
					validatedInput as { date: Date },
					resolveCallback(resolve, reject),
				);
			});
		},
		likePost: async (likePostInput: { postId: string }): Promise<null> => {
			let validatedInput: any;
			try {
				validatedInput = await schemas.likePost.validate(likePostInput, {
					stripUnknown: true,
				});
			} catch (e) {
				throw new ValidationError(
					typeof e.errors === 'string' ? e.errors : e.errors.join(),
					{ validationInput: likePostInput },
				);
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
				throw new ValidationError(
					typeof e.errors === 'string' ? e.errors : e.errors.join(),
					{ validationInput: removePostInput },
				);
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
				throw new ValidationError(
					typeof e.errors === 'string' ? e.errors : e.errors.join(),
					{ validationInput: unlikePostInput },
				);
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
