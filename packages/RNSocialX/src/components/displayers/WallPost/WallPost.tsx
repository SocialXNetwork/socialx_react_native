/**
 * TODO List:
 * 1. @Serkan: decide how we configure moment.js to avoid hack in method getFormattedPostTime.
 * 2. Implement delete option, available for own posts only!
 * 3. Decide if we can make an enhancer to deal with actions for this component. (for the sake of DRY)
 * 4. Take care of activating <ReportProblemModal/> with proper menu items, see method onShowOptions
 */

import moment from 'moment';
import * as React from 'react';
import { Alert, Animated, Keyboard, Linking, Platform, Text, View } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import { HeartAnimation } from '../../';
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

import { INavigationProps, IWallPostData } from '../../../types';
import styles from './WallPost.style';

type IWallPostCardProps = IWallPostEnhancedActions & IWallPostEnhancedData;

export interface IWallPostCardState {
	fullTextVisible: boolean;
	heartAnimation: boolean;
	comment: string;
	inputFocused: boolean;
	inputBorderWidth: Animated.Value;
	inputAvatarSize: Animated.Value;
	inputAvatarRadius: Animated.Value;
	viewOffensiveContent: boolean;
	recentLikes: {
		first: string | null;
		second: string | null;
		total: number;
	};
	likeFailed: boolean;
}

class WallPostCard extends React.Component<IWallPostCardProps, IWallPostCardState> {
	public static defaultProps = {
		governanceVersion: false,
		numberOfSuperLikes: 0,
		numberOfComments: 0,
		numberOfWalletCoins: 0,
	};

	public static getDerivedStateFromProps(
		nextProps: IWallPostCardProps,
		currentState: IWallPostCardState,
	) {
		if (nextProps.likeFailed !== currentState.likeFailed) {
			return {
				likeFailed: true,
			};
		}

		return null;
	}

	public state = {
		fullTextVisible: false,
		heartAnimation: false,
		comment: '',
		inputFocused: false,
		inputBorderWidth: new Animated.Value(0),
		inputAvatarSize: new Animated.Value(25),
		inputAvatarRadius: new Animated.Value(12.5),
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
		likeFailed: false,
	};

	private readonly containerViewRef: React.RefObject<View> = React.createRef();
	private keyboardDidHideListener: any;

	public componentDidMount() {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustNothing();
		}
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

	public shouldComponentUpdate(nextProps: IWallPostCardProps, nextState: IWallPostCardState) {
		return this.state !== nextState || this.props.post !== nextProps.post;
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
			likeFailed,
			onCommentsPress,
			onUserPress,
			onImagePress,
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
			inputAvatarRadius,
			inputAvatarSize,
			inputBorderWidth,
			inputIconPosition,
			fullTextVisible,
			heartAnimation,
			comment,
		} = this.state;

		const formatedTimestamp = this.getFormattedPostTime(timestamp);
		const animationValues = {
			border: inputBorderWidth,
			size: inputAvatarSize,
			radius: inputAvatarRadius,
			send: inputIconPosition,
		};

		return (
			<View style={styles.container} ref={this.containerViewRef}>
				<UserDetails
					user={owner}
					timestamp={timestamp}
					taggedFriends={taggedFriends}
					location={location}
					onUserPress={onUserPress}
					onShowOptions={this.onShowOptions}
					getText={getText}
				/>
				<PostText
					text={postText}
					fullTextVisible={fullTextVisible}
					toggleShowFullText={this.toggleShowFullText}
					handleHashTag={this.handleHashTag}
					handleUserTag={this.handleUserTag}
					launchExternalUrl={this.launchExternalURL}
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
							onShowOffensiveContent={this.showOffensiveContent}
							visible={offensiveContent && !viewOffensiveContent}
						/>
					</View>
				)}
				<WallPostActions
					likedByCurrentUser={likedByCurrentUser}
					likeFailed={likeFailed}
					numberOfSuperLikes={numberOfSuperLikes}
					numberOfWalletCoins={numberOfWalletCoins}
					onLikePress={this.onLikePressHandler}
					onCommentPress={() => onCommentsPress(postId, true)}
					onSuperLikePress={this.superLikeButtonPressedHandler}
					onWalletCoinsButtonPress={this.walletCoinsButtonPressedHandler}
					getText={getText}
				/>
				<RecentLikes
					recentLikes={this.state.recentLikes}
					onUserPress={onUserPress}
					getText={getText}
				/>
				<ViewAllComments
					numberOfComments={numberOfComments}
					onCommentPress={() => onCommentsPress(postId, false)}
					getText={getText}
				/>
				<TopComments
					topComments={topComments}
					onUserPress={onUserPress}
					onCommentPress={() => onCommentsPress(postId, false)}
				/>
				<CommentInput
					commentInput={commentInput}
					comment={comment}
					disabled={loading}
					avatar={currentUserAvatar}
					animationValues={animationValues}
					onCommentInputChange={this.onCommentInputChange}
					onCommentInputPress={this.onCommentInputPress}
					onSubmitComment={this.onSubmitCommentHandler}
					getText={getText}
				/>
				<View style={styles.postedTimeContainer}>
					<Text style={styles.postedTime}>{formatedTimestamp}</Text>
				</View>
			</View>
		);
	}

	private keyboardDidHide = () => {
		if (this.state.inputFocused) {
			Animated.parallel([
				Animated.timing(this.state.inputBorderWidth, {
					toValue: 0,
					duration: 250,
				}),
				Animated.timing(this.state.inputAvatarSize, {
					toValue: 25,
					duration: 250,
				}),
				Animated.timing(this.state.inputAvatarRadius, {
					toValue: 12.5,
					duration: 250,
				}),
				Animated.spring(this.state.inputIconPosition, {
					toValue: 100,
				}),
			]).start();
			this.setState({ inputFocused: false });
		}
	};

	private onLikePressHandler = async () => {
		const { post, onLikePress } = this.props;
		const { postId, currentUserName, likedByCurrentUser, likes } = post;
		const { total } = this.state.recentLikes;

		if (!likedByCurrentUser) {
			this.setState((currentState) => {
				return {
					likeFailed: false,
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
						likeFailed: false,
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
						likeFailed: false,
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
						likeFailed: false,
						recentLikes: {
							first: first === currentUserName ? second : first,
							second: second === currentUserName ? likes[likes.length - 3].userName : second,
							total: currentState.recentLikes.total - 1,
						},
					};
				});
			}
		}

		await onLikePress(likedByCurrentUser, postId);

		if (this.state.likeFailed) {
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
		const { post, onLikePress } = this.props;
		const { likedByCurrentUser, postId } = post;

		if (likedByCurrentUser) {
			this.setState({ heartAnimation: true });
		} else {
			this.setState({ heartAnimation: true });
			onLikePress(likedByCurrentUser, postId);
		}
	};

	private onCommentInputChange = (comment: string) => {
		if (!this.props.post.loading) {
			this.setState({ comment });
		}
	};

	private onSubmitCommentHandler = async () => {
		const {
			post: { postId },
			onSubmitComment,
		} = this.props;
		const escapedComment = this.state.comment.replace(/\n/g, '\\n');

		this.setState({ comment: '' });
		Keyboard.dismiss();

		await onSubmitComment(escapedComment, postId);
	};

	private onCommentInputPress = () => {
		if (!this.props.post.loading && this.containerViewRef.current) {
			this.containerViewRef.current.measure(
				(x: number, y: number, width: number, height: number) => {
					this.props.onAddComment!(height);
				},
			);
			if (!this.state.inputFocused) {
				Animated.parallel([
					Animated.timing(this.state.inputBorderWidth, {
						toValue: 1,
						duration: 250,
					}),
					Animated.timing(this.state.inputAvatarSize, {
						toValue: 35,
						duration: 250,
					}),
					Animated.timing(this.state.inputAvatarRadius, {
						toValue: 17.5,
						duration: 250,
					}),
					Animated.spring(this.state.inputIconPosition, {
						toValue: 0,
					}),
				]).start();
				this.setState({ inputFocused: true });
			}
		}
	};

	private getFormattedPostTime = (timestamp: Date) => {
		const diff = moment(timestamp).fromNow();
		const split = diff.split(/([0-9]+)/).filter(Boolean);
		const value = split[0];
		let type = split[1];

		switch (type) {
			case ' s': {
				type = +value === 1 ? 'second' : 'seconds';
				break;
			}
			case ' m': {
				type = +value === 1 ? 'minute' : 'minutes';
				break;
			}
			case ' h': {
				type = +value === 1 ? 'hour' : 'hours';
				break;
			}
			case ' d': {
				type = +value === 1 ? 'day' : 'days';
				break;
			}
			case ' month': {
				type = +value === 1 ? 'month' : 'months';
				break;
			}
			default:
				break;
		}

		split[0] = value;
		split[1] = type;
		return split
			.join(' ')
			.concat(' ago')
			.toUpperCase();
	};

	private showOffensiveContent = () => {
		this.setState({
			viewOffensiveContent: true,
		});
	};

	private onShowOptions = () => {
		const { getText, showOptionsMenu, post } = this.props;

		const baseItems = [
			{
				label: getText('wall.post.menu.block.user'),
				icon: 'ios-close-circle',
				// actionHandler: () => this.props.onBlockUser(this.props.owner.userId),
				actionHandler: () => undefined,
			},
			{
				label: getText('wall.post.menu.report.problem'),
				icon: 'ios-warning',
				// actionHandler: () => {
				// 	this.setState({
				// 		reportProblemModalVisible: true,
				// 	});
				// },
				actionHandler: () => undefined,
			},
		];
		const deleteItem = {
			label: getText('wall.post.menu.delete.post'),
			icon: 'ios-trash',
			actionHandler: async () => {
				await this.props.onDeletePostPress(post.postId);
			},
		};

		const items = post.removable ? [...baseItems, deleteItem] : baseItems;
		showOptionsMenu(items);
	};

	private toggleShowFullText = () => {
		this.setState({
			fullTextVisible: true,
		});
	};

	private handleHashTag = (hashTag: string) => {
		Alert.alert('Hashtags coming soon.' + hashTag);
	};

	private handleUserTag = (userTag: string) => {
		Alert.alert('Tags coming soon.' + userTag);
	};

	private launchExternalURL = async (url: string) => {
		try {
			const supported = await Linking.canOpenURL(url);
			if (!supported) {
				Alert.alert('Cannot open link, URL not supported');
			} else {
				return Linking.openURL(url);
			}
		} catch (ex) {
			console.log(ex);
		}
	};

	private superLikeButtonPressedHandler = () => {
		Alert.alert('Coming soon.');
	};

	private walletCoinsButtonPressedHandler = () => {
		Alert.alert('Comming soon.');
	};
}

interface IWallPostProps extends INavigationProps {
	post: IWallPostData;
	commentInput: boolean;
	onAddComment: (cardHeight: number) => void;
}

export const WallPost: React.SFC<IWallPostProps> = ({
	post,
	commentInput,
	onAddComment,
	navigation,
}) => (
	<WithWallPost navigation={navigation}>
		{({ data, actions }) => (
			<WallPostCard
				post={post}
				commentInput={commentInput}
				onAddComment={onAddComment}
				{...data}
				{...actions}
			/>
		)}
	</WithWallPost>
);
