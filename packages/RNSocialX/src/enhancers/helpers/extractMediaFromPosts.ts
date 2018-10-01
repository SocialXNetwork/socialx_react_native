import { IApplicationConfig } from '../../store/app/config/Types';
import { IPostArrayData } from '../../store/data/posts';
import { IMediaProps, MediaTypeImage, MediaTypeVideo } from '../../types';

export const extractMediaFromPosts = (
	posts: IPostArrayData,
	appConfig: IApplicationConfig,
) => {
	return posts.reduce(
		(acc: IMediaProps[], post) =>
			post.media
				? acc.concat(
						post.media.map((media) => ({
							url: appConfig.ipfsConfig.ipfs_URL + media.hash,
							hash: media.hash,
							type:
								media.type.name === 'Photo' ? MediaTypeImage : MediaTypeVideo,
							extension: media.extension,
							size: media.size,
							numberOfLikes: post.likes.length,
							numberOfComments: post.comments.length,
						})),
				  ) // tslint:disable-line indent (tslint bug!!!)
				: [...acc],
		[],
	);
};
