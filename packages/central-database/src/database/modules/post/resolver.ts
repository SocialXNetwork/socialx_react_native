import { decryptUserId } from '../shared/logic/currentUser';

export default {
	Query: {
		myPosts: async (_, __, { User, authHeader }) => {
			const currentUserId = await decryptUserId(authHeader);
			if (!currentUserId) {
				throw new Error('User not logged in.');
			}

			const user = await User.findById(currentUserId);
			return user.posts;
		},
		post: async (_, { postId }, { Post, authHeader }) => {
			const currentUserId = await decryptUserId(authHeader);
			if (!currentUserId) {
				throw new Error('User not logged in.');
			}

			const post = await Post.findById(postId);
			if (!post) {
				throw new Error(`Post with id ${postId} was not found!`);
			}
			return post;
		},
	},
};
