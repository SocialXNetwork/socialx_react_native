import { IContext, ILikeData } from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters from './setters';

import { resolveCallback } from '../../utils/helpers';
import {
	ICommentData,
	IRemoveCommentInput,
	IUnlikeCommentInput,
} from './types';

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
	getCommentLikes: ({
		commentId,
	}: {
		commentId: string;
	}): Promise<ILikeData[]> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.getCommentLikes.validate(
					{ commentId },
					{
						stripUnknown: true,
					},
				);
				getters.getCommentLikes(
					context,
					validatedInput as { commentId: string },
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getPostComments: ({ postId }: { postId: string }): Promise<ICommentData[]> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.getPostComments.validate(
					{ postId },
					{
						stripUnknown: true,
					},
				);
				getters.getPostComments(
					context,
					validatedInput as { postId: string },
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
					unlikeCommentInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(e);
			}
		}),
});
