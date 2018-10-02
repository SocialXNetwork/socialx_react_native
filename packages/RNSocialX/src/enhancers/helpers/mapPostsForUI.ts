import { IApplicationConfig } from '../../store/app/config/Types';
import { IPostArrayData } from '../../store/data/posts';
import { IActivity } from '../../store/ui/activities';
import {
	ICurrentUser,
	IVisitedUser,
	MediaTypeImage,
	MediaTypeVideo,
} from '../../types';

export const mapPostsForUI = (
	posts: IPostArrayData,
	returnLength: number,
	user: ICurrentUser | IVisitedUser,
	activities: IActivity[],
	activityType: string | null,
	appConfig: IApplicationConfig,
) => {
	return posts
		.sort((x: any, y: any) => y.timestamp - x.timestamp)
		.slice(0, returnLength)
		.map((post) => {
			const foundLike = post.likes.find(
				(like) => like.owner.alias === user!.userId,
			);

			return {
				id: post.postId,
				postText: post.postText,
				location: post.location,
				taggedFriends: post.taggedFriends,
				timestamp: new Date(post.timestamp * 1000),
				owner: {
					userId: post.owner.alias,
					fullName: user!.fullName,
					avatarURL: user!.avatarURL,
				},
				governanceVersion: false,
				// TODO: add this later when data is available
				numberOfSuperLikes: 0,
				numberOfComments: post.comments.length,
				// TODO: add this later when data is available
				numberOfWalletCoins: 0,
				likedByMe: !!foundLike,
				canDelete: true,
				media: post.media!.map((media) => ({
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
				bestComments: post.comments.slice(0, 2).map((comment) => {
					return {
						id: String(comment.timestamp),
						text: comment.text,
						likes: comment.likes.map((like) => {
							return {
								userId: like.owner.alias,
								userName: like.owner.alias,
							};
						}),
						owner: {
							userId: comment.owner.alias,
							userName: comment.owner.alias,
						},
					};
				}),
				listLoading:
					activities.filter((activity) => activity.type === activityType)
						.length > 0,
				suggested: undefined,
				noInput: true,
				contentOffensive: false,
				marginBottom: 0,
			};
		});
};
