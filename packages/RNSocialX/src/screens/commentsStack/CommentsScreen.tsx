/**
 * old screen -> screens/CommentsScreen/index.tsx + data.hoc.tsx
 * TODO list:
 * 1. decide where `marginBottom` should come from?
 * 2. after sendComment optimistically insert that into local database and fix if there is a problem
 * 3. consider adding a global optimistic update handler
 * 4. delete option should be available only for own comments
 * 5. Check navigation usage! Relevant use case.
 */

import { ActionSheet } from 'native-base';
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
import { customStyleProps } from './CommentsScreen.style';
import { CommentsScreenView } from './CommentsScreen.view';

interface ICommentsScreenState {
	sortOption: CommentsSortingOptions;
	commentText: string;
	showSendButton: boolean;
	commentLikesPosition: object;
}

// interface INavigationScreenProps {
// 	params: {
// 		commentId?: string; // only available for replies
// 		postId?: string; // only for main comments screen
// 		startComment: boolean;
// 	};
// }

type ICommentsScreenProps = INavigationProps &
	IWithCommentsEnhancedData &
	IWithCommentsEnhancedActions;

// Go to the end of the file for the actual export, the Screen component is
// for providing screen-level local state to the view. This is again for
// explicit separation of levels of concerns
class Screen extends Component<ICommentsScreenProps, ICommentsScreenState> {
	public state = {
		sortOption: CommentsSortingOptions.Likes,
		commentText: '',
		showSendButton: false,
		commentLikesPosition: {
			bottom: customStyleProps.commentsLikeBottomStartPosition,
			right: 0,
		},
	};

	public componentDidMount() {
		StatusBar.setBarStyle('dark-content', true);
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustResize();
		}
	}

	public componentWillUnmount(): void {
		StatusBar.setBarStyle('light-content', true);
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
	}

	public render() {
		const {
			getText,
			postOwner,
			currentUser,
			postComments,
			postData,
			startComment,
			commentId,
		} = this.props;

		const optionsProps = {
			sortOption: this.state.sortOption,
			onSelectionChange: this.updateSortingHandler,
		};
		const { commentText, showSendButton } = this.state;

		return (
			<CommentsScreenView
				comments={postComments}
				onCommentLike={this.onCommentLikeHandler}
				onCommentReply={this.onCommentReplyHandler}
				onCommentSend={this.onCommentSendHandler}
				startComment={startComment}
				onViewUserProfile={this.navigateToUserProfile}
				onCommentTextChange={this.onCommentTextChangeHandler}
				commentText={commentText}
				showSendButton={showSendButton}
				onShowOptionsMenu={this.onShowOptionsMenuHandler}
				postData={postData}
				postOwner={postOwner}
				onCommentsBackPress={this.onCommentsBackPressHandler}
				onImagePress={this.onImagePressHandler}
				onLikePress={this.onLikePressHandler}
				currentUser={currentUser}
				onCommentContainerWidthChange={this.setCommentContainerWidthHandler}
				commentLikesPosition={this.state.commentLikesPosition}
				optionsProps={optionsProps}
				getText={getText}
				marginBottom={0}
				isReplyScreen={!!commentId}
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
		const { sendComment, postId, commentId } = this.props;
		const escapedComment = this.state.commentText.replace(/\n/g, '\\n');
		sendComment(escapedComment, postId, commentId);
		this.setState({
			commentText: '',
			showSendButton: false,
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
			showSendButton: value !== '',
			commentText: value,
		});
	};

	private onShowOptionsMenuHandler = (comment: IWallPostComment) => {
		const { getText, deleteComment } = this.props;
		const menuOptions = [
			getText('comments.screen.advanced.menu.copy'),
			getText('comments.screen.advanced.menu.delete'),
			getText('button.CANCEL'),
		];
		ActionSheet.show(
			{
				options: menuOptions,
				destructiveButtonIndex: menuOptions.length - 2,
				cancelButtonIndex: menuOptions.length - 1,
			},
			(buttonIndex: number) => {
				if (buttonIndex === 0) {
					Clipboard.setString(comment.text);
				} else if (buttonIndex === 1) {
					deleteComment(comment.id);
				}
			},
		);
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
		if (width < customStyleProps.commentWidthThreshold) {
			this.setState({
				commentLikesPosition: {
					bottom: customStyleProps.commentsLikeBottomAdaptivePosition,
					right: customStyleProps.commentsLikeRightAdaptivePosition,
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
