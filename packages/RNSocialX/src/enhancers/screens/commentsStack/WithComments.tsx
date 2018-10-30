/**
 * TODO list:
 * 1. Props data: postComments
 */

import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import {
	ICurrentUser,
	IDotsMenuProps,
	IError,
	IGlobal,
	INavigationParamsActions,
	IPostForComment,
	ITranslatedProps,
	MediaTypeImage,
} from '../../../types';

import { currentUser as currentUserMock } from '../../../mocks';

import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { extractMediaFromPosts, getComments } from '../../helpers';
import { WithCurrentUser } from '../intermediary';

const mock: IWithCommentsEnhancedProps = {
	data: {
		currentUser: currentUserMock,
		startComment: false,
		errors: [],
		post: {
			postId: '2',
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
		canDelete: false,
	},
	actions: {
		sendComment: (text: string, postId: string) => undefined,
		deleteComment: (commentId: string) => undefined,
		deletePost: (postId: string) => undefined,
		likeComment: (commentId: string) => undefined,
		unlikeComment: (commentId: string) => undefined,
		likePost: (postId: string) => undefined,
		unlikePost: (postId: string) => undefined,
		showDotsMenuModal: (items) => undefined,
		setNavigationParams: () => undefined,
		getText: (value: string, ...args: any[]) => value,
		setGlobal: (global: IGlobal) => undefined,
		blockUser: () => undefined,
		reportProblem: () => undefined,
	},
};

export interface IWithCommentsEnhancedData {
	post: IPostForComment;
	currentUser: ICurrentUser;
	startComment: boolean;
	errors: IError[];
	canDelete: boolean;
}

export interface IWithCommentsEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions,
		IDotsMenuProps {
	sendComment: (text: string, postId: string) => void;
	likeComment: (commentId: string) => void;
	unlikeComment: (commentId: string) => void;
	deleteComment: (commentId: string) => void;
	deletePost: (postId: string) => void;
	likePost: (postId: string) => void;
	unlikePost: (postId: string) => void;
	setGlobal: (global: IGlobal) => void;
	blockUser: (userId: string) => void;
	reportProblem: (reason: string, description: string) => void;
}

interface IWithCommentsEnhancedProps {
	data: IWithCommentsEnhancedData;
	actions: IWithCommentsEnhancedActions;
}

interface IWithCommentsProps {
	children(props: IWithCommentsEnhancedProps): JSX.Element;
}

interface IWithCommentsState {}

export class WithComments extends React.Component<IWithCommentsProps, IWithCommentsState> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithOverlays>
						{(overlayProps) => (
							<WithGlobals>
								{({ setGlobal, globals }) => (
									<WithConfig>
										{({ appConfig }) => (
											<WithNavigationParams>
												{({ setNavigationParams, navigationParams }) => (
													<WithPosts>
														{(postProps) => (
															<WithProfiles>
																{({ profiles }) => (
																	<WithActivities>
																		{({ errors }) => (
																			<WithCurrentUser>
																				{({ currentUser }) => {
																					const currentPost = postProps.posts.find(
																						(post) =>
																							post.postId ===
																							navigationParams[SCREENS.Comments].postId,
																					);

																					const ownerProfile = profiles.find(
																						(profile) => profile.alias === currentPost!.owner.alias,
																					);

																					return this.props.children({
																						data: {
																							...mock.data,
																							currentUser,
																							startComment:
																								navigationParams[SCREENS.Comments].startComment,
																							errors,
																							canDelete:
																								currentUser.userId === currentPost!.owner.alias,
																							post: {
																								postId: currentPost!.postId,
																								postText: currentPost!.postText,
																								timestamp: new Date(currentPost!.timestamp),
																								media: extractMediaFromPosts(
																									[currentPost!],
																									appConfig,
																								),
																								likes: currentPost!.likes.map((like) => {
																									return {
																										userId: like.owner.alias,
																										userName: like.owner.alias,
																									};
																								}),
																								likedByMe: !!currentPost!.likes.find(
																									(like) => like.owner.alias === currentUser.userId,
																								),
																								comments: getComments(
																									currentPost!.comments,
																									profiles,
																									currentUser.userId,
																									appConfig,
																								),
																								owner: {
																									userId: currentPost!.owner.alias,
																									fullName: ownerProfile!.fullName,
																									avatarURL:
																										appConfig.ipfsConfig.ipfs_URL +
																										ownerProfile!.avatar,
																								},
																							},
																						},
																						actions: {
																							sendComment: async (text, postId) => {
																								await postProps.createComment({
																									text,
																									postId,
																								});
																							},
																							deleteComment: async (commentId) => {
																								await postProps.removeComment({
																									commentId,
																								});
																							},
																							deletePost: async (postId) => {
																								await postProps.removePost({
																									postId,
																								});
																							},
																							likeComment: async (commentId) => {
																								await postProps.likeComment({
																									commentId,
																								});
																							},
																							unlikeComment: async (commentId) => {
																								await postProps.unlikeComment({
																									commentId,
																								});
																							},
																							likePost: async (postId) => {
																								await postProps.likePost({
																									postId,
																								});
																							},
																							unlikePost: async (postId) => {
																								await postProps.unlikePost({
																									postId,
																								});
																							},
																							getText: i18nProps.getText,
																							showDotsMenuModal: (items) =>
																								overlayProps.showOptionsMenu({
																									items,
																								}),
																							blockUser: () => undefined,
																							reportProblem: () => undefined,
																							setNavigationParams,
																							setGlobal,
																						},
																					});
																				}}
																			</WithCurrentUser>
																		)}
																	</WithActivities>
																)}
															</WithProfiles>
														)}
													</WithPosts>
												)}
											</WithNavigationParams>
										)}
									</WithConfig>
								)}
							</WithGlobals>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
