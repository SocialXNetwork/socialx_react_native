import { IContext } from '../../types';
import schemas from './schemas';
import setters from './setters';

import { resolveCallback } from '../../utils/helpers';
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
				const validatedInput = await schemas.createComment.validate(
					{ text, postId },
					{
						stripUnknown: true,
					},
				);
				setters.createComment(
					context,
					validatedInput as { text: string; postId: string },
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	likeComment: ({ commentId }: { commentId: string }): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.likeComment.validate(
					{ commentId },
					{
						stripUnknown: true,
					},
				);
				setters.likeComment(
					context,
					validatedInput as { commentId: string },
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	removeComment: (removeCommentInput: IRemoveCommentInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.removeComment.validate(
					removeCommentInput,
					{ stripUnknown: true },
				);
				setters.removeComment(
					context,
					validatedInput as IRemoveCommentInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
	unlikeComment: (unlikeCommentInput: IUnlikeCommentInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.unlikeComment.validate(
					unlikeCommentInput,
					{ stripUnknown: true },
				);
				setters.unlikeComment(
					context,
					validatedInput as IUnlikeCommentInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
});
