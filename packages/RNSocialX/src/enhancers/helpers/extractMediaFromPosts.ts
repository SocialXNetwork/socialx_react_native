import { IApplicationConfig } from '../../store/app/config/Types';
import { IPostArrayData } from '../../store/data/posts';
import { IMediaProps, MediaTypeImage, MediaTypeVideo } from '../../types';

export const extractMediaFromPosts = (
	posts: IPostArrayData,
	currentUserId: string,
	appConfig: IApplicationConfig,
) => {
	return posts.reduce(
		(acc: IMediaProps[], post) =>
			post.media
				? acc.concat(
						post.media.map((media) => ({
							url: appConfig.ipfsConfig.ipfs_URL + media.hash,
							hash: media.hash,
							type: media.type.name === 'Photo' ? MediaTypeImage : MediaTypeVideo,
							extension: media.extension,
							size: media.size,
							numberOfLikes: post.likes.length,
							numberOfComments: post.comments.length,
							likedByCurrentUser: !!post.likes.find((like) => like.owner.alias === currentUserId),
							postId: post.postId,
						})),
				  ) // tslint:disable-line indent (tslint bug!!!)
				: [...acc],
		[],
	);
};
