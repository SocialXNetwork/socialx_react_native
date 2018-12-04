/*
 * TO DO:
 * 1. Link onReportProblem with backend to send notification to SocialX / send e-mail to SocialX
 */

import * as React from 'react';

import {
	IComment,
	ICurrentUser,
	IError,
	IGlobal,
	INavigationProps,
	IOptionsMenuProps,
	ITranslatedProps,
	IWallPostData,
} from '../../types';

import { WithAggregations } from '../connectors/aggregations/WithAggregations';
import { WithI18n } from '../connectors/app/WithI18n';
import { WithNavigationParams } from '../connectors/app/WithNavigationParams';
import { WithPosts } from '../connectors/data/WithPosts';
import { WithActivities } from '../connectors/ui/WithActivities';
import { WithGlobals } from '../connectors/ui/WithGlobals';
import { WithOverlays } from '../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../screens';

export interface IWallPostEnhancedData {
	post: IWallPostData;
	currentUser: ICurrentUser;
	errors: IError[];
	skeletonPost: IWallPostData;
	commentInput?: boolean;
	isCommentsScreen: boolean;
	keyboardRaised?: boolean;
}

export interface IWallPostEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	onRemovePost: (postId: string) => void;
	onSubmitComment: (commentText: string, postId: string) => void;
	onLikeComment: (comment: IComment) => void;
	onRemoveComment: (commentId: string) => void;
	onBlockUser: (userId: string) => void;
	onReportProblem: (subject: string, description: string) => void;
	onAddComment?: (cardHeight: number) => void;
}

interface IWithWallPostEnhancedProps {
	data: IWallPostEnhancedData;
	actions: IWallPostEnhancedActions;
}

interface IWithWallPostProps extends INavigationProps {
	children(props: IWithWallPostEnhancedProps): JSX.Element;
}

interface IWithWallPostState {}

export class WithWallPost extends React.Component<IWithWallPostProps, IWithWallPostState> {
	private actions: {
		getUserPosts: (input: { username: string }) => void;
		likeComment: (input: { commentId: string }) => void;
		unlikeComment: (input: { commentId: string }) => void;
		createComment: (input: { text: string; postId: string }) => void;
		removePost: (input: { postId: string }) => void;
		setNavigationParams: (input: any) => void;
		setGlobal: (global: IGlobal) => void;
	} = {
		getUserPosts: () => undefined,
		likeComment: () => undefined,
		unlikeComment: () => undefined,
		createComment: () => undefined,
		removePost: () => undefined,
		setNavigationParams: () => undefined,
		setGlobal: () => undefined,
	};

	public render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithNavigationParams>
						{({ setNavigationParams }) => (
							<WithOverlays>
								{({ showOptionsMenu }) => (
									<WithGlobals>
										{({ globals, setGlobal }) => (
											<WithActivities>
												{({ errors }) => (
													<WithAggregations>
														{({ getUserPosts }) => (
															<WithPosts>
																{({
																	likeComment,
																	unlikeComment,
																	createComment,
																	removeComment,
																	removePost,
																}) => (
																	<WithCurrentUser>
																		{({ currentUser }) => {
																			this.actions = {
																				getUserPosts,
																				likeComment,
																				unlikeComment,
																				createComment,
																				removePost,
																				setNavigationParams,
																				setGlobal,
																			};

																			return this.props.children({
																				data: {
																					currentUser,
																					skeletonPost: globals.skeletonPost,
																					errors,
																				} as any,
																				actions: {
																					onRemovePost: this.onRemovePostHandler,
																					onSubmitComment: this.onSubmitCommentHandler,
																					onLikeComment: this.onLikeCommentHandler,
																					onRemoveComment: (commentId) =>
																						removeComment({ commentId }),
																					onBlockUser: () => undefined,
																					onReportProblem: () => undefined,
																					showOptionsMenu: (items) => showOptionsMenu({ items }),
																					getText,
																				},
																			});
																		}}
																	</WithCurrentUser>
																)}
															</WithPosts>
														)}
													</WithAggregations>
												)}
											</WithActivities>
										)}
									</WithGlobals>
								)}
							</WithOverlays>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}

	private onRemovePostHandler = async (postId: string) => {
		const { removePost, setGlobal } = this.actions;

		setGlobal({
			transparentOverlay: {
				visible: true,
				alpha: 0.5,
				loader: true,
			},
		});

		await removePost({ postId });

		setGlobal({
			transparentOverlay: {
				visible: false,
				loader: false,
			},
		});
	};

	private onSubmitCommentHandler = async (text: string, postId: string) => {
		await this.actions.createComment({ text, postId });
	};

	private onLikeCommentHandler = async (comment: IComment) => {
		const { likedByCurrentUser, commentId } = comment;

		if (likedByCurrentUser) {
			this.actions.unlikeComment({ commentId });
		} else {
			this.actions.likeComment({ commentId });
		}
	};
}
