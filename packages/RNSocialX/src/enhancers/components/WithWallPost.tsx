/*
 * TO DO:
 * 1. Link onReportProblem with backend to send notification to SocialX / send e-mail to SocialX
 */

import * as React from 'react';

import {
	ICreateCommentInput,
	ILikeCommentInput,
	IRemoveCommentInput,
} from '../../store/data/comments';
import { IGlobal, IOptionsMenuProps, ITranslatedProps, IWallPost } from '../../types';

import { WithI18n } from '../connectors/app/WithI18n';
import { WithComments } from '../connectors/data/WithComments';
import { WithPosts } from '../connectors/data/WithPosts';
import { WithGlobals } from '../connectors/ui/WithGlobals';
import { WithOverlays } from '../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../intermediary';

export interface IWallPostEnhancedData {
	currentUser: {
		alias: string;
		pub: string;
		avatar: string;
	};
	placeholderPost?: IWallPost;
	commentInput?: boolean;
	keyboardRaised?: boolean;
}

export interface IWallPostEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	onRemovePost: (postId: string) => void;
	onSubmitComment: (text: string, alias: string, pub: string, postId: string) => void;
	onLikeComment: (alias: string, pub: string, liked: boolean, commentId: string) => void;
	onRemoveComment: (commentId: string, postId: string) => void;
	onBlockUser: (alias: string) => void;
	onReportProblem: (subject: string, description: string) => void;
	onAddComment?: (cardHeight: number) => void;
}

interface IWithWallPostEnhancedProps {
	data: IWallPostEnhancedData;
	actions: IWallPostEnhancedActions;
}

interface IWithWallPostProps {
	children(props: IWithWallPostEnhancedProps): JSX.Element;
}

interface IWithWallPostState {}

export class WithWallPost extends React.Component<IWithWallPostProps, IWithWallPostState> {
	private actions: {
		removePost: (postId: string) => void;
		createComment: (input: ICreateCommentInput) => void;
		removeComment: (input: IRemoveCommentInput) => void;
		likeComment: (input: ILikeCommentInput) => void;
		unlikeComment: (input: ILikeCommentInput) => void;
		setGlobal: (global: IGlobal) => void;
	} = {
		removePost: () => undefined,
		createComment: () => undefined,
		removeComment: () => undefined,
		likeComment: () => undefined,
		unlikeComment: () => undefined,
		setGlobal: () => undefined,
	};

	public render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<WithGlobals>
								{({ globals, setGlobal }) => (
									<WithPosts>
										{({ removePost }) => (
											<WithComments>
												{({ likeComment, unlikeComment, createComment, removeComment }) => (
													<WithCurrentUser>
														{({ currentUser }) => {
															this.actions = {
																likeComment,
																unlikeComment,
																createComment,
																removeComment,
																removePost,
																setGlobal,
															};

															return this.props.children({
																data: {
																	currentUser: {
																		alias: currentUser.alias,
																		pub: currentUser.pub,
																		avatar: currentUser.avatar,
																	},
																	placeholderPost: globals.placeholderPost,
																},
																actions: {
																	onRemovePost: this.onRemovePostHandler,
																	onSubmitComment: this.onSubmitCommentHandler,
																	onRemoveComment: this.onRemoveCommentHandler,
																	onLikeComment: this.onLikeCommentHandler,
																	onBlockUser: () => undefined,
																	onReportProblem: () => undefined,
																	showOptionsMenu: (items) => showOptionsMenu({ items }),
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
							</WithGlobals>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}

	private onSubmitCommentHandler = (text: string, alias: string, pub: string, postId: string) => {
		this.actions.createComment({ text, alias, pub, postId });
	};

	private onRemoveCommentHandler = async (commentId: string, postId: string) => {
		const { removeComment, setGlobal } = this.actions;

		setGlobal({
			transparentOverlay: {
				visible: true,
				alpha: 0.5,
				loader: true,
			},
		});
		await removeComment({ commentId, postId });
		setGlobal({
			transparentOverlay: {
				visible: false,
				loader: false,
			},
		});
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
		await removePost(postId);
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
