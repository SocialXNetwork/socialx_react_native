import {IContext, ILikesMetasCallback} from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters, {IPostData} from './setters';

export default (context: IContext) => ({
	getPostPathsByUser: ({username}: {username: string}): Promise<string[]> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.getPostPathsByUser.validate(
					{username},
					{
						stripUnknown: true,
					},
				);
				getters.getPostPathsByUser(context, validatedArgs as {username: string}, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getPostByPath: ({postPath}: {postPath: string}): Promise<IPostData> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.getPostByPath.validate(
					{postPath},
					{
						stripUnknown: true,
					},
				);
				getters.getPostByPath(context, validatedArgs as {postPath: string}, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getPublicPostsByDate: ({date}: {date: Date}): Promise<IPostData> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.getPublicPostsByDate.validate(
					{date},
					{
						stripUnknown: true,
					},
				);
				getters.getPublicPostsByDate(context, validatedArgs as {date: Date}, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getPostLikes: ({postId}: {postId: string}): Promise<ILikesMetasCallback> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.getPostLikes.validate(
					{postId},
					{
						stripUnknown: true,
					},
				);
				getters.getPostLikes(context, validatedArgs as {postId: string}, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	createPost: (createPostInput: IPostData): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.postData.validate(createPostInput, {
					stripUnknown: true,
				});
				setters.createPost(context, validatedArgs as IPostData, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	likePost: ({postId}: {postId: string}): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.likePost.validate(
					{postId},
					{
						stripUnknown: true,
					},
				);
				setters.likePost(context, validatedArgs as {postId: string}, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
});
