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
	IWithNavigationHandlersEnhancedActions,
	WithLiking,
	WithNavigationHandlers,
} from '../../../enhancers/intermediary';

import { OS_TYPES } from '../../../environment/consts';
import { Sizes } from '../../../environment/theme';
import { IComment, IError, INavigationProps, IWallPostData } from '../../../types';
import { ReportProblemModal } from '../../modals/ReportProblemModal';

import styles, { SCREEN_WIDTH } from './WallPost.style';

type IWallPostCardProps = IWallPostEnhancedActions &
	IWallPostEnhancedData &
	IWithLikingEnhancedActions &
	IWithLikingEnhancedData &
	IWithNavigationHandlersEnhancedActions;

interface IWallPostCardState {
	fullTextVisible: boolean;
	comment: string;
	inputFocused: boolean;
	inputWidth: Animated.Value;
	inputIconPosition: Animated.Value;
	viewOffensiveContent: boolean;
	reportAProblem: boolean;
}

class WallPostCard extends React.Component<IWallPostCardProps, IWallPostCardState> {
	public state = {
		fullTextVisible: false,
		comment: '',
		inputFocused: false,
		inputWidth: new Animated.Value(SCREEN_WIDTH),
		inputIconPosition: new Animated.Value(100),
		viewOffensiveContent: false,
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

	public componentDidUpdate() {
		if (this.props.post.postId === '7fb367dc-8e0e-423c-b38e-9921fb40d55a') {
			console.log(this.props.post.postText, this.props.post.commentIds);
		}
	}

	public render() {
		const {
			post,
			currentUser,
			skeletonPost,
			commentInput,
			isCommentsScreen,
			keyboardRaised,
			optLikedByCurrentUser,
			likeDisabled,
			recentLikes,
			animationProgress,
			heartAnimation,
			onLikePost,
			onDoubleTapLikePost,
			onViewLikes,
			onLikeComment,
			onViewComments,
			onViewImage,
			onViewUserProfile,
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
			commentIds,
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
					canBack={isCommentsScreen}
					user={owner}
					timestamp={timestamp}
					taggedFriends={taggedFriends}
					location={location}
					onUserPress={onViewUserProfile}
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
				{isCommentsScreen && (
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
										media={media}
										onMediaObjectView={(index: number) => onViewImage(media, index, post)}
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
								onCommentPress={() => onViewComments(post.postId, true)}
								onSuperLikePress={() => undefined}
								onWalletCoinsPress={() => undefined}
							/>
							<RecentLikes
								recentLikes={recentLikes}
								onUserPress={onViewUserProfile}
								onViewLikes={onViewLikes}
								getText={getText}
							/>
							{commentIds.length > 0 &&
								commentIds.map((id) => (
									<CommentCard
										key={id}
										commentId={id}
										alias={currentUser.userName}
										pub={currentUser.pub}
										onLikeComment={onLikeComment}
										onUserPress={onViewUserProfile}
										onShowOptionsMenu={this.onShowCommentOptionsHandler}
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
								onCommentInputChange={this.onCommentInputChangeHandler}
								onCommentInputPress={() => undefined}
								onSubmitComment={this.onSubmitCommentHandler}
								getText={getText}
							/>
						</KeyboardAvoidingView>
					</React.Fragment>
				)}
				{!isCommentsScreen && (
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
										media={media}
										onMediaObjectView={(index: number) => onViewImage(media, index, post)}
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
							onCommentPress={() => onViewComments(post.postId, true)}
							onSuperLikePress={() => undefined}
							onWalletCoinsPress={() => undefined}
						/>
						<RecentLikes
							recentLikes={recentLikes}
							onUserPress={onViewUserProfile}
							onViewLikes={onViewLikes}
							getText={getText}
						/>
						<ViewAllComments
							numberOfComments={numberOfComments}
							onCommentPress={() => onViewComments(post.postId, false)}
							getText={getText}
						/>
						<TopComments
							topComments={topComments}
							onUserPress={onViewUserProfile}
							onCommentPress={() => onViewComments(post.postId, false)}
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

	private onSubmitCommentHandler = () => {
		const { post, currentUser, onSubmitComment } = this.props;
		const escapedCommentText = this.state.comment.replace(/\n/g, '\\n');

		this.setState({ comment: '' }, Keyboard.dismiss);
		onSubmitComment(escapedCommentText, currentUser.userId, currentUser.pub, post.postId);
	};

	private onShowCommentOptionsHandler = (comment: IComment) => {
		const { post, currentUser, showOptionsMenu, onRemoveComment, getText } = this.props;

		const menuItems = [
			{
				label: getText('comments.screen.advanced.menu.copy'),
				icon: 'ios-copy',
				actionHandler: () => Clipboard.setString(comment.text),
			},
			{
				label: getText('comments.screen.advanced.menu.delete'),
				icon: 'ios-trash',
				actionHandler: () =>
					onRemoveComment(
						comment.text,
						currentUser.userId,
						currentUser.pub,
						post.postId,
						comment.commentId,
					),
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
	isCommentsScreen?: boolean;
	keyboardRaised?: boolean;
	errors: IError[];
	onAddComment?: (cardHeight: number) => void;
}

export const WallPost: React.SFC<IWallPostProps> = ({
	post,
	commentInput,
	isCommentsScreen = false,
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
					<WithNavigationHandlers navigation={navigation}>
						{(nav) => (
							<WallPostCard
								post={post}
								commentInput={commentInput}
								isCommentsScreen={isCommentsScreen}
								keyboardRaised={keyboardRaised}
								onAddComment={onAddComment}
								{...wallPost.data}
								{...wallPost.actions}
								{...likes.data}
								{...likes.actions}
								{...nav.actions}
							/>
						)}
					</WithNavigationHandlers>
				)}
			</WithLiking>
		)}
	</WithWallPost>
);
