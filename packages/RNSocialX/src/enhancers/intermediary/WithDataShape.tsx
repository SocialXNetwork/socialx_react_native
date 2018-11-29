/*
 * Temporary enhancer to shape the data while we normalize the Redux state
 */

import * as React from 'react';

import { IComment as IStateComment } from '../../store/data/comments';
import { ActionTypes, IPost } from '../../store/data/posts/Types';
import { IProfiles } from '../../store/data/profiles';
import { IActivity } from '../../store/ui/activities';
import { IComment, ICurrentUser, IWallPost, MediaTypeImage, MediaTypeVideo } from '../../types';
import { getActivity } from '../helpers';

import { WithConfig } from '../connectors/app/WithConfig';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithActivities } from '../connectors/ui/WithActivities';
import { WithCurrentUser } from '../intermediary';

export interface IWithDataShapeEnhancedProps {
	shapedComment: IComment | undefined;
	shapedPost: IWallPost | undefined;
}

interface IWithDataShapeProps {
	comment?: IStateComment;
	post?: IPost;
	children(props: IWithDataShapeEnhancedProps): JSX.Element;
}

export class WithDataShape extends React.Component<IWithDataShapeProps> {
	public render() {
		return (
			<WithConfig>
				{({ appConfig }) => (
					<WithActivities>
						{({ activities }) => (
							<WithProfiles>
								{({ profiles }) => (
									<WithCurrentUser>
										{({ currentUser }) => {
											const IPFS_URL = appConfig.ipfsConfig.ipfs_URL;

											return this.props.children({
												shapedComment: this.getComment(
													this.props.comment,
													profiles,
													currentUser.userId,
												),
												shapedPost: this.getPost(
													this.props.post,
													currentUser,
													profiles,
													activities,
													IPFS_URL,
												),
											});
										}}
									</WithCurrentUser>
								)}
							</WithProfiles>
						)}
					</WithActivities>
				)}
			</WithConfig>
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
	};

	private getPost = (
		post: IPost | undefined,
		currentUser: ICurrentUser,
		profiles: IProfiles,
		activities: IActivity[],
		IPFS_URL: string,
	) => {
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
				media: {
					objects: post.media,
					postId: post.postId,
				},
				likeIds: post.likes.ids,
				commentIds: post.comments,
				topCommentIds:
					post.comments.length > 0
						? post.comments.length > 1
							? [post.comments[0], post.comments[1]]
							: [post.comments[0]]
						: [],
				// TODO: add this later when data is available
				numberOfSuperLikes: 0,
				numberOfComments: post.comments.length,
				// TODO: add this later when data is available
				numberOfWalletCoins: 0,
				suggested: undefined,
				loading: getActivity(activities, ActionTypes.LOAD_MORE_POSTS),
				offensiveContent: false,
			};
		}
	};
}
