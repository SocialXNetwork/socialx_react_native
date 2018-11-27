/*
 * Temporary enhancer to shape the data while we normalize the Redux state
 */

import * as React from 'react';

import { ICommentsReturnData, IPostReturnData } from '../../store/data/comments';
import { ActionTypes } from '../../store/data/posts/Types';
import { IFriendData } from '../../store/data/profiles';
import { IActivity } from '../../store/ui/activities';
import {
	IComment,
	ICurrentUser,
	IProfile,
	IWallPostData,
	MediaTypeImage,
	MediaTypeVideo,
} from '../../types';
import { getActivity, getTopComments } from '../helpers';

import { WithConfig } from '../connectors/app/WithConfig';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithActivities } from '../connectors/ui/WithActivities';
import { WithCurrentUser } from '../intermediary';

export interface IWithDataShapeEnhancedProps {
	shapedComment: IComment | null;
	shapedPost: IWallPostData | null;
}

interface IWithDataShapeProps {
	comment?: ICommentsReturnData;
	post?: IPostReturnData;
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
										{({ currentUser }) =>
											this.props.children({
												shapedComment: this.props.comment
													? this.getComment(
															this.props.comment,
															profiles,
															currentUser.userId,
															appConfig.ipfsConfig.ipfs_URL,
															// tslint:disable-next-line
												  )
													: null,
												shapedPost: this.props.post
													? this.getPost(
															this.props.post!,
															currentUser,
															profiles,
															activities,
															appConfig.ipfsConfig.ipfs_URL,
															// tslint:disable-next-line
													  )
													: null,
											})
										}
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
		comment: ICommentsReturnData,
		profiles: IFriendData[],
		currentUserId: string,
		url: string,
	) => {
		const commentOwner = profiles.find((profile) => profile.alias === comment.owner.alias);

		return {
			commentId: comment.commentId,
			text: comment.text,
			user: {
				userId: comment.owner.alias,
				fullName: commentOwner!.fullName,
				avatar: commentOwner!.avatar.length > 0 ? url + commentOwner!.avatar : '',
			},
			timestamp: new Date(comment.timestamp),
			likes: comment.likes.map((like) => {
				const likeProfile = profiles.find((p) => p.alias === like.owner.alias);

				return {
					userId: like.owner.alias,
					userName: like.owner.alias,
					fullName: likeProfile!.fullName,
					avatar: likeProfile!.avatar.length > 0 ? url + likeProfile!.avatar : '',
					relationship: likeProfile!.status,
				};
			}),
			likedByCurrentUser: !!comment.likes.find((like) => like.owner.alias === currentUserId),
		};
	};

	private getPost = (
		post: IPostReturnData,
		currentUser: ICurrentUser | undefined,
		profiles: IProfile[],
		activities: IActivity[],
		url: string,
	): IWallPostData => {
		const ownerProfile = profiles.find((profile) => profile.alias === post.owner.alias);
		const likedByCurrentUser = !!post.likes.find(
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
				avatar: ownerProfile!.avatar.length > 0 ? url + ownerProfile!.avatar : '',
			},
			likedByCurrentUser,
			removable: post.owner.alias === currentUser!.userId,
			media: post.media.map((media) => ({
				url: url + media.hash,
				hash: media.hash,
				type: media.type.name === 'Photo' ? MediaTypeImage : MediaTypeVideo,
				extension: media.extension,
				size: media.size,
				numberOfLikes: post.likes.length,
				numberOfComments: post.comments.length,
				likedByCurrentUser,
				postId: post.postId,
			})),
			likes: post.likes.map((like) => {
				const likeProfile = profiles.find((p) => p.alias === like.owner.alias);

				return {
					userId: like.owner.alias,
					userName: like.owner.alias,
					fullName: likeProfile!.fullName,
					avatar: likeProfile!.avatar.length > 0 ? url + likeProfile!.avatar : '',
					relationship: likeProfile!.status,
				};
			}),
			commentIds: post.comments
				.sort((x, y) => x.timestamp - y.timestamp)
				.map((comm) => comm.commentId),
			topComments: getTopComments(post.comments),
			// TODO: add this later when data is available
			numberOfSuperLikes: 0,
			numberOfComments: post.comments.length,
			// TODO: add this later when data is available
			numberOfWalletCoins: 0,
			suggested: undefined,
			loading: getActivity(activities, ActionTypes.LOAD_MORE_POSTS),
			currentUserAvatar: currentUser!.avatar,
			currentUserName: currentUser!.userName,
			offensiveContent: false,
		};
	};
}
