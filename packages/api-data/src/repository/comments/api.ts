import { IContext, ILikesMetasCallback, IMetasCallback } from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters from './setters';

import { apiResolveExt } from '../../utils/helpers';
import { IRemoveCommentInput, IUnlikeCommentInput } from './types';

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
					apiResolveExt(resolve, reject),
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
					apiResolveExt(resolve, reject),
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
					apiResolveExt(resolve, reject),
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
					apiResolveExt(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	removeComment: (removeCommentInput: IRemoveCommentInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.removeComment.validate(
					removeCommentInput,
					{ stripUnknown: true },
				);
				setters.deleteComment(
					context,
					validatedArgs as IRemoveCommentInput,
					apiResolveExt(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	unlikeComment: (unlikeCommentInput: IUnlikeCommentInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.unlikeComment.validate(
					unlikeCommentInput,
					{ stripUnknown: true },
				);
				setters.unlikeComment(
					context,
					unlikeCommentInput,
					apiResolveExt(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
});
