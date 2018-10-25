import { IApplicationConfig } from '../../store/app/config/Types';
import { IPostReturnData } from '../../store/data/posts';
import { IProfileData } from '../../store/data/profiles';
import { IActivity } from '../../store/ui/activities';
import { ICurrentUser, MediaTypeImage, MediaTypeVideo } from '../../types';
import { getActivity, getBestComments } from './';

export const mapPostsForUI = (
	posts: IPostReturnData[],
	returnLength: number,
	currentUser: ICurrentUser | undefined,
	profiles: IProfileData[],
	activities: IActivity[],
	activityType: string | null,
	appConfig: IApplicationConfig,
) => {
	return posts
		.sort((x: any, y: any) => y.timestamp - x.timestamp)
		.slice(0, returnLength)
		.map((post) => {
			const ownerProfile = profiles.find(
				(profile) => profile.alias === post.owner.alias,
			);

			const foundLike = !!post.likes.find(
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
					avatarURL:
						ownerProfile!.avatar.length > 0
							? appConfig.ipfsConfig.ipfs_URL + ownerProfile!.avatar
							: '',
				},
				governanceVersion: false,
				// TODO: add this later when data is available
				numberOfSuperLikes: 0,
				numberOfComments: post.comments.length,
				// TODO: add this later when data is available
				numberOfWalletCoins: 0,
				likedByMe: foundLike,
				canDelete: post.owner.alias === currentUser!.userId,
				media: post.media.map((media) => ({
					url: appConfig.ipfsConfig.ipfs_URL + media.hash,
					hash: media.hash,
					type: media.type.name === 'Photo' ? MediaTypeImage : MediaTypeVideo,
					extension: media.extension,
					size: media.size,
					numberOfLikes: post.likes.length,
					numberOfComments: post.comments.length,
				})),
				likes: post.likes.map((like) => {
					return {
						userId: like.owner.alias,
						userName: like.owner.alias,
					};
				}),
				bestComments: getBestComments(post.comments),
				listLoading: getActivity(activities, activityType),
				suggested: undefined,
				contentOffensive: false,
				marginBottom: 0,
				currentUserAvatarURL: currentUser!.avatarURL,
				likeError: false,
			};
		});
};
