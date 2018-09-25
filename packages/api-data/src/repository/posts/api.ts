import {IContext, ILikesMetasCallback} from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters, {IPostData} from './setters';

export default (context: IContext) => ({
	getPostPathsByUser: ({username}: {username: string}): Promise<string[]> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = {username};
				getters.getPostPathsByUser(context, validatedArgs, (e, r) => {
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
				const validatedArgs = {postPath};
				getters.getPostByPath(context, validatedArgs, (e, r) => {
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
				const validatedArgs = {date};
				getters.getPublicPostsByDate(context, validatedArgs, (e, r) => {
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
				const validatedArgs = {postId};
				getters.getPostLikes(context, validatedArgs, (e, r) => {
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
				const validatedArgs = createPostInput;
				setters.createPost(context, validatedArgs, (e, r) => {
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
				const validatedArgs = {postId};
				setters.likePost(context, validatedArgs, (e, r) => {
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
