import { IApplicationConfig } from '../../store/app/config/Types';
import { IPost } from '../../store/data/posts';
import { IMedia, MediaTypeImage, MediaTypeVideo } from '../../types';

export const extractMediaFromPosts = (
	posts: IPost[],
	currentUserId: string,
	appConfig: IApplicationConfig,
) => {
	return posts.reduce(
		(acc: IMedia[], post) =>
			post.media
				? acc.concat(
						post.media.map((media) => ({
							url: appConfig.ipfsConfig.ipfs_URL + media.hash,
							hash: media.hash,
							type: media.type.name === 'Photo' ? MediaTypeImage : MediaTypeVideo,
							extension: media.extension,
							size: media.size,
							numberOfLikes: post.likes.ids.length,
							numberOfComments: post.comments.length,
							likedByCurrentUser: !!post.likes.byId[currentUserId],
							postId: post.postId,
						})),
				  ) // tslint:disable-line indent (tslint bug!!!)
				: [...acc],
		[],
	);
};
