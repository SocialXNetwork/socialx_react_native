import * as React from 'react';
import {
	Animated,
	Clipboard,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
} from 'react-native';
import uuid from 'uuid/v4';

import { CommentCard, HeartAnimation } from '../../';
import {
	CommentInput,
	PostText,
	RecentLikes,
	TopComments,
	UserDetails,
	ViewAllComments,
	WallPostActions,
	WallPostMedia,
	WarnOffensiveContent,
} from './';

import {
	IWallPostEnhancedActions,
	IWallPostEnhancedData,
	WithWallPost,
} from '../../../enhancers/components/WithWallPost';
import {
	IWithLikingEnhancedActions,
	IWithLikingEnhancedData,
	WithLiking,
} from '../../../enhancers/logic/WithLiking';

import { OS_TYPES } from '../../../environment/consts';
import { Sizes } from '../../../environment/theme';
import { ActionTypes } from '../../../store/data/posts/Types';
import { IError, INavigationProps, IWallPostComment, IWallPostData } from '../../../types';
import { ReportProblemModal } from '../../modals/ReportProblemModal';

import styles, { SCREEN_WIDTH } from './WallPost.style';

type IWallPostCardProps = IWallPostEnhancedActions &
	IWallPostEnhancedData &
	IWithLikingEnhancedActions &
	IWithLikingEnhancedData;

interface IWallPostCardState {
	fullTextVisible: boolean;
	comment: string;
	inputFocused: boolean;
	inputWidth: Animated.Value;
	inputIconPosition: Animated.Value;
	viewOffensiveContent: boolean;
	sendCommentFailed: boolean;
	commentInputDisabled: boolean;
	comments: IWallPostComment[];
	reportAProblem: boolean;
}

class WallPostCard extends React.Component<IWallPostCardProps, IWallPostCardState> {
	public static getDerivedStateFromProps(
		nextProps: IWallPostCardProps,
		currentState: IWallPostCardState,
	) {
		const sendCommentFailed = !!nextProps.errors.find(
			(error) =>
				error.type === ActionTypes.CREATE_COMMENT || error.type === ActionTypes.REMOVE_COMMENT,
		);

		if (sendCommentFailed !== currentState.sendCommentFailed) {
			return {
				sendCommentFailed: true,
			};
		}

		return null;
	}

	public state = {
		fullTextVisible: false,
		comment: '',
		inputFocused: false,
		inputWidth: new Animated.Value(SCREEN_WIDTH),
		inputIconPosition: new Animated.Value(100),
		viewOffensiveContent: false,
		likePostFailed: false,
		likeCommentFailed: false,
		sendCommentFailed: false,
		commentInputDisabled: false,
		comments: this.props.comments!,
		reportAProblem: false,
	};

	private keyboardDidHideListener: any;
	private containerViewRef: React.RefObject<View> = React.createRef();
	private scrollRef: React.RefObject<ScrollView> = React.createRef();

	public componentDidMount() {
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

	public componentWillUnmount() {
		this.keyboardDidHideListener.remove();
	}

	public render() {
		const {
			post,
			skeletonPost,
			commentInput,
			keyboardRaised,
			optLikedByCurrentUser,
			likeDisabled,
			recentLikes,
			animationProgress,
			heartAnimation,
			onLikePost,
			onDoubleTapLikePost,
			onViewLikes,
			onCommentsPress,
			onUserPress,
			onImagePress,
			onLikeComment,
			onGoBack,
			getText,
			marginBottom,
		} = this.props;

		const {
			postText,
			location,
			taggedFriends,
			timestamp,
			owner,
			media,
			topComments,
			numberOfSuperLikes,
			numberOfComments,
			numberOfWalletCoins,
			loading,
			currentUserAvatar,
			offensiveContent,
		} = post;

		const {
			viewOffensiveContent,
			inputWidth,
			inputIconPosition,
			fullTextVisible,
			comment,
			comments,
			commentInputDisabled,
			reportAProblem,
		} = this.state;

		const animationValues = {
			width: inputWidth,
			send: inputIconPosition,
		};

		return (
			<View
				style={styles.container}
				ref={this.containerViewRef}
				// Measuring the element doesn't work on Android without this
				renderToHardwareTextureAndroid={true}
			>
				<UserDetails
					canBack={!!comments}
					user={owner}
					timestamp={timestamp}
					taggedFriends={taggedFriends}
					location={location}
					onUserPress={onUserPress}
					onShowOptions={this.onShowPostOptionsHandler}
					onGoBack={onGoBack}
					getText={getText}
				/>
				<ReportProblemModal
					visible={reportAProblem}
					confirmHandler={(subject, description) =>
						this.onReportAProblemHandler(true, subject, description)
					}
					declineHandler={() => this.onReportAProblemHandler(false)}
					marginBottom={marginBottom}
					getText={getText}
				/>
				{!!comments && (
					<React.Fragment>
						<ScrollView
							style={{ flex: 1 }}
							ref={this.scrollRef}
							onLayout={() => this.scrollRef.current && this.scrollRef.current.scrollToEnd()}
							onContentSizeChange={() =>
								this.scrollRef.current && this.scrollRef.current.scrollToEnd()
							}
						>
							<PostText
								text={postText}
								fullTextVisible={fullTextVisible}
								onShowFullText={this.onShowFullTextHandler}
								handleHashTag={() => undefined}
								handleUserTag={() => undefined}
								handleUrls={() => undefined}
								getText={getText}
							/>
							{media.length > 0 && (
								<View style={styles.mediaContainer}>
									{heartAnimation && <HeartAnimation animationProgress={animationProgress} />}
									<WallPostMedia
										mediaObjects={media}
										onMediaObjectView={(index: number) => onImagePress(index, media, post)}
										onDoublePress={() => onDoubleTapLikePost(post.postId)}
										placeholder={!!skeletonPost}
										getText={getText}
									/>
								</View>
							)}
							<WallPostActions
								likedByCurrentUser={optLikedByCurrentUser}
								likeDisabled={likeDisabled}
								numberOfSuperLikes={numberOfSuperLikes}
								numberOfWalletCoins={numberOfWalletCoins}
								onLikePost={() => onLikePost(post.postId)}
								onCommentPress={() => onCommentsPress(post, true)}
								onSuperLikePress={() => undefined}
								onWalletCoinsPress={() => undefined}
							/>
							<RecentLikes
								recentLikes={recentLikes}
								onUserPress={onUserPress}
								onViewLikes={onViewLikes}
								getText={getText}
							/>
							{comments.length > 0 &&
								comments.map((comm) => (
									<CommentCard
										key={comm.commentId}
										comment={comm}
										onLikeComment={() => onLikeComment(comm)}
										onViewUserProfile={onUserPress}
										onShowOptionsMenu={() => this.onShowCommentOptionsHandler(comm)}
										likeCommentError={false}
										getText={getText}
									/>
								))}
						</ScrollView>
						<KeyboardAvoidingView
							behavior="padding"
							keyboardVerticalOffset={50}
							enabled={Platform.OS === OS_TYPES.IOS ? true : false}
						>
							<CommentInput
								comment={comment}
								autoFocus={keyboardRaised}
								disabled={commentInputDisabled}
								onCommentInputChange={this.onCommentInputChangeHandler}
								onCommentInputPress={() => undefined}
								onSubmitComment={this.onSubmitCommentHandler}
								getText={getText}
							/>
						</KeyboardAvoidingView>
					</React.Fragment>
				)}
				{!comments && (
					<React.Fragment>
						<PostText
							text={postText}
							fullTextVisible={fullTextVisible}
							onShowFullText={this.onShowFullTextHandler}
							handleHashTag={() => undefined}
							handleUserTag={() => undefined}
							handleUrls={() => undefined}
							getText={getText}
						/>
						{media.length > 0 && (
							<View style={styles.mediaContainer}>
								{heartAnimation && <HeartAnimation animationProgress={animationProgress} />}
								{(!offensiveContent || viewOffensiveContent) && (
									<WallPostMedia
										mediaObjects={media}
										onMediaObjectView={(index: number) => onImagePress(index, media, post)}
										onDoublePress={() => onDoubleTapLikePost(post.postId)}
										placeholder={!!skeletonPost}
										getText={getText}
									/>
								)}
								<WarnOffensiveContent
									getText={getText}
									onShowOffensiveContent={this.onShowOffensiveContentHandler}
									visible={offensiveContent && !viewOffensiveContent}
								/>
							</View>
						)}
						<WallPostActions
							likedByCurrentUser={optLikedByCurrentUser}
							likeDisabled={likeDisabled}
							numberOfSuperLikes={numberOfSuperLikes}
							numberOfWalletCoins={numberOfWalletCoins}
							onLikePost={() => onLikePost(post.postId)}
							onCommentPress={() => onCommentsPress(post, true)}
							onSuperLikePress={() => undefined}
							onWalletCoinsPress={() => undefined}
						/>
						<RecentLikes
							recentLikes={recentLikes}
							onUserPress={onUserPress}
							onViewLikes={onViewLikes}
							getText={getText}
						/>
						<ViewAllComments
							numberOfComments={numberOfComments}
							onCommentPress={() => onCommentsPress(post, false)}
							getText={getText}
						/>
						<TopComments
							topComments={topComments}
							onUserPress={onUserPress}
							onCommentPress={() => onCommentsPress(post, false)}
						/>
						{!!commentInput && (
							<CommentInput
								feed={true}
								comment={comment}
								disabled={loading}
								avatar={currentUserAvatar}
								animationValues={animationValues}
								onCommentInputChange={this.onCommentInputChangeHandler}
								onCommentInputPress={this.onCommentInputPressHandler}
								onSubmitComment={this.onSubmitCommentHandler}
								getText={getText}
							/>
						)}
					</React.Fragment>
				)}
			</View>
		);
	}

	private keyboardDidHide = () => {
		if (this.state.inputFocused) {
			Animated.parallel([
				Animated.timing(this.state.inputWidth, {
					toValue: SCREEN_WIDTH,
					duration: 250,
				}),
				Animated.timing(this.state.inputIconPosition, {
					toValue: 100,
					duration: 250,
				}),
			]).start();
			this.setState({ inputFocused: false });
		}
	};

	private onCommentInputPressHandler = () => {
		if (!this.props.post.loading && this.containerViewRef.current) {
			this.containerViewRef.current.measure(
				(x: number, y: number, width: number, height: number) => {
					this.props.onAddComment!(height);
				},
			);

			if (!this.state.inputFocused) {
				Animated.parallel([
					Animated.timing(this.state.inputWidth, {
						toValue: SCREEN_WIDTH - Sizes.smartHorizontalScale(115),
						duration: 250,
					}),
					Animated.timing(this.state.inputIconPosition, {
						toValue: 0,
						duration: 250,
					}),
				]).start();
				this.setState({ inputFocused: true });
			}
		}
	};

	private onCommentInputChangeHandler = (comment: string) => {
		if (!this.props.post.loading) {
			this.setState({ comment });
		}
	};

	private onShowOffensiveContentHandler = () => {
		this.setState({
			viewOffensiveContent: true,
		});
	};

	private onShowPostOptionsHandler = () => {
		const { getText, showOptionsMenu, post } = this.props;

		const baseItems = [
			{
				label: getText('wall.post.menu.block.user'),
				icon: 'ios-close-circle',
				actionHandler: () => undefined,
			},
			{
				label: getText('wall.post.menu.report.problem'),
				icon: 'ios-warning',
				actionHandler: () => this.setState({ reportAProblem: true }),
			},
		];
		const deleteItem = {
			label: getText('wall.post.menu.delete.post'),
			icon: 'ios-trash',
			actionHandler: async () => {
				await this.props.onRemovePost(post.postId);
			},
		};

		const items = post.removable ? [...baseItems, deleteItem] : baseItems;
		showOptionsMenu(items);
	};

	private onShowFullTextHandler = () => {
		this.setState({
			fullTextVisible: true,
		});
	};

	private onSubmitCommentHandler = async () => {
		const { post, currentUser, comments, onSubmitComment } = this.props;

		const escapedCommentText = this.state.comment.replace(/\n/g, '\\n');

		if (comments) {
			const newComment = {
				commentId: uuid(),
				text: escapedCommentText,
				user: {
					userId: currentUser.userId,
					fullName: currentUser.fullName,
					avatar: currentUser.avatar,
				},
				timestamp: new Date(Date.now()),
				likes: [],
				likedByCurrentUser: false,
			};

			this.setState((currentState) => {
				return {
					sendCommentFailed: false,
					commentInputDisabled: true,
					comments: [...currentState.comments, newComment],
					comment: '',
				};
			}, Keyboard.dismiss);

			await onSubmitComment(escapedCommentText, post.postId);

			if (this.state.sendCommentFailed) {
				this.setState({
					comments: this.props.comments!,
				});
			}
		} else {
			this.setState(
				{
					sendCommentFailed: false,
					commentInputDisabled: true,
					comment: '',
				},
				Keyboard.dismiss,
			);

			await onSubmitComment(escapedCommentText, post.postId);

			if (this.state.sendCommentFailed) {
				this.setState({
					comments: this.props.comments!,
				});
			}
		}
	};

	private onRemoveCommentHandler = async (commId: string) => {
		const updatedComments = this.state.comments.filter((comm) => comm.commentId !== commId);

		this.setState({
			comments: updatedComments,
			sendCommentFailed: false,
		});

		await this.props.onRemoveComment(commId);

		if (this.state.sendCommentFailed) {
			this.setState({
				comments: this.props.comments!,
			});
		}
	};

	private onShowCommentOptionsHandler = (comment: IWallPostComment) => {
		const { showOptionsMenu, getText } = this.props;

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
					await this.onRemoveCommentHandler(comment.commentId);
				},
			},
		];

		showOptionsMenu(menuItems);
	};

	private onReportAProblemHandler = async (
		confirm: boolean,
		subject?: string,
		description?: string,
	) => {
		if (confirm && subject && description) {
			this.props.onReportProblem(subject, description);
		} else {
			this.setState({ reportAProblem: false });
		}
	};
}

interface IWallPostProps extends INavigationProps {
	post: IWallPostData;
	commentInput?: boolean;
	comments?: IWallPostComment[];
	keyboardRaised?: boolean;
	errors: IError[];
	onAddComment?: (cardHeight: number) => void;
}

export const WallPost: React.SFC<IWallPostProps> = ({
	post,
	commentInput,
	comments,
	keyboardRaised,
	errors,
	onAddComment,
	navigation,
}) => (
	<WithWallPost navigation={navigation}>
		{(wallPost) => (
			<WithLiking
				likedByCurrentUser={post.likedByCurrentUser}
				likes={post.likes}
				currentUserName={post.currentUserName}
				navigation={navigation}
				errors={errors}
			>
				{(likes) => (
					<WallPostCard
						post={post}
						commentInput={commentInput}
						comments={comments}
						keyboardRaised={keyboardRaised}
						onAddComment={onAddComment}
						{...wallPost.data}
						{...wallPost.actions}
						{...likes.data}
						{...likes.actions}
					/>
				)}
			</WithLiking>
		)}
	</WithWallPost>
);
