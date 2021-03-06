import * as yup from 'yup';

const idType = yup
	.string()
	.trim()
	.min(1)
	.max(50)
	.required();

const longTextType = yup
	.string()
	.trim()
	.min(1)
	.max(4096);

export const getPostComments = yup
	.object()
	.shape({
		postId: idType,
	})
	.required();

export const getCommentLikes = yup
	.object()
	.shape({
		commentId: idType,
	})
	.required();

export const likeComment = yup
	.object()
	.shape({
		commentId: idType,
	})
	.required();

export const createComment = yup
	.object()
	.shape({
		postId: idType,
		text: longTextType.required(),
	})
	.required();

export const removeComment = yup
	.object()
	.shape({
		commentId: yup
			.string()
			.trim()
			.required(),
	})
	.required();

export const unlikeComment = yup
	.object()
	.shape({
		commentId: yup
			.string()
			.trim()
			.required(),
	})
	.required();

export default {
	createComment,
	getCommentLikes,
	getPostComments,
	likeComment,
	removeComment,
	unlikeComment,
};
