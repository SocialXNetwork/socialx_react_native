import { decryptUserId } from '../../shared/logic/currentUser';

export default {
	Query: {
		myLikes: async (_, __, { User, authHeader }) => {
			const currentUserId = await decryptUserId(authHeader);
			if (!currentUserId) {
				throw new Error('User not logged in.');
			}

			const user = await User.findById(currentUserId);
			return user.likes;
		},
		like: async (_, { likeId }, { Like, authHeader }) => {
			const currentUserId = await decryptUserId(authHeader);
			if (!currentUserId) {
				throw new Error('User not logged in.');
			}

			const like = await Like.findById(likeId);
			if (!like) {
				throw new Error(`Like with id ${likeId} was not found!`);
			}
			return like;
		},
	},
};
