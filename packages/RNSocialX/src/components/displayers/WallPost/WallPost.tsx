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
	Likes,
	PostText,
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
import { IComment, INavigationProps, IOptimizedMedia, IWallPost } from '../../../types';
import { ReportProblemModal } from '../../modals/ReportProblemModal';

import styles, { SCREEN_WIDTH } from './WallPost.style';

type IProps = IWallPostProps &
	IWallPostEnhancedActions &
	IWallPostEnhancedData &
	IWithLikingEnhancedActions &
	IWithLikingEnhancedData &
	IWithNavigationHandlersEnhancedActions &
	INavigationProps;

interface IState {
	fullTextVisible: boolean;
	comment: string;
	inputFocused: boolean;
	inputWidth: Animated.Value;
	inputIconPosition: Animated.Value;
	viewOffensiveContent: boolean;
	reportAProblem: boolean;
}

class Component extends React.PureComponent<IProps, IState> {
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

	public render() {
		const {
			post,
			currentUser,
			commentInput,
			isCommentsScreen,
			keyboardRaised,
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
			navigation,
		} = this.props;

		const {
			postId,
			postText,
			location,
			taggedFriends,
			timestamp,
			owner,
			media,
			commentIds,
			likeIds,
			topCommentIds,
			likedByCurrentUser,
			numberOfSuperLikes,
			numberOfComments,
			numberOfWalletCoins,
			offensiveContent,
			creating,
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
				style={[styles.container, { opacity: creating ? 0.5 : 1 }]}
				ref={this.containerViewRef}
				// Measuring the element doesn't work on Android without this
				renderToHardwareTextureAndroid={true}
			>
				<UserDetails
					canBack={isCommentsScreen!}
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
										onMediaObjectView={(index: number) => onViewImage(media, index, postId)}
										onDoublePress={() => onDoubleTapLikePost(postId)}
										creating={creating}
										getText={getText}
									/>
								</View>
							)}
							<WallPostActions
								creating={creating}
								likedByCurrentUser={likedByCurrentUser}
								numberOfSuperLikes={numberOfSuperLikes}
								numberOfWalletCoins={numberOfWalletCoins}
								onLikePost={() => onLikePost(postId)}
								onCommentPress={() => onViewComments(postId, true)}
								onSuperLikePress={() => undefined}
								onWalletCoinsPress={() => undefined}
							/>
							{likeIds.length > 0 && (
								<Likes
									alias={likeIds[likeIds.length - 1]}
									total={likeIds.length}
									onUserPress={onViewUserProfile}
									onViewLikes={() => onViewLikes(likeIds)}
									getText={getText}
								/>
							)}
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
										navigation={navigation}
										getText={getText}
									/>
								))}
						</ScrollView>
						<KeyboardAvoidingView
							behavior="padding"
							keyboardVerticalOffset={50}
							enabled={Platform.OS === OS_TYPES.IOS}
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
										onMediaObjectView={(index: number) => onViewImage(media, index, postId)}
										onDoublePress={() => onDoubleTapLikePost(post.postId)}
										creating={creating}
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
							creating={creating}
							likedByCurrentUser={likedByCurrentUser}
							numberOfSuperLikes={numberOfSuperLikes}
							numberOfWalletCoins={numberOfWalletCoins}
							onLikePost={() => onLikePost(postId)}
							onCommentPress={() => onViewComments(postId, true)}
							onSuperLikePress={() => undefined}
							onWalletCoinsPress={() => undefined}
						/>
						{likeIds.length > 0 && (
							<Likes
								alias={likeIds[likeIds.length - 1]}
								total={likeIds.length}
								onUserPress={onViewUserProfile}
								onViewLikes={() => onViewLikes(likeIds)}
								getText={getText}
							/>
						)}
						<ViewAllComments
							numberOfComments={numberOfComments}
							onCommentPress={() => onViewComments(postId, false)}
							getText={getText}
						/>
						<TopComments
							commentIds={topCommentIds}
							onUserPress={onViewUserProfile}
							onCommentPress={() => onViewComments(postId, false)}
						/>
						{!!commentInput && !creating && (
							<CommentInput
								feed={true}
								comment={comment}
								avatar={currentUser.avatar}
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
		if (!this.props.post.creating && this.containerViewRef.current) {
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
		if (!this.props.post.creating) {
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
		const { post, showOptionsMenu, onRemoveComment, getText } = this.props;

		const menuItems = [
			{
				label: getText('comments.screen.advanced.menu.copy'),
				icon: 'ios-copy',
				actionHandler: () => Clipboard.setString(comment.text),
			},
			{
				label: getText('comments.screen.advanced.menu.delete'),
				icon: 'ios-trash',
				actionHandler: () => onRemoveComment(comment.commentId, post.postId),
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
	post: IWallPost;
	commentInput?: boolean;
	isCommentsScreen?: boolean;
	keyboardRaised?: boolean;
	onAddComment?: (cardHeight: number) => void;
}

export const WallPost: React.SFC<IWallPostProps> = (props) => (
	<WithWallPost>
		{(wallPost) => (
			<WithLiking likedByCurrentUser={props.post.likedByCurrentUser}>
				{(likes) => (
					<WithNavigationHandlers navigation={props.navigation}>
						{(nav) => (
							<Component
								{...props}
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
