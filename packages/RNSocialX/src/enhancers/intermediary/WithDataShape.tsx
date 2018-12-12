import * as React from 'react';

import { IComment as IStateComment } from '../../store/data/comments';
import { IPost } from '../../store/data/posts/Types';
import { IProfiles } from '../../store/data/profiles';
import { IComment, ICurrentUser, IWallPost } from '../../types';

import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithCurrentUser } from '../intermediary';

export interface IWithDataShapeEnhancedProps {
	shapedComment: IComment | null;
	shapedPost: IWallPost | null;
}

interface IWithDataShapeProps {
	comment?: IStateComment;
	post?: IPost;
	children(props: IWithDataShapeEnhancedProps): JSX.Element;
}

export class WithDataShape extends React.Component<IWithDataShapeProps> {
	public render() {
		return (
			<WithProfiles>
				{({ profiles }) => (
					<WithCurrentUser>
						{({ currentUser }) => {
							return this.props.children({
								shapedComment: this.getComment(this.props.comment, profiles, currentUser.userId),
								shapedPost: this.getPost(this.props.post, currentUser, profiles),
							});
						}}
					</WithCurrentUser>
				)}
			</WithProfiles>
		);
	}

	private getComment = (
		comment: IStateComment | undefined,
		profiles: IProfiles,
		currentUserId: string,
	) => {
		if (comment) {
			const commentOwner = profiles[comment.owner.alias];

			return {
				commentId: comment.commentId,
				text: comment.text,
				user: {
					userId: comment.owner.alias,
					fullName: commentOwner.fullName,
					avatar: commentOwner.avatar,
				},
				timestamp: new Date(comment.timestamp),
				likeIds: comment.likes.map((like) => like.owner.alias),
				likedByCurrentUser: !!comment.likes.find((like) => like.owner.alias === currentUserId),
			};
		}

		return null;
	};

	private getPost = (post: IPost | undefined, currentUser: ICurrentUser, profiles: IProfiles) => {
		if (post) {
			const ownerProfile = profiles[post.owner.alias];
			const likedByCurrentUser = !!post.likes.byId[currentUser.userId];

			return {
				postId: post.postId,
				postText: post.postText,
				location: post.location,
				taggedFriends: post.taggedFriends,
				timestamp: new Date(post.timestamp),
				owner: {
					userId: post.owner.alias,
					fullName: ownerProfile.fullName,
					avatar: ownerProfile.avatar,
				},
				likedByCurrentUser,
				removable: post.owner.alias === currentUser.userId,
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
			};
		}

		return null;
	};
}
