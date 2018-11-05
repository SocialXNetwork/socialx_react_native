import { IApplicationConfig } from '../../store/app/config/Types';
import { IPostReturnData } from '../../store/data/posts';
import { ActionTypes } from '../../store/data/posts/Types';
import { IProfileData } from '../../store/data/profiles';
import { IActivity } from '../../store/ui/activities';

import { ICurrentUser, MediaTypeImage, MediaTypeVideo } from '../../types';
import { getActivity, getTopComments } from './';

export const mapPostsForUI = (
	posts: IPostReturnData[],
	returnLength: number,
	currentUser: ICurrentUser | undefined,
	profiles: IProfileData[],
	activities: IActivity[],
	appConfig: IApplicationConfig,
) => {
	return posts
		.sort((x: any, y: any) => y.timestamp - x.timestamp)
		.slice(0, returnLength)
		.map((post) => {
			const ownerProfile = profiles.find((profile) => profile.alias === post.owner.alias);
			const foundLike = !!post.likes.find((like) => like.owner.alias === currentUser!.userId);

			return {
				postId: post.postId,
				postText: post.postText,
				location: post.location,
				taggedFriends: post.taggedFriends,
				timestamp: new Date(post.timestamp),
				owner: {
					userId: post.owner.alias,
					fullName: ownerProfile!.fullName,
					avatar:
						ownerProfile!.avatar.length > 0
							? appConfig.ipfsConfig.ipfs_URL + ownerProfile!.avatar
							: '',
				},
				likedByCurrentUser: foundLike,
				removable: post.owner.alias === currentUser!.userId,
				media: post.media.map((media) => ({
					url: appConfig.ipfsConfig.ipfs_URL + media.hash,
					hash: media.hash,
					type: media.type.name === 'Photo' ? MediaTypeImage : MediaTypeVideo,
					extension: media.extension,
					size: media.size,
					numberOfLikes: post.likes.length,
					numberOfComments: post.comments.length,
					likedByCurrentUser: foundLike,
					postId: post.postId,
				})),
				likes: post.likes.map((like) => {
					return {
						userId: like.owner.alias,
						userName: like.owner.alias,
					};
				}),
				topComments: getTopComments(post.comments),
				// TODO: add this later when data is available
				numberOfSuperLikes: 0,
				numberOfComments: post.comments.length,
				// TODO: add this later when data is available
				numberOfWalletCoins: 0,
				suggested: undefined,
				loading: getActivity(activities, ActionTypes.LOAD_MORE_POSTS),
				currentUserAvatar: currentUser!.avatar,
				currentUserName: currentUser!.userName,
				offensiveContent: false,
			};
		});
};
