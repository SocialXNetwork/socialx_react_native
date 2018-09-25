import {IContext, ILikesMetasCallback, IMetasCallback} from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters from './setters';

export default (context: IContext) => ({
	getPostComments: ({postId}: {postId: string}): Promise<IMetasCallback[]> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = {postId};
				getters.getPostComments(context, validatedArgs, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	// NOTE: shouldnt this be renamed to getCommenLikes, naming is misleading and functionality aswell
	getPostLikes: ({commentId}: {commentId: string}): Promise<ILikesMetasCallback[]> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = {commentId};
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
	createComment: ({text, postId}: {text: string; postId: string}): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = {text, postId};
				setters.createComment(context, validatedArgs, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	likeComment: ({commentId}: {commentId: string}): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = {commentId};
				setters.likeComment(context, validatedArgs, (e, r) => {
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
