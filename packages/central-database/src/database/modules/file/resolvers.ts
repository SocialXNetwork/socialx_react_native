import { IResolverMap } from '../../../types/graphql-utils';

// this will be most likely ignored because ipfs obsoleted it
export const resolvers: IResolverMap = {
	Query: {
		Uploads: async (_, __, { authScope, User, File }) => {
			try {
				// const currentUserId = await withUser(authScope);
				// if (!currentUserId) {
				// 	throw new Error('User not logged in');
				// }

				// const user = await User.findById(currentUserId);
				// if (user.level === UserLevels.Normal) {
				// 	throw new Error('You dont have enough privilege to access this');
				// }

				// const files = await File.find();
				return [];
			} catch (e) {
				throw new Error(e.message);
			}
		},
	},
	Mutation: {
		uploadFile: async (_, { file }, { File }) => {
			console.log(file);
			return;
		},
	},
};
