import yup from 'yup';

const usernameOrPasswordType = yup
	.string()
	.trim()
	.min(6)
	.max(32)
	.required();

const mediumLongTextType = yup
	.string()
	.trim()
	.min(5)
	.max(300)
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
		postText: mediumLongTextType.required(),
		location: mediumLongTextType,
		taggedFriends: yup.array().of(
			yup
				.object()
				.shape({
					fullName: usernameOrPasswordType.required(),
				})
				.required(),
		),
		media: yup.array().of(
			yup
				.object()
				.shape({
					hash: longTextType.required(),
					optimized_hash: longTextType.required(),
					type: yup.object().shape({
						key: longTextType.required(),
						name: longTextType.required(),
						category: longTextType.required(),
					}),
				})
				.required(),
		),
		governanceVersion: yup
			.boolean()
			.default(false)
			.required(),
		privatePost: yup
			.boolean()
			.default(false)
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

export const removePost = yup
	.object()
	.shape({
		postPath: longTextType.required(),
		postMetaId: longTextType.required(),
	})
	.required();

export const unlikePost = yup
	.object()
	.shape({
		postPath: longTextType.required(),
	})
	.required();

export default {
	getPostByPath,
	getPostLikes,
	getPostPathsByUser,
	getPublicPostsByDate,
	likePost,
	postData,
	removePost,
	unlikePost,
};
