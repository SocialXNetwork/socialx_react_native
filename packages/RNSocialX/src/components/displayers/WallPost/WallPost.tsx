/**
 * TODO List:
 * 1. @Serkan: decide how we configure moment.js to avoid hack in method getFormattedPostTime.
 * 2. Take care of activating <ReportProblemModal/> with proper menu items, see method onShowOptions
 */

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
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import uuid from 'uuid/v4';

import { CommentCard, HeartAnimation } from '../../';
import { OS_TYPES } from '../../../environment/consts';
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

import { ActionTypes } from '../../../store/data/posts/Types';
import { INavigationProps, IWallPostComment, IWallPostData } from '../../../types';

import styles, { SCREEN_WIDTH } from './WallPost.style';

type IWallPostCardProps = IWallPostEnhancedActions & IWallPostEnhancedData;

interface IWallPostCardState {
	fullTextVisible: boolean;
	heartAnimation: boolean;
	comment: string;
	inputFocused: boolean;
	inputWidth: Animated.Value;
	inputIconPosition: Animated.Value;
	viewOffensiveContent: boolean;
	recentLikes: {
		first: string | null;
		second: string | null;
		total: number;
	};
	likePostFailed: boolean;
	likeCommentFailed: boolean;
	sendCommentFailed: boolean;
	commentInputDisabled: boolean;
	comments: IWallPostComment[];
}

class WallPostCard extends React.Component<IWallPostCardProps, IWallPostCardState> {
	public static getDerivedStateFromProps(
		nextProps: IWallPostCardProps,
		currentState: IWallPostCardState,
	) {
		const likePostFailed = !!nextProps.errors.find(
			(error) => error.type === ActionTypes.LIKE_POST || error.type === ActionTypes.UNLIKE_POST,
		);

		const likeCommentFailed = !!nextProps.errors.find(
			(error) =>
				error.type === ActionTypes.LIKE_COMMENT || error.type === ActionTypes.UNLIKE_COMMENT,
		);

		const sendCommentFailed = !!nextProps.errors.find(
			(error) =>
				error.type === ActionTypes.CREATE_COMMENT || error.type === ActionTypes.REMOVE_COMMENT,
		);

		if (likePostFailed !== currentState.likePostFailed) {
			return {
				likeFailed: true,
			};
		}

		if (likeCommentFailed !== currentState.likePostFailed) {
			return {
				likeCommentFailed: true,
			};
		}

		if (sendCommentFailed !== currentState.likePostFailed) {
			return {
				sendCommentFailed: true,
			};
		}

		return null;
	}

	public state = {
		fullTextVisible: false,
		heartAnimation: false,
		comment: '',
		inputFocused: false,
		inputWidth: new Animated.Value(SCREEN_WIDTH),
		inputIconPosition: new Animated.Value(100),
		viewOffensiveContent: false,
		recentLikes: {
			first:
				this.props.post.likes.length > 0
					? this.props.post.likes[this.props.post.likes.length - 1].userName
					: null,
			second:
				this.props.post.likes.length > 1
					? this.props.post.likes[this.props.post.likes.length - 2].userName
					: null,
			total: this.props.post.likes.length,
		},
		likePostFailed: false,
		likeCommentFailed: false,
		sendCommentFailed: false,
		commentInputDisabled: false,
		comments: this.props.comments!,
	};

	private readonly containerViewRef: React.RefObject<View> = React.createRef();
	private keyboardDidHideListener: any;
	private scrollRef: React.RefObject<ScrollView> = React.createRef();

	public componentDidMount() {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustNothing();
		}
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

	public componentWillUnmount() {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
		this.keyboardDidHideListener.remove();
	}

	public render() {
		const {
			post,
			skeletonPost,
			commentInput,
			keyboardRaised,
			onCommentsPress,
			onUserPress,
			onImagePress,
			onLikeComment,
			onGoBack,
			getText,
		} = this.props;

		const {
			postId,
			postText,
			location,
			taggedFriends,
			timestamp,
			owner,
			likedByCurrentUser,
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
			heartAnimation,
			comment,
			comments,
			likePostFailed,
			commentInputDisabled,
		} = this.state;

		const animationValues = {
			width: inputWidth,
			send: inputIconPosition,
		};

		return (
			<View style={styles.container} ref={this.containerViewRef}>
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
				{comments && (
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
									{heartAnimation && (
										<HeartAnimation
											ended={(status) => this.setState({ heartAnimation: !status })}
										/>
									)}
									<WallPostMedia
										mediaObjects={media}
										onMediaObjectView={(index: number) => onImagePress(index, media, postId)}
										onLikeButtonPressed={this.onDoubleTapLikeHandler}
										placeholder={!!skeletonPost}
										getText={getText}
									/>
								</View>
							)}
							<WallPostActions
								likedByCurrentUser={likedByCurrentUser}
								likeFailed={likePostFailed}
								numberOfSuperLikes={numberOfSuperLikes}
								numberOfWalletCoins={numberOfWalletCoins}
								onLikePress={this.onLikePressHandler}
								onCommentPress={() => onCommentsPress(post, true)}
								onSuperLikePress={() => undefined}
								onWalletCoinsButtonPress={() => undefined}
								getText={getText}
							/>
							<RecentLikes
								recentLikes={this.state.recentLikes}
								onUserPress={onUserPress}
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
							}
						</ScrollView>
						<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
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
								{heartAnimation && (
									<HeartAnimation ended={(status) => this.setState({ heartAnimation: !status })} />
								)}
								{(!offensiveContent || viewOffensiveContent) && (
									<WallPostMedia
										mediaObjects={media}
										onMediaObjectView={(index: number) => onImagePress(index, media, postId)}
										onLikeButtonPressed={this.onDoubleTapLikeHandler}
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
							likedByCurrentUser={likedByCurrentUser}
							likeFailed={likePostFailed}
							numberOfSuperLikes={numberOfSuperLikes}
							numberOfWalletCoins={numberOfWalletCoins}
							onLikePress={this.onLikePressHandler}
							onCommentPress={() => onCommentsPress(post, true)}
							onSuperLikePress={() => undefined}
							onWalletCoinsButtonPress={() => undefined}
							getText={getText}
						/>
						<RecentLikes
							recentLikes={this.state.recentLikes}
							onUserPress={onUserPress}
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
						{commentInput && (
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
					toValue: SCREEN_WIDTH - 80,
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
						toValue: SCREEN_WIDTH - 115,
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

	private onLikePressHandler = async () => {
		const { post, onLikePost } = this.props;
		const { postId, currentUserName, likedByCurrentUser, likes } = post;
		const { total } = this.state.recentLikes;

		if (!likedByCurrentUser) {
			this.setState((currentState) => {
				return {
					likePostFailed: false,
					recentLikes: {
						second: currentState.recentLikes.first,
						first: currentUserName,
						total: currentState.recentLikes.total + 1,
					},
				};
			});
		} else {
			if (total === 1) {
				this.setState((currentState) => {
					return {
						likePostFailed: false,
						recentLikes: {
							...currentState.recentLikes,
							first: null,
							total: 0,
						},
					};
				});
			} else if (total === 2) {
				this.setState((currentState) => {
					const { first, second } = currentState.recentLikes;
					return {
						likePostFailed: false,
						recentLikes: {
							first: first === currentUserName ? second : first,
							second: null,
							total: 1,
						},
					};
				});
			} else if (total > 2) {
				this.setState((currentState) => {
					const { first, second } = currentState.recentLikes;
					return {
						likePostFailed: false,
						recentLikes: {
							first: first === currentUserName ? second : first,
							second: second === currentUserName ? likes[likes.length - 3].userName : second,
							total: currentState.recentLikes.total - 1,
						},
					};
				});
			}
		}

		await onLikePost(likedByCurrentUser, postId);

		if (this.state.likePostFailed) {
			this.setState({
				recentLikes: {
					first: likes.length > 0 ? likes[likes.length - 1].userName : null,
					second: likes.length > 1 ? likes[likes.length - 2].userName : null,
					total: likes.length,
				},
			});
		}
	};

	private onDoubleTapLikeHandler = async () => {
		const { post, onDoubleTapLike } = this.props;
		const { postId, currentUserName, likedByCurrentUser } = post;

		if (!likedByCurrentUser) {
			this.setState((currentState) => {
				return {
					heartAnimation: true,
					likePostFailed: false,
					recentLikes: {
						second: currentState.recentLikes.first,
						first: currentUserName,
						total: currentState.recentLikes.total + 1,
					},
				};
			});
			await onDoubleTapLike(postId);
		} else {
			this.setState({ heartAnimation: true });
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
				actionHandler: () => undefined,
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
					likeCommentFailed: false,
					commentInputDisabled: true,
					comments: [...currentState.comments, newComment],
					comment: '',
				};
			}, Keyboard.dismiss);

			await onSubmitComment(escapedCommentText, post.postId);

			if (this.state.likeCommentFailed) {
				this.setState({
					comments: this.props.comments!,
				});
			}
		} else {
			await onSubmitComment(escapedCommentText, post.postId);
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
}

interface IWallPostProps extends INavigationProps {
	post: IWallPostData;
	commentInput?: boolean;
	comments?: IWallPostComment[];
	keyboardRaised?: boolean;
	onAddComment?: (cardHeight: number) => void;
}

export const WallPost: React.SFC<IWallPostProps> = ({
	post,
	commentInput,
	comments,
	keyboardRaised,
	onAddComment,
	navigation,
}) => (
	<WithWallPost navigation={navigation}>
		{({ data, actions }) => (
			<WallPostCard
				post={post}
				commentInput={commentInput}
				comments={comments}
				keyboardRaised={keyboardRaised}
				onAddComment={onAddComment}
				{...data}
				{...actions}
			/>
		)}
	</WithWallPost>
);
