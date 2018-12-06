import { IPost } from '../../store/data/posts';
import { IMedia } from '../../types';

export const extractMediaFromPosts = (posts: IPost[]) => {
	return posts.reduce(
		(acc: IMedia[], post) =>
			post.media
				? acc.concat(post.media.map((obj) => ({ ...obj, postId: post.postId })))
				: [...acc],
		[],
	);
};
