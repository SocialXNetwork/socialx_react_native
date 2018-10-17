/**
 * TODO list:
 * 1. Props data: postComments
 */

import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import {
	IDotsMenuProps,
	INavigationParamsActions,
	IPostForComment,
	ITranslatedProps,
	MediaTypeImage,
} from '../../../types';

import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { extractMediaFromPosts } from '../../helpers';
import { WithCurrentUser } from '../intermediary';

const mock: IWithCommentsEnhancedProps = {
	data: {
		startComment: false,
		post: {
			id: '2',
			postText: 'Lorem ipsum dolor sit amet.',
			timestamp: new Date(Date.now()),
			owner: {
				userId: 'testgggg',
				fullName: 'Test GGGG',
				avatarURL:
					'https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44f4aebbd1e1371d5bf7dc22016c5d29&w=1000&q=80',
			},
			media: [
				{
					url:
						'https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44f4aebbd1e1371d5bf7dc22016c5d29&w=1000&q=80',
					hash: '131289fsdf03yr9hehdiwb32',
					type: MediaTypeImage,
					extension: 'jpg',
					size: 51231,
					numberOfLikes: 0,
					numberOfComments: 0,
				},
			],
			likedByMe: false,
			likes: [],
			comments: [],
		},
	},
	actions: {
		sendComment: (text: string, postId: string) => {
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
		showDotsMenuModal: (items) => {
			/**/
		},
	},
};

export interface IWithCommentsEnhancedData {
	post: IPostForComment;
	startComment: boolean;
}

export interface IWithCommentsEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions,
		IDotsMenuProps {
	sendComment: (text: string, postId: string) => void;
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

export class WithComments extends React.Component<
	IWithCommentsProps,
	IWithCommentsState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithOverlays>
						{(overlayProps) => (
							<WithConfig>
								{({ appConfig }) => (
									<WithNavigationParams>
										{({ setNavigationParams, navigationParams }) => (
											<WithPosts>
												{(postProps) => (
													<WithProfiles>
														{({ profiles }) => (
															<WithCurrentUser>
																{({ currentUser }) => {
																	const currentPost = postProps.posts.find(
																		(post) =>
																			post.postId ===
																			navigationParams[SCREENS.Comments].postId,
																	);

																	const ownerProfile = profiles.find(
																		(profile) =>
																			profile.pub === currentPost!.owner.pub,
																	);

																	return this.props.children({
																		data: {
																			...mock.data,
																			startComment:
																				navigationParams[SCREENS.Comments]
																					.startComment,
																			post: {
																				id: currentPost!.postId,
																				postText: currentPost!.postText,
																				timestamp: new Date(
																					currentPost!.timestamp,
																				),
																				media: extractMediaFromPosts(
																					[currentPost!],
																					appConfig,
																				),
																				likes: currentPost!.likes.map(
																					(like) => {
																						return {
																							userId: like.owner.alias,
																							userName: like.owner.alias,
																						};
																					},
																				),
																				likedByMe: !!currentPost!.likes.find(
																					(like) =>
																						like.owner.alias ===
																						currentUser!.userId,
																				),
																				comments: currentPost!.comments.map(
																					(comment) => {
																						const commentOwner = profiles.find(
																							(profile) =>
																								profile.pub ===
																								comment.owner.pub,
																						);

																						return {
																							id: comment.commentId,
																							text: comment.text,
																							user: {
																								id: comment.owner.alias,
																								fullName: commentOwner!
																									.fullName,
																								avatarURL: commentOwner!.avatar,
																							},
																							timestamp: new Date(
																								comment.timestamp,
																							),
																							numberOfLikes:
																								comment.likes.length,
																							likes: comment.likes.map(
																								(like) => {
																									return {
																										userId: like.owner.alias,
																										userName: like.owner.alias,
																									};
																								},
																							),
																							likedByMe: !!comment.likes.find(
																								(like) =>
																									like.owner.alias ===
																									currentUser!.userId,
																							),
																						};
																					},
																				),
																				owner: {
																					userId: currentPost!.owner.alias,
																					fullName: ownerProfile!.fullName,
																					avatarURL: ownerProfile!.avatar,
																				},
																			},
																		},
																		actions: {
																			sendComment: (text, postId) =>
																				postProps.createComment({
																					text,
																					postId,
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
																			showDotsMenuModal: (items) =>
																				overlayProps.showOptionsMenu({ items }),
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
							</WithConfig>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
