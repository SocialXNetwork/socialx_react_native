import * as React from 'react';

import { SCREENS, TABS } from '../../environment/consts';
import {
	IGlobal,
	IMediaProps,
	INavigationProps,
	IOptionsMenuProps,
	ITranslatedProps,
	IWallPostData,
} from '../../types';

import { IPostReturnData } from '@socialx/api-data';
import { ActionTypes } from '../../store/data/posts/Types';
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
	skeletonPost: IWallPostData;
	likeFailed: boolean;
	commentInput: boolean;
}

export interface IWallPostEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	onImagePress: (index: number, mediaObjects: IMediaProps[], postId: string) => void;
	onLikePress: (likedByCurrentUser: boolean, postId: string) => void;
	onDeletePostPress: (postId: string) => void;
	onUserPress: (userId: string) => void;
	onCommentsPress: (postId: string, startComment: boolean) => void;
	onSubmitComment: (commentText: string, postId: string) => void;
	onBlockUser: (userId: string) => void;
	onReportProblem: (reason: string, description: string) => void;
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
														{({ userPosts, getUserPosts }) => (
															<WithPosts>
																{({ likePost, unlikePost, removePost, createComment }) => (
																	<WithCurrentUser>
																		{({ currentUser }) =>
																			this.props.children({
																				data: {
																					skeletonPost: globals.skeletonPost,
																					likeFailed: !!errors.find(
																						(error) =>
																							error.type === ActionTypes.LIKE_POST ||
																							error.type === ActionTypes.UNLIKE_POST,
																					),
																					commentInput: false,
																				} as any,
																				actions: {
																					onImagePress: (
																						index: number,
																						mediaObjects: IMediaProps[],
																						postId: string,
																					) =>
																						this.onImagePressHandler(
																							setNavigationParams,
																							index,
																							mediaObjects,
																							postId,
																						),
																					onLikePress: (likedByCurrentUser, postId) =>
																						this.onLikePressHandler(
																							likePost,
																							unlikePost,
																							likedByCurrentUser,
																							postId,
																						),
																					onDeletePostPress: (postId) =>
																						this.onDeletePostPressHandler(
																							setGlobal,
																							removePost,
																							postId,
																						),
																					onUserPress: (userId) =>
																						this.onUserPressHandler(
																							setNavigationParams,
																							currentUser.userId,
																							userPosts,
																							getUserPosts,
																							userId,
																						),
																					onCommentsPress: (postId, start) =>
																						this.onCommentsPressHandler(
																							setNavigationParams,
																							postId,
																							start,
																						),
																					onSubmitComment: (text, postId) =>
																						this.onSubmitCommentHandler(
																							createComment,
																							text,
																							postId,
																						),
																					onAddComment: () => undefined,
																					onBlockUser: () => undefined,
																					onReportProblem: () => undefined,
																					showOptionsMenu: (items) => showOptionsMenu({ items }),
																					getText,
																				},
																			})
																		}
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

	private onImagePressHandler = (
		setNavigationParams: (input: any) => void,
		index: number,
		mediaObjects: IMediaProps[],
		postId: string,
	) => {
		const { navigation } = this.props;
		setNavigationParams({
			screenName: SCREENS.MediaViewer,
			params: {
				mediaObjects,
				startIndex: index,
				postId,
			},
		});
		navigation.navigate(SCREENS.MediaViewer);
	};

	private onLikePressHandler = async (
		likePost: ({ postId }: { postId: string }) => void,
		unlikePost: ({ postId }: { postId: string }) => void,
		likedByCurrentUser: boolean,
		postId: string,
	) => {
		if (likedByCurrentUser) {
			await unlikePost({ postId });
		} else {
			await likePost({ postId });
		}
	};

	private onDeletePostPressHandler = async (
		setGlobal: (global: IGlobal) => void,
		removePost: ({ postId }: { postId: string }) => void,
		postId: string,
	) => {
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
		setNavigationParams: (input: any) => void,
		currentUserId: string,
		userPosts: { [owner: string]: IPostReturnData[] },
		getUserPosts: ({ username }: { username: string }) => void,
		userId: string,
	) => {
		const { navigation } = this.props;

		if (userId === currentUserId) {
			navigation.navigate(SCREENS.MyProfile);
		} else {
			if (!userPosts[userId]) {
				getUserPosts({ username: userId });
			}

			setNavigationParams({
				screenName: SCREENS.UserProfile,
				params: { userId, origin: TABS.Feed },
			});
			navigation.navigate(SCREENS.UserProfile);
		}
	};

	private onCommentsPressHandler = (
		setNavigationParams: (input: any) => void,
		postId: string,
		start: boolean,
	) => {
		const { navigation } = this.props;

		setNavigationParams({
			screenName: SCREENS.Comments,
			params: { postId, start },
		});
		navigation.navigate(SCREENS.Comments);
	};

	private onSubmitCommentHandler = async (
		createComment: ({ text, postId }: { text: string; postId: string }) => void,
		text: string,
		postId: string,
	) => {
		await createComment({ text, postId });
	};
}
