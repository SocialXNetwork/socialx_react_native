/**
 * old screen -> screens/CommentsScreen/index.tsx + data.hoc.tsx
 * TODO list:
 * 1. decide where `marginBottom` should come from?
 * 2. after sendComment optimistically insert that into local database and fix if there is a problem
 * 3. consider adding a global optimistic update handler
 * 4. delete option should be available only for own comments
 * 5. Check navigation usage! Relevant use case.
 */

import React, { Component } from 'react';
import { Clipboard, Platform, StatusBar } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import uuid from 'uuid/v4';

import {
	IWithCommentsEnhancedActions,
	IWithCommentsEnhancedData,
	WithComments,
} from '../../enhancers/screens';
import { ActionTypes } from '../../store/data/posts/Types';

import { OS_TYPES, SCREENS } from '../../environment/consts';
import {
	CommentsSortingOptions,
	IMediaProps,
	INavigationProps,
	IWallPostComment,
} from '../../types';

import { CommentsScreenView } from './CommentsScreen.view';

interface ICommentsScreenState {
	sortOption: CommentsSortingOptions;
	comment: string;
	comments: IWallPostComment[];
	disabledInput: boolean;
	error: boolean;
}

type ICommentsScreenProps = INavigationProps &
	IWithCommentsEnhancedData &
	IWithCommentsEnhancedActions;

class Screen extends Component<ICommentsScreenProps, ICommentsScreenState> {
	public static getDerivedStateFromProps(
		nextProps: ICommentsScreenProps,
		currentState: ICommentsScreenState,
	) {
		const incomingError = !!nextProps.errors.find(
			(error) =>
				error.type === ActionTypes.CREATE_COMMENT || error.type === ActionTypes.REMOVE_COMMENT,
		);

		if (incomingError !== currentState.error) {
			return {
				error: true,
			};
		}

		return null;
	}

	public state = {
		sortOption: CommentsSortingOptions.Likes,
		comment: '',
		comments: this.props.post.comments,
		disabledInput: false,
		error: false,
	};

	public componentDidMount() {
		StatusBar.setBarStyle('dark-content', true);
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustResize();
		}
	}

	public shouldComponentUpdate(nextProps: ICommentsScreenProps, nextState: ICommentsScreenState) {
		return (
			this.state !== nextState ||
			this.props.currentUser !== nextProps.currentUser ||
			this.props.errors !== nextProps.errors ||
			this.props.post !== nextProps.post
		);
	}

	public componentWillUnmount() {
		StatusBar.setBarStyle('light-content', true);
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
	}

	public render() {
		const { getText, post, startComment, errors } = this.props;

		const optionsProps = {
			sortOption: this.state.sortOption,
			onSelectionChange: this.updateSortingHandler,
		};
		const { comment } = this.state;

		const likePostError = !!errors.find(
			(error) => error.type === ActionTypes.LIKE_POST || error.type === ActionTypes.UNLIKE_POST,
		);

		const likeCommentError = !!errors.find(
			(error) =>
				error.type === ActionTypes.LIKE_COMMENT || error.type === ActionTypes.UNLIKE_COMMENT,
		);

		return (
			<CommentsScreenView
				post={post}
				comments={this.state.comments}
				startComment={startComment}
				likePostError={likePostError}
				likeCommentError={likeCommentError}
				comment={comment}
				optionsProps={optionsProps}
				onCommentLike={this.onCommentLikeHandler}
				onCommentSend={this.onCommentSendHandler}
				onViewUserProfile={this.navigateToUserProfile}
				onCommentInputChange={this.onCommentInputChangeHandler}
				onShowOptionsMenu={this.onShowOptionsMenuHandler}
				onCommentsBackPress={this.onCommentsBackPressHandler}
				onImagePress={this.onImagePressHandler}
				onLikePress={this.onLikePressHandler}
				getText={getText}
				marginBottom={0}
			/>
		);
	}

	private onCommentLikeHandler = (comment: IWallPostComment) => {
		const { unlikeComment, likeComment } = this.props;
		if (comment.likedByMe) {
			unlikeComment(comment.commentId);
		} else {
			likeComment(comment.commentId);
		}
	};

	private onCommentSendHandler = async () => {
		const { sendComment, post, currentUser } = this.props;

		const escapedCommentText = this.state.comment.replace(/\n/g, '\\n');
		const newComment = {
			commentId: uuid(),
			text: escapedCommentText,
			user: {
				userId: currentUser.userId,
				fullName: currentUser.fullName,
				avatarURL: currentUser.avatarURL,
			},
			timestamp: new Date(Date.now()),
			numberOfLikes: 0,
			likes: [],
			likedByMe: false,
		};

		this.setState((currentState) => {
			return {
				disabledInput: true,
				comments: [...currentState.comments, newComment],
				error: false,
				comment: '',
			};
		});

		await sendComment(escapedCommentText, post.postId);

		if (this.state.error) {
			this.setState({
				comments: this.props.post.comments,
			});
		}
	};

	private onDeleteCommentHandler = async (commId: string) => {
		const updatedComments = this.state.comments.filter((comm) => comm.commentId !== commId);

		this.setState({
			comments: updatedComments,
			error: false,
		});

		await this.props.deleteComment(commId);

		if (this.state.error) {
			this.setState({
				comments: this.props.post.comments,
			});
		}
	};

	private navigateToUserProfile = (userId: string) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.UserProfile,
			params: { userId },
		});
		navigation.navigate(SCREENS.UserProfile);
	};

	private updateSortingHandler = (value: CommentsSortingOptions) => {
		this.setState({
			sortOption: value,
		});
	};

	private onCommentInputChangeHandler = (value: string) => {
		this.setState({
			comment: value,
		});
	};

	private onShowOptionsMenuHandler = (comment: IWallPostComment) => {
		const { showDotsMenuModal, getText } = this.props;
		const menuItems = [
			{
				label: getText('comments.screen.advanced.menu.copy'),
				icon: 'ios-copy',
				actionHandler: () => Clipboard.setString(comment.text),
			},
			{
				label: getText('comments.screen.advanced.menu.delete'),
				icon: 'ios-trash',
				actionHandler: async () => {
					await this.onDeleteCommentHandler(comment.commentId);
				},
			},
		];
		showDotsMenuModal(menuItems);
	};

	private onCommentsBackPressHandler = () => {
		this.props.navigation.goBack(null);
	};

	private onImagePressHandler = (index: number, medias: IMediaProps[]) => {
		const { setNavigationParams, navigation } = this.props;
		setNavigationParams({
			screenName: SCREENS.MediaViewer,
			params: {
				mediaObjects: medias,
				startIndex: index,
				postId: undefined, // don't allow to start a comment from MediaViewerScreen, so we avoid the loop
			},
		});
		navigation.navigate(SCREENS.MediaViewer);
	};

	private onLikePressHandler = async (likedByMe: boolean, postId: string) => {
		const { likePost, unlikePost } = this.props;

		if (likedByMe) {
			await unlikePost(postId);
		} else {
			await likePost(postId);
		}
	};
}

export const CommentsScreen = (navProps: INavigationProps) => (
	<WithComments>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithComments>
);
