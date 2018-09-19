/**
 * old screen -> screens/CommentsScreen/index.tsx + data.hoc.tsx
 * TODO list:
 * 1. decide where `marginBottom` should come from?
 * 2. after sendComment optimistically insert that into local database and fix if there is a problem
 * 3. consider adding a global optimistic update handler
 * 4. delete option should be available only for own comments
 * 5. Check navigation usage! Relevant use case.
 */

import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {Clipboard, Platform, StatusBar} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import {IWithCommentsEnhancedActions, IWithCommentsEnhancedData, WithComments} from '../../enhancers/screens';

import {OS_TYPES} from '../../environment/consts';
import {CommentsSortingOptions, IMediaProps, INavigationProps, IWallPostComment} from '../../types';
import {customStyleProps} from './CommentsScreen.style';
import {CommentsScreenView} from './CommentsScreen.view';

interface ICommentsScreenState {
	sortOption: CommentsSortingOptions;
	commentText: string;
	showSendButton: boolean;
	commentLikesPosition: object;
}

interface INavigationScreenProps {
	params: {
		commentId?: string; // only available for replies
		postId?: string; // only for main comments screen
		startComment: boolean;
		postData: object;
	};
}

type ICommentsScreenProps = INavigationProps<INavigationScreenProps, any> &
	IWithCommentsEnhancedData &
	IWithCommentsEnhancedActions;

// Go to the end of the file for the actual export, the Screen component is
// for providing screen-level local state to the view. This is again for
// explicit separation of levels of concerns
class Screen extends Component<ICommentsScreenProps, ICommentsScreenState> {
	private static navigationOptions = {
		header: null,
	};

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
		const {getText, navigation, postUser, currentUser, postComments, loadingComments} = this.props;
		const {postData} = navigation.state.params;
		const optionsProps = {sortOption: this.state.sortOption, onSelectionChange: this.updateSortingHandler};
		const {commentText, showSendButton} = this.state;

		return (
			<CommentsScreenView
				isLoading={loadingComments}
				comments={postComments}
				onCommentLike={this.onCommentLikeHandler}
				onCommentReply={this.onCommentReplyHandler}
				onCommentSend={this.onCommentSendHandler}
				startComment={navigation.state.params.startComment}
				onViewUserProfile={this.navigateToUserProfile}
				onCommentTextChange={this.onCommentTextChangeHandler}
				commentText={commentText}
				showSendButton={showSendButton}
				onShowOptionsMenu={this.onShowOptionsMenuHandler}
				postData={postData}
				postOwner={postUser}
				onCommentsBackPress={this.onCommentsBackPressHandler}
				onImagePress={this.onImagePressHandler}
				onLikePress={this.onLikePressHandler}
				currentUser={currentUser}
				onCommentContainerWidthChange={this.setCommentContainerWidthHandler}
				commentLikesPosition={this.state.commentLikesPosition}
				optionsProps={optionsProps}
				getText={getText}
				marginBottom={0}
				isReplyScreen={navigation.state.params.commentId !== undefined}
			/>
		);
	}

	private onCommentReplyHandler = (comment: IWallPostComment, startComment: boolean) => {
		this.props.navigation.navigate({
			routeName: 'CommentsScreen',
			key: comment.id,
			params: {
				commentId: comment.id,
				startComment,
			},
		});
	};

	private onCommentLikeHandler = (comment: IWallPostComment) => {
		const {removeCommentLike, likeComment} = this.props;
		if (comment.likedByMe) {
			removeCommentLike(comment.id);
		} else {
			likeComment(comment.id);
		}
	};

	private onCommentSendHandler = () => {
		const {sendComment, navigation} = this.props;
		const {postId, commentId} = navigation.state.params;
		const escapedComment = this.state.commentText.replace(/\n/g, '\\n');
		sendComment(escapedComment, postId, commentId);
		this.setState({
			commentText: '',
			showSendButton: false,
		});
	};

	private navigateToUserProfile = (userId: string) => {
		this.props.navigation.navigate('UserProfileScreen', {userId});
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
		const {getText, deleteComment} = this.props;
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
		this.props.navigation.navigate('UserFeedTab');
	};

	private onImagePressHandler = (index: number, medias: IMediaProps[]) => {
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects: medias,
			startIndex: index,
		});
	};

	private onLikePressHandler = (likedByMe: boolean, postId: string) => {
		const {likePost, unlikePost} = this.props;

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
export const CommentsScreen = (navProps: INavigationProps<INavigationScreenProps, any>) => (
	<WithComments>{({data, actions}) => <Screen {...navProps} {...data} {...actions} />}</WithComments>
);
