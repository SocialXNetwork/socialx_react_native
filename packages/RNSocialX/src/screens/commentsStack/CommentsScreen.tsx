/**
 * TODO list:
 * 1. Props: postUser, currentUser, postComments, reloadComments, loadingComments, sendComment, likeComment,
 * removeCommentLike, deleteComment, likePost, unlikePost
 * 2. decide where `marginBottom` should come from?
 * 3. make sure input reset will happen only after sendComment was with success!
 * 4. check onLikePressHandler, since now it's no longer waiting for an async call result.
 * Related to LikeAnimatingButton
 * 5. delete option should be available only for own comments
 * 6. Check navigation usage! Relevant use case.
 */

import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {Clipboard, Platform, StatusBar} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {NavigationScreenProp} from 'react-navigation';

import {OS_TYPES} from '../../environment/consts';
import {CommentsSortingOptions, IMediaProps, ITranslatedProps, IWallPostComment} from '../../types';
import {customStyleProps} from './CommentsScreen.style';
import {CommentsScreenView} from './CommentsScreen.view';

interface ICommentsScreenNavScreenProps {
	params: {
		commentId?: string; // only available for replies
		postId?: string; // only for main comments screen
		startComment: boolean;
		onSelectionChange: any;
		sortOption: CommentsSortingOptions;
		postData: object;
	};
}

interface ICommentsScreenState {
	sortOption: CommentsSortingOptions;
	commentText: string;
	showSendButton: boolean;
	commentLikesPosition: object;
}

interface ICommentsScreenProps extends ITranslatedProps {
	navigation: NavigationScreenProp<ICommentsScreenNavScreenProps>;
	postUser: any;
	currentUser: any;
	postComments: IWallPostComment[];
	reloadComments: (sortOption: CommentsSortingOptions) => void;
	loadingComments: boolean;
	sendComment: (text: string, targetPostId: string | undefined, targetCommentId: string | undefined) => void;
	likeComment: (commentId: string) => void;
	removeCommentLike: (commentId: string) => void;
	deleteComment: (commentId: string) => void;
	likePost: (postId: string) => void;
	unlikePost: (postId: string) => void;
}

export class CommentsScreen extends Component<ICommentsScreenProps, ICommentsScreenState> {
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
		this.props.navigation.setParams({
			onSelectionChange: this.updateSortingHandler,
			sortOption: this.state.sortOption,
		});
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
		const {postData, sortOption, onSelectionChange} = navigation.state.params;
		const optionsProps = {sortOption, onSelectionChange};
		const {commentText, showSendButton} = this.state;

		const isRepliesScreen = navigation.state.params.commentId !== undefined;

		const noCommentsText = isRepliesScreen
			? getText('replies.screen.no.comments')
			: getText('comments.screen.no.comments');
		const commentInputPlaceholder = isRepliesScreen
			? getText('replies.screen.comment.input.placeholder')
			: getText('comments.screen.comment.input.placeholder');

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
				noCommentsText={noCommentsText}
				commentInputPlaceholder={commentInputPlaceholder}
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
		this.props.navigation.setParams({
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

	private onLikePressHandler = async (likedByMe: boolean, postId: string) => {
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
