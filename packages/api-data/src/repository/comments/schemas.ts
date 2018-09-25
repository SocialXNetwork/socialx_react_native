import yup from 'yup';

const idType = yup
	.string()
	.trim()
	.min(8)
	.max(32)
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

export const getPostLikes = yup
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
		text: longTextType.required(),
		postId: idType,
	})
	.required();

export default {
	getPostComments,
	getPostLikes,
	likeComment,
	createComment,
};
