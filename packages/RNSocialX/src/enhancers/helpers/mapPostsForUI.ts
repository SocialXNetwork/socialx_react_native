import { IApplicationConfig } from '../../store/app/config/Types';
import { IPostArrayData } from '../../store/data/posts';
import { IActivity } from '../../store/ui/activities';
import {
	ICurrentUser,
	IVisitedUser,
	MediaTypeImage,
	MediaTypeVideo,
} from '../../types';
import { getActivity } from './getActivity';

export const mapPostsForUI = (
	posts: IPostArrayData,
	returnLength: number,
	user: ICurrentUser | IVisitedUser,
	profiles: any,
	activities: IActivity[],
	activityType: string | null,
	appConfig: IApplicationConfig,
) => {
	return posts
		.sort((x: any, y: any) => y.timestamp - x.timestamp)
		.slice(0, returnLength)
		.map((post) => {
			// @Alex Fix typing later
			const postOwnerProfile = profiles.find(
				(profile: any) => profile.pub === post.owner.pub,
			);

			// const foundLike = post.likes.find(
			// 	(like) => like.owner.alias === user!.userId,
			// );

			console.log(post);
			return {
				id: post.postId,
				postText: post.postText,
				location: post.location,
				taggedFriends: post.taggedFriends,
				timestamp: new Date(post.timestamp),
				owner: {
					userId: post.owner.alias,
					fullName: postOwnerProfile.fullName,
					avatarURL: postOwnerProfile.avatar,
				},
				governanceVersion: false,
				// TODO: add this later when data is available
				numberOfSuperLikes: 0,
				// numberOfComments: post.comments.length,
				numberOfComments: 0,
				// TODO: add this later when data is available
				numberOfWalletCoins: 0,
				likedByMe: false,
				canDelete: true,
				// media: post.media!.map((media) => ({
				// 	url: appConfig.ipfsConfig.ipfs_URL + media.hash,
				// 	hash: media.hash,
				// 	type: media.type.name === 'Photo' ? MediaTypeImage : MediaTypeVideo,
				// 	extension: media.extension,
				// 	size: media.size,
				// 	numberOfLikes: post.likes.length,
				// 	numberOfComments: post.comments.length,
				// })),
				media: [],
				// likes: post.likes.map((like) => {
				// 	return {
				// 		userId: like.owner.alias,
				// 		userName: like.owner.alias,
				// 	};
				// }),
				likes: [],
				// @Alex replace this with a check for likes length
				// bestComments: post.comments.slice(0, 2).map((comment) => {
				// 	return {
				// 		id: String(comment.timestamp),
				// 		text: comment.text,
				// 		likes: comment.likes.map((like) => {
				// 			return {
				// 				userId: like.owner.alias,
				// 				userName: like.owner.alias,
				// 			};
				// 		}),
				// 		owner: {
				// 			userId: comment.owner.alias,
				// 			userName: comment.owner.alias,
				// 		},
				// 	};
				// }),
				bestComments: [],
				listLoading: getActivity(activities, activityType),
				suggested: undefined,
				// @Alex find a good way of passing noInput
				noInput: false,
				contentOffensive: false,
				marginBottom: 0,
				currentUserAvatarURL: user.avatarURL,
			};
		});
};
