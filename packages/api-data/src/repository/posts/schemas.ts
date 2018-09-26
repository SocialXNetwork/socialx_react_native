import yup from 'yup';

const usernameOrPasswordType = yup
	.string()
	.trim()
	.min(6)
	.max(32)
	.required();

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

export const postData = yup
	.object()
	.shape({
		image_hash: longTextType,
		location: longTextType,
		optimized_image_hash: longTextType,
		privatePost: yup
			.boolean()
			.default(false)
			.required(),
		text: longTextType,
		title: yup
			.string()
			.trim()
			.min(1)
			.max(256)
			.required(),
	})
	.required();

export const likePost = yup
	.object()
	.shape({
		postId: idType,
	})
	.required();

export const getPostPathsByUser = yup
	.object()
	.shape({
		username: usernameOrPasswordType,
	})
	.required();

export const getPostByPath = yup
	.object()
	.shape({
		postPath: longTextType.required(),
	})
	.required();

export const getPublicPostsByDate = yup
	.object()
	.shape({
		date: yup.date().required(),
	})
	.required();

export const getPostLikes = yup
	.object()
	.shape({
		postId: idType,
	})
	.required();

export default {
	getPostByPath,
	getPostLikes,
	getPostPathsByUser,
	getPublicPostsByDate,
	likePost,
	postData,
};
