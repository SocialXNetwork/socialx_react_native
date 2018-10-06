/**
 * TODO list:
 * 1. Props data: postComments
 */

import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import {
	ILike,
	IMediaProps,
	INavigationParamsActions,
	ITranslatedProps,
	IWallPostComment,
	MediaTypeImage,
} from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithCurrentUser } from '../intermediary';

const mock: IWithCommentsEnhancedProps = {
	data: {
		startComment: false,
		postId: '232362sgdxh',
		commentId: 'atw3yhsxz',
		postOwner: {
			userId: 'userId_0',
			avatarURL: 'https://placeimg.com/200/200/people',
			fullName: 'Willetta Winsor',
		},
		postData: {
			id: 'post_id_1',
			media: [
				{
					url: 'https://placeimg.com/1000/800/any',
					hash: '218y357u09k920q3ut',
					type: MediaTypeImage,
					extension: 'jpg',
					size: 993377,
					numberOfComments: 2,
					numberOfLikes: 11,
				},
			],
			likes: [
				{
					userId: 'user_id_1',
					userName: 'im.12',
				},
			],
			text: 'Sample post text.\nCan go on multiple lines.',
			timestamp: new Date('February 12, 2018 11:49:00'),
		},
		currentUser: {
			userId: 'userId_1',
		},
		postComments: [
			{
				id: 'comm_1',
				text: 'Sample comment text here.\nGoing on the second line',
				user: {
					fullName: 'Sharell Watchman',
					avatarURL: 'https://avatars2.githubusercontent.com/u/212',
					id: 'user_11',
				},
				timestamp: new Date('February 23, 2018 09:45:00'),
				numberOfLikes: 10,
				likes: [], // not used by component
				likedByMe: false,
				replies: [
					{
						id: 'comm_2',
						text: 'One line text reply.',
						user: {
							fullName: 'Rosaline Finger',
							avatarURL: undefined,
							id: 'user_22',
						},
						timestamp: new Date('April 25, 2018 19:25:00'),
						numberOfLikes: 2,
						likes: [], // not used by component
						likedByMe: false,
						replies: [],
					},
				],
			},
		],
		loadingComments: false,
	},
	actions: {
		sendComment: (
			text: string,
			targetPostId: string,
			targetCommentId: string | undefined,
		) => {
			/**/
		},
		deleteComment: (commentId: string) => {
			/**/
		},
		likeComment: (commentId: string) => {
			/**/
		},
		unlikeComment: (commentId: string) => {
			/**/
		},
		likePost: (postId: string) => {
			/**/
		},
		unlikePost: (postId: string) => {
			/**/
		},
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
		setNavigationParams: () => {
			/**/
		},
	},
};

export interface IWithCommentsEnhancedData {
	postOwner: {
		userId: string;
		avatarURL?: string;
		fullName: string;
	};
	postData: {
		id: string;
		likes: ILike[];
		media: IMediaProps[];
		text: string;
		timestamp: Date;
	};
	currentUser: {
		userId: string;
	};
	postComments: IWallPostComment[];
	loadingComments: boolean;
	commentId?: string; // only available for replies
	postId: string; // only for main comments screen
	startComment: boolean;
}

export interface IWithCommentsEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions {
	sendComment: (
		text: string,
		targetPostId: string,
		targetCommentId: string | undefined,
	) => void;
	likeComment: (commentId: string) => void;
	unlikeComment: (commentId: string) => void;
	deleteComment: (commentId: string) => void;
	likePost: (postId: string) => void;
	unlikePost: (postId: string) => void;
}

interface IWithCommentsEnhancedProps {
	data: IWithCommentsEnhancedData;
	actions: IWithCommentsEnhancedActions;
}

interface IWithCommentsProps {
	children(props: IWithCommentsEnhancedProps): JSX.Element;
}

interface IWithCommentsState {}

// This is a class because we might want to do transformations and optimizations here
// Also, this will import individual connectors/enhancers and compose them to
// pass the real data and actions instead of the mocks
export class WithComments extends React.Component<
	IWithCommentsProps,
	IWithCommentsState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithNavigationParams>
						{({ setNavigationParams, navigationParams }) => (
							<WithPosts>
								{(postProps) => (
									<WithProfiles>
										{({ profiles }) => (
											<WithCurrentUser>
												{(currentUserProps) => {
													const currentPost = postProps.posts.find(
														(post) =>
															post.postId ===
															navigationParams[SCREENS.Comments].postId,
													);
													const ownerProfile = profiles.find(
														(profile) => profile.pub === currentPost!.owner.pub,
													);

													return this.props.children({
														data: {
															...mock.data,
															currentUser: {
																userId: currentUserProps.currentUser!.userId,
															},
															startComment:
																navigationParams[SCREENS.Comments].startComment,
															commentId:
																navigationParams[SCREENS.Comments].commentId,
															postId: navigationParams[SCREENS.Comments].postId,
															postOwner: {
																userId: currentPost!.owner.alias,
																fullName: ownerProfile!.fullName,
																avatarURL: ownerProfile!.avatar,
															},
														},
														actions: {
															sendComment: (
																text,
																targetPostId,
																targetCommentId,
															) =>
																postProps.createComment({
																	text,
																	postId: targetPostId,
																}),
															deleteComment: (commentId) =>
																postProps.removeComment({ commentId }),
															likeComment: (commentId) =>
																postProps.likeComment({ commentId }),
															unlikeComment: (commentId) =>
																postProps.unlikeComment({ commentId }),
															likePost: (postId) =>
																postProps.likePost({ postId }),
															unlikePost: (postId) =>
																postProps.unlikePost({ postId }),

															getText: i18nProps.getText,
															setNavigationParams,
														},
													});
												}}
											</WithCurrentUser>
										)}
									</WithProfiles>
								)}
							</WithPosts>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
