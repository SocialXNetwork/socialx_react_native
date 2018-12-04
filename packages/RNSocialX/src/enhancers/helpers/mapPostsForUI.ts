import { IPost } from '../../store/data/posts/Types';
import { IProfiles } from '../../store/data/profiles/Types';

import { ICurrentUser, IWallPost } from '../../types';

export const mapPostsForUI = (posts: IPost[], currentUser: ICurrentUser, profiles: IProfiles) => {
	return posts
		.sort((x: IPost, y: IPost) => y.timestamp - x.timestamp)
		.map((post) => {
			const ownerProfile = profiles[post.owner.alias];
			const likedByCurrentUser = !!post.likes.byId[currentUser.userId];

			return {
				postId: post.postId,
				postText: post.postText,
				location: post.location,
				taggedFriends: post.taggedFriends,
				timestamp: new Date(post.timestamp),
				owner: {
					userId: post.owner.alias,
					fullName: ownerProfile.fullName,
					avatar: ownerProfile.avatar,
				},
				likedByCurrentUser,
				removable: post.owner.alias === currentUser.userId,
				media: post.media.map((obj) => ({ ...obj, postId: post.postId })),
				likeIds: post.likes.ids,
				commentIds: post.comments,
				topCommentIds:
					post.comments.length > 0
						? post.comments.length > 1
							? [post.comments[0], post.comments[1]]
							: [post.comments[0]]
						: [],
				// topCommentIds: [],
				// TODO: add this later when data is available
				numberOfSuperLikes: 0,
				numberOfComments: post.comments.length,
				// TODO: add this later when data is available
				numberOfWalletCoins: 0,
				suggested: undefined,
				offensiveContent: false,
			};
		}) as IWallPost[];
};
