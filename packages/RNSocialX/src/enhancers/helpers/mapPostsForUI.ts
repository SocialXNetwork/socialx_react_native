import { IPostReturnData } from '../../store/data/posts';
import { ActionTypes } from '../../store/data/posts/Types';
import { IActivity } from '../../store/ui/activities';

import { ICurrentUser, IProfile, IWallPostData, MediaTypeImage, MediaTypeVideo } from '../../types';
import { getActivity, getComments, getTopComments } from './';

export const mapPostsForUI = (
	posts: IPostReturnData[],
	currentUser: ICurrentUser | undefined,
	profiles: IProfile[],
	activities: IActivity[],
	url: string,
): IWallPostData[] => {
	return posts
		.sort((x: any, y: any) => y.timestamp - x.timestamp)
		.map((post) => {
			const ownerProfile = profiles.find((profile) => profile.alias === post.owner.alias);
			const likedByCurrentUser = !!post.likes.find(
				(like) => like.owner.alias === currentUser!.userId,
			);

			return {
				postId: post.postId,
				postText: post.postText,
				location: post.location,
				taggedFriends: post.taggedFriends,
				timestamp: new Date(post.timestamp),
				owner: {
					userId: post.owner.alias,
					fullName: ownerProfile!.fullName,
					avatar: ownerProfile!.avatar.length > 0 ? url + ownerProfile!.avatar : '',
				},
				likedByCurrentUser,
				removable: post.owner.alias === currentUser!.userId,
				media: post.media.map((media) => ({
					url: url + media.hash,
					hash: media.hash,
					type: media.type.name === 'Photo' ? MediaTypeImage : MediaTypeVideo,
					extension: media.extension,
					size: media.size,
					numberOfLikes: post.likes.length,
					numberOfComments: post.comments.length,
					likedByCurrentUser,
					postId: post.postId,
				})),
				likes: post.likes.map((like) => {
					const likeProfile = profiles.find((p) => p.alias === like.owner.alias);

					return {
						userId: like.owner.alias,
						userName: like.owner.alias,
						fullName: likeProfile!.fullName,
						avatar: likeProfile!.avatar.length > 0 ? url + likeProfile!.avatar : '',
						location: '',
						relationship: likeProfile!.status,
					};
				}),
				comments: getComments(post.comments, profiles, currentUser!.userId, url),
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
		}) as IWallPostData[];
};
