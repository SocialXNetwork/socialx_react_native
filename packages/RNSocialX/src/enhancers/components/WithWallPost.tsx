/*
 * TO DO:
 * 1. Link onReportProblem with backend to send notification to SocialX / send e-mail to SocialX
 */

import * as React from 'react';

import { KeyboardContext, SCREENS, TABS } from '../../environment/consts';
import {
	IComment,
	ICurrentUser,
	IError,
	IGlobal,
	IMediaProps,
	INavigationProps,
	IOptionsMenuProps,
	ITranslatedProps,
	IWallPostData,
} from '../../types';

import { IPostReturnData } from '@socialx/api-data';
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
	marginBottom: number;
}

export interface IWallPostEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	onImagePress: (index: number, mediaObjects: IMediaProps[], post: IWallPostData) => void;
	onRemovePost: (postId: string) => void;
	onUserPress: (userId: string) => void;
	onCommentsPress: (post: IWallPostData, keyboardRaised: boolean) => void;
	onSubmitComment: (commentText: string, postId: string) => void;
	onLikeComment: (comment: IComment) => void;
	onRemoveComment: (commentId: string) => void;
	onBlockUser: (userId: string) => void;
	onReportProblem: (subject: string, description: string) => void;
	onAddComment?: (cardHeight: number) => void;
	onGoBack: () => void;
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
													<KeyboardContext.Consumer>
														{({ marginBottom }) => (
															<WithAggregations>
																{({ userPosts, getUserPosts }) => (
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
																							marginBottom,
																						} as any,
																						actions: {
																							onImagePress: this.onImagePressHandler,
																							onRemovePost: this.onRemovePostHandler,
																							onUserPress: (userId) =>
																								this.onUserPressHandler(
																									currentUser.userId,
																									userPosts,
																									userId,
																								),
																							onCommentsPress: this.onCommentsPressHandler,
																							onSubmitComment: this.onSubmitCommentHandler,
																							onLikeComment: this.onLikeCommentHandler,
																							onRemoveComment: (commentId) =>
																								removeComment({ commentId }),
																							onBlockUser: () => undefined,
																							onReportProblem: () => undefined,
																							onGoBack: () => this.onGoBackHandler(),
																							showOptionsMenu: (items) =>
																								showOptionsMenu({ items }),
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
													</KeyboardContext.Consumer>
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

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private onImagePressHandler = (
		index: number,
		mediaObjects: IMediaProps[],
		post: IWallPostData,
	) => {
		const { navigation } = this.props;
		this.actions.setNavigationParams({
			screenName: SCREENS.MediaViewer,
			params: {
				mediaObjects,
				startIndex: index,
				post,
			},
		});
		navigation.navigate(SCREENS.MediaViewer);
	};

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
			},
		});
	};

	private onUserPressHandler = (
		currentUserId: string,
		userPosts: { [owner: string]: IPostReturnData[] },
		userId: string,
	) => {
		const { navigation } = this.props;

		if (userId === currentUserId) {
			navigation.navigate(SCREENS.MyProfile);
		} else {
			if (!userPosts[userId]) {
				this.actions.getUserPosts({ username: userId });
			}

			this.actions.setNavigationParams({
				screenName: SCREENS.UserProfile,
				params: { userId, origin: TABS.Feed },
			});
			navigation.navigate(SCREENS.UserProfile);
		}
	};

	private onCommentsPressHandler = (post: IWallPostData, keyboardRaised: boolean) => {
		const { navigation } = this.props;

		this.actions.setNavigationParams({
			screenName: SCREENS.Comments,
			params: { post, keyboardRaised },
		});
		navigation.navigate(SCREENS.Comments);
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
