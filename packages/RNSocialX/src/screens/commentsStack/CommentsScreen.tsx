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

import {
	IWithCommentsEnhancedActions,
	IWithCommentsEnhancedData,
	WithComments,
} from '../../enhancers/screens';

import { OS_TYPES, SCREENS } from '../../environment/consts';
import {
	CommentsSortingOptions,
	IMediaProps,
	INavigationProps,
	IWallPostComment,
} from '../../types';
import { defaultStyles } from './CommentsScreen.style';
import { CommentsScreenView } from './CommentsScreen.view';

interface ICommentsScreenState {
	sortOption: CommentsSortingOptions;
	comment: string;
	commentLikesPosition: object;
}

type ICommentsScreenProps = INavigationProps &
	IWithCommentsEnhancedData &
	IWithCommentsEnhancedActions;

class Screen extends Component<ICommentsScreenProps, ICommentsScreenState> {
	public state = {
		sortOption: CommentsSortingOptions.Likes,
		comment: '',
		showSendButton: false,
		commentLikesPosition: {
			bottom: defaultStyles.commentsLikeBottomStartPosition,
			right: 0,
		},
	};

	public componentDidMount() {
		StatusBar.setBarStyle('dark-content', true);
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustResize();
		}
	}

	public componentWillUnmount() {
		StatusBar.setBarStyle('light-content', true);
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
	}

	public render() {
		const { getText, post, startComment } = this.props;

		const optionsProps = {
			sortOption: this.state.sortOption,
			onSelectionChange: this.updateSortingHandler,
		};
		const { comment } = this.state;

		return (
			<CommentsScreenView
				post={post}
				startComment={startComment}
				comment={comment}
				optionsProps={optionsProps}
				onCommentLike={this.onCommentLikeHandler}
				onCommentReply={this.onCommentReplyHandler}
				onCommentSend={this.onCommentSendHandler}
				onViewUserProfile={this.navigateToUserProfile}
				onCommentTextChange={this.onCommentTextChangeHandler}
				onShowOptionsMenu={this.onShowOptionsMenuHandler}
				onCommentsBackPress={this.onCommentsBackPressHandler}
				onImagePress={this.onImagePressHandler}
				onLikePress={this.onLikePressHandler}
				onCommentContainerWidthChange={this.setCommentContainerWidthHandler}
				commentLikesPosition={this.state.commentLikesPosition}
				getText={getText}
				marginBottom={0}
			/>
		);
	}

	private onCommentReplyHandler = (
		comment: IWallPostComment,
		startComment: boolean,
	) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.UserProfile,
			params: {
				commentId: comment.id,
				startComment,
			},
		});
		navigation.navigate({
			routeName: SCREENS.Comments,
			key: comment.id,
		});
	};

	private onCommentLikeHandler = (comment: IWallPostComment) => {
		const { unlikeComment, likeComment } = this.props;
		if (comment.likedByMe) {
			unlikeComment(comment.id);
		} else {
			likeComment(comment.id);
		}
	};

	private onCommentSendHandler = () => {
		const { sendComment, post } = this.props;
		const escapedComment = this.state.comment.replace(/\n/g, '\\n');
		sendComment(escapedComment, post.id);

		this.setState({
			comment: '',
		});
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

	private onCommentTextChangeHandler = (value: string) => {
		this.setState({
			comment: value,
		});
	};

	private onShowOptionsMenuHandler = (comment: IWallPostComment) => {
		const { showDotsMenuModal, getText, deleteComment } = this.props;
		const menuItems = [
			{
				label: getText('comments.screen.advanced.menu.copy'),
				icon: 'ios-copy',
				actionHandler: () => Clipboard.setString(comment.text),
			},
			{
				label: getText('comments.screen.advanced.menu.delete'),
				icon: 'ios-trash',
				actionHandler: () => deleteComment(comment.id),
			},
		];
		showDotsMenuModal(menuItems);
	};

	private onCommentsBackPressHandler = () => {
		this.props.navigation.navigate(SCREENS.UserFeed);
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

	private onLikePressHandler = (likedByMe: boolean, postId: string) => {
		const { likePost, unlikePost } = this.props;

		if (likedByMe) {
			unlikePost(postId);
		} else {
			likePost(postId);
		}

		return !likedByMe;
	};

	private setCommentContainerWidthHandler = (width: number) => {
		if (width < defaultStyles.commentWidthThreshold) {
			this.setState({
				commentLikesPosition: {
					bottom: defaultStyles.commentsLikeBottomAdaptivePosition,
					right: defaultStyles.commentsLikeRightAdaptivePosition,
				},
			});
		}
	};
}

// We do it explicitly here instead of a generic wrapper for flexibility
export const CommentsScreen = (navProps: INavigationProps) => (
	<WithComments>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithComments>
);
