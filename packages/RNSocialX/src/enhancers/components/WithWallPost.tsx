/*
 * TO DO:
 * 1. Link onReportProblem with backend to send notification to SocialX / send e-mail to SocialX
 */

import * as React from 'react';

import { KeyboardContext } from '../../environment/consts';
import {
	ICreateCommentInput,
	ILikeCommentInput,
	IRemoveCommentInput,
} from '../../store/data/comments';
import {
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
import { WithComments } from '../connectors/data/WithComments';
import { WithPosts } from '../connectors/data/WithPosts';
import { WithActivities } from '../connectors/ui/WithActivities';
import { WithGlobals } from '../connectors/ui/WithGlobals';
import { WithOverlays } from '../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../intermediary';

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
	onRemovePost: (postId: string) => void;
	onSubmitComment: (text: string, alias: string, pub: string, postId: string) => void;
	onLikeComment: (alias: string, pub: string, liked: boolean, commentId: string) => void;
	onRemoveComment: (
		text: string,
		alias: string,
		pub: string,
		postId: string,
		commentId: string,
	) => void;
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
		removePost: (input: { postId: string }) => void;
		createComment: (input: ICreateCommentInput) => void;
		removeComment: (input: IRemoveCommentInput) => void;
		likeComment: (input: ILikeCommentInput) => void;
		unlikeComment: (input: ILikeCommentInput) => void;
		setNavigationParams: (input: any) => void;
		setGlobal: (global: IGlobal) => void;
	} = {
		getUserPosts: () => undefined,
		removePost: () => undefined,
		createComment: () => undefined,
		removeComment: () => undefined,
		likeComment: () => undefined,
		unlikeComment: () => undefined,
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
																{({ getUserPosts }) => (
																	<WithPosts>
																		{({ removePost }) => (
																			<WithComments>
																				{({
																					likeComment,
																					unlikeComment,
																					createComment,
																					removeComment,
																				}) => (
																					<WithCurrentUser>
																						{({ currentUser }) => {
																							this.actions = {
																								getUserPosts,
																								likeComment,
																								unlikeComment,
																								createComment,
																								removeComment,
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
																									onRemovePost: this.onRemovePostHandler,
																									onSubmitComment: this.onSubmitCommentHandler,
																									onLikeComment: this.onLikeCommentHandler,
																									onRemoveComment: this.onRemoveCommentHandler,
																									onBlockUser: () => undefined,
																									onReportProblem: () => undefined,
																									showOptionsMenu: (items) =>
																										showOptionsMenu({ items }),
																									getText,
																								},
																							});
																						}}
																					</WithCurrentUser>
																				)}
																			</WithComments>
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

	private onSubmitCommentHandler = (text: string, alias: string, pub: string, postId: string) => {
		this.actions.createComment({ text, alias, pub, postId });
	};

	private onRemoveCommentHandler = (
		text: string,
		alias: string,
		pub: string,
		postId: string,
		commentId: string,
	) => {
		this.actions.removeComment({ text, alias, pub, postId, commentId });
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
				loader: false,
			},
		});
	};

	private onLikeCommentHandler = (
		alias: string,
		pub: string,
		liked: boolean,
		commentId: string,
	) => {
		if (liked) {
			this.actions.unlikeComment({ alias, pub, commentId });
		} else {
			this.actions.likeComment({ alias, pub, commentId });
		}
	};
}
