import { DeepReadonly } from 'utility-types-fixme-todo';

import { IComment } from '../../store/data/comments';
import { IPost } from '../../store/data/posts/Types';
import { IProfile } from '../../store/data/profiles';

export const shapeComment = (
	comment: DeepReadonly<IComment>,
	profile: DeepReadonly<IProfile>,
	currentAlias: string,
) => ({
	commentId: comment.commentId,
	text: comment.text,
	owner: {
		alias: profile.alias,
		fullName: profile.fullName,
		avatar: profile.avatar,
	},
	timestamp: new Date(comment.timestamp),
	likeIds: comment.likes.map((like) => like.owner.alias),
	likedByCurrentUser: !!comment.likes.find((like) => like.owner.alias === currentAlias),
	posting: comment.posting || false,
});

export const shapePost = (
	post: DeepReadonly<IPost>,
	profile: DeepReadonly<IProfile>,
	currentAlias: string,
) => {
	const { alias } = post.owner;
	const { fullName, avatar } = profile;
	const likedByCurrentUser = !!post.likes.byId[currentAlias];

	return {
		postId: post.postId,
		postText: post.postText,
		location: post.location || undefined,
		taggedFriends: post.taggedFriends || undefined,
		timestamp: new Date(post.timestamp),
		owner: {
			alias,
			fullName,
			avatar,
		},
		likedByCurrentUser,
		removable: alias === currentAlias,
		// @ts-ignore
		media: post.media.map((obj) => ({ ...obj, postId: post.postId })),
		likeIds: post.likes.ids,
		commentIds: post.comments,
		topCommentIds:
			post.comments.length > 0
				? post.comments.length > 1
					? [post.comments[post.comments.length - 2], post.comments[post.comments.length - 1]]
					: [post.comments[0]]
				: [],
		// TODO: add this later when data is available
		numberOfSuperLikes: 0,
		numberOfComments: post.comments.length,
		// TODO: add this later when data is available
		numberOfWalletCoins: 0,
		suggested: undefined,
		offensiveContent: false,
		creating: post.creating,
	};
};
