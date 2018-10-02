import { IContext } from '../../types';
import schemas from './schemas';
import setters from './setters';

import { resolveCallback } from '../../utils/helpers';
import { IRemoveCommentInput, IUnlikeCommentInput } from './types';

export default (context: IContext) => ({
	createComment: async (createCommentInput: {
		text: string;
		postId: string;
	}): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.createComment.validate(
				createCommentInput,
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
		}

		return new Promise<null>((resolve, reject) => {
			setters.createComment(
				context,
				validatedInput as { text: string; postId: string },
				resolveCallback(resolve, reject),
			);
		});
	},
	likeComment: async (likeCommentInput: {
		commentId: string;
	}): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.likeComment.validate(likeCommentInput, {
				stripUnknown: true,
			});
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
		}

		return new Promise<null>((resolve, reject) => {
			setters.likeComment(
				context,
				validatedInput as { commentId: string },
				resolveCallback(resolve, reject),
			);
		});
	},
	removeComment: async (
		removeCommentInput: IRemoveCommentInput,
	): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.removeComment.validate(
				removeCommentInput,
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
		}

		return new Promise<null>((resolve, reject) => {
			setters.removeComment(
				context,
				validatedInput as IRemoveCommentInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	unlikeComment: async (
		unlikeCommentInput: IUnlikeCommentInput,
	): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.unlikeComment.validate(
				unlikeCommentInput,
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw typeof e.errors === 'string' ? e.errors : e.errors.join();
		}

		return new Promise<null>((resolve, reject) => {
			setters.unlikeComment(
				context,
				validatedInput as IUnlikeCommentInput,
				resolveCallback(resolve, reject),
			);
		});
	},
});
