import { IContext } from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters from './setters';
import {
	ICreatePostInput,
	IGetPostByIdInput,
	ILoadMorePostsInput,
	IPostArrayData,
	IPostReturnData,
	IRemovePostInput,
	IUnlikePostInput,
} from './types';

import { ValidationError } from '../../utils/errors';
import { resolveCallback } from '../../utils/helpers';

export default function(context: IContext) {
	const api = {
		createPost: async (createPostInput: ICreatePostInput): Promise<string> => {
			let validatedInput: any;
			try {
				validatedInput = await schemas.postData.validate(createPostInput, {
					stripUnknown: true,
				});
			} catch (e) {
				throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
					validationInput: createPostInput,
				});
			}

			return new Promise<string>((resolve, reject) => {
				setters.createPost(context, validatedInput as ICreatePostInput, (err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				});
			});
		},
		async getPostById(getPostById: IGetPostByIdInput): Promise<IPostReturnData> {
			let validatedInput: any;
			try {
				validatedInput = await schemas.postById.validate(getPostById, {
					stripUnknown: true,
				});
			} catch (e) {
				throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
					validationInput: validatedInput,
				});
			}

			return new Promise<IPostReturnData>((resolve, reject) => {
				getters.getPostById(
					context,
					validatedInput as IGetPostByIdInput,
					resolveCallback(resolve, reject),
				);
			});
		},
		async getPostByPath(getPostByPathInput: { postPath: string }): Promise<IPostReturnData> {
			let validatedInput: any;
			try {
				validatedInput = await schemas.getPostByPath.validate(getPostByPathInput, {
					stripUnknown: true,
				});
			} catch (e) {
				throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
					validationInput: getPostByPathInput,
				});
			}
			return new Promise<IPostReturnData>(async (resolve, reject) => {
				getters.getPostByPath(
					context,
					validatedInput as { postPath: string },
					resolveCallback(resolve, reject),
				);
			});
		},
		async fastGetPostByPath(getPostByPathInput: { postPath: string }): Promise<IPostReturnData> {
			let validatedInput: any;
			try {
				validatedInput = await schemas.getPostByPath.validate(getPostByPathInput, {
					stripUnknown: true,
				});
			} catch (e) {
				throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
					validationInput: getPostByPathInput,
				});
			}
			return new Promise<IPostReturnData>(async (resolve, reject) => {
				getters.fastGetPostByPath(
					context,
					validatedInput as { postPath: string },
					resolveCallback(resolve, reject),
				);
			});
		},
		async getPostsByUser(getPostByUserInput: { username: string }): Promise<IPostReturnData[]> {
			let validatedInput: any;
			try {
				// TODO: create a new schema validator for this
				validatedInput = await schemas.getPostPathsByUser.validate(getPostByUserInput, {
					stripUnknown: true,
				});
			} catch (e) {
				throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
					validationInput: getPostByUserInput,
				});
			}

			// ! keep an eye on this
			return new Promise<IPostReturnData[]>((resolve, reject) => {
				getters.getPostPathsByUser(
					context,
					validatedInput as { username: string },
					async (err, paths) => {
						if (err) {
							resolve([]);
						}
						if (!paths) {
							resolve([]);
						}
						try {
							const posts = await Promise.all(
								(paths || []).map((path: string) => this.getPostByPath({ postPath: path })),
							);
							resolve(posts.filter((post) => !!post));
						} catch (e) {
							// ! BUG: sometimes docLoad doesnt load the document correctly and this is returned..
							resolve([]);
						}
					},
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
				throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
					validationInput: likePostInput,
				});
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
				throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
					validationInput: removePostInput,
				});
			}

			return new Promise<null>((resolve, reject) => {
				setters.removePost(
					context,
					validatedInput as IRemovePostInput,
					resolveCallback(resolve, reject),
				);
			});
		},
		async loadMorePosts(
			loadMorePostsInput: ILoadMorePostsInput,
		): Promise<{
			posts: IPostArrayData;
			nextToken: string;
			canLoadMore: boolean;
		}> {
			return new Promise<{
				posts: IPostArrayData;
				nextToken: string;
				canLoadMore: boolean;
			}>((resolve, reject) => {
				getters.getPostsTimestampIds(context, loadMorePostsInput, async (err, res) => {
					try {
						if (res && res.postIds.length > 0) {
							const { nextToken, postIds, canLoadMore } = res;

							const posts = await Promise.all(
								postIds.map((postId) => this.getPostById({ postId })),
							);
							resolve({ posts, nextToken, canLoadMore });
						} else {
							resolve({ posts: [], nextToken: '', canLoadMore: false });
						}
					} catch {
						resolve(
							Promise.resolve<any>({
								posts: [],
								nextToken: loadMorePostsInput.nextToken,
								canLoadMore: true,
							}),
						);
					}
				});
			});
		},
		async loadMoreFriendsPosts(
			loadMorePostsInput: ILoadMorePostsInput,
		): Promise<{
			posts: IPostArrayData;
			nextToken: string;
			canLoadMore: boolean;
		}> {
			return new Promise<{
				posts: IPostArrayData;
				nextToken: string;
				canLoadMore: boolean;
			}>((resolve, reject) => {
				getters.getFriendsPostsTimestampIds(context, loadMorePostsInput, async (err, res) => {
					try {
						if (res && res.postIds.length > 0) {
							const { nextToken, postIds, canLoadMore } = res;

							const posts = await Promise.all(
								postIds.map((postId) => this.getPostById({ postId })),
							);
							resolve({ posts, nextToken, canLoadMore });
						} else {
							resolve({ posts: [], nextToken: '', canLoadMore: false });
						}
					} catch {
						resolve(
							Promise.resolve<any>({
								posts: [],
								nextToken: loadMorePostsInput.nextToken,
								canLoadMore: true,
							}),
						);
					}
				});
			});
		},
		unlikePost: async (unlikePostInput: IUnlikePostInput): Promise<null> => {
			let validatedInput: any;
			try {
				validatedInput = await schemas.unlikePost.validate(unlikePostInput, {
					stripUnknown: true,
				});
			} catch (e) {
				throw new ValidationError(typeof e.errors === 'string' ? e.errors : e.errors.join(), {
					validationInput: unlikePostInput,
				});
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
