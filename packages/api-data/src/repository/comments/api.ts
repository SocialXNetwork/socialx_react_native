import { IContext, ILikesMetasCallback, IMetasCallback } from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters from './setters';

export default (context: IContext) => ({
	createComment: ({
		text,
		postId,
	}: {
		text: string;
		postId: string;
	}): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.createComment.validate(
					{ text, postId },
					{
						stripUnknown: true,
					},
				);
				setters.createComment(
					context,
					validatedArgs as { text: string; postId: string },
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getCommentLikes: ({
		commentId,
	}: {
		commentId: string;
	}): Promise<ILikesMetasCallback[]> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.getCommentLikes.validate(
					{ commentId },
					{
						stripUnknown: true,
					},
				);
				getters.getCommentLikes(
					context,
					validatedArgs as { commentId: string },
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getPostComments: ({
		postId,
	}: {
		postId: string;
	}): Promise<IMetasCallback[]> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.getPostComments.validate(
					{ postId },
					{
						stripUnknown: true,
					},
				);
				getters.getPostComments(
					context,
					validatedArgs as { postId: string },
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	likeComment: ({ commentId }: { commentId: string }): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.likeComment.validate(
					{ commentId },
					{
						stripUnknown: true,
					},
				);
				setters.likeComment(
					context,
					validatedArgs as { commentId: string },
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
});
