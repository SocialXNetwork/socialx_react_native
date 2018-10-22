/**
 * TODO List:
 * 1. @Serkan: decide how we configure moment.js to avoid hack in method getFormattedPostTime.
 * 2. Implement delete option, available for own posts only!
 * 3. Decide if we can make an enhancer to deal with actions for this component. (for the sake of DRY)
 * 4. Take care of activating <ReportProblemModal/> with proper menu items, see method onShowOptions
 */

import moment from 'moment';
import * as React from 'react';
import {
	Alert,
	Animated,
	Keyboard,
	Linking,
	Platform,
	Text,
	View,
} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import { HeartAnimation, ReportProblemModal } from '../../';
import { OS_TYPES } from '../../../environment/consts';
import { IDotsMenuProps, IWallPostCardProps } from '../../../types';
import {
	BestComments,
	CommentInput,
	PostText,
	RecentLikes,
	UserDetails,
	ViewAllComments,
	WallPostActions,
	WallPostMedia,
	WarnOffensiveContent,
} from './';

import styles from './WallPostCard.style';

type IWallPostCardPropsType = IWallPostCardProps & IDotsMenuProps;

export interface IWallPostCardState {
	fullTextVisible: boolean;
	reportProblemModalVisible: boolean;
	displayOptions: boolean;
	disableNavigation: boolean;
	hidePostActionsAndComments: boolean;
	disableMediaFullScreen: boolean;
	heartAnimation: boolean;
	comment: string;
	inputFocused: boolean;
	inputBorderWidth: Animated.Value;
	inputAvatarSize: Animated.Value;
	inputAvatarRadius: Animated.Value;
	viewOffensiveContent: boolean;
}

export class WallPostCard extends React.Component<
	IWallPostCardPropsType,
	IWallPostCardState
> {
	public static defaultProps = {
		governanceVersion: false,
		numberOfSuperLikes: 0,
		numberOfComments: 0,
		numberOfWalletCoins: 0,
	};

	public state = {
		fullTextVisible: false,
		reportProblemModalVisible: false,
		displayOptions: this.props.displayDots
			? this.props.governanceVersion || true
			: false,
		disableNavigation: this.props.governanceVersion || false,
		hidePostActionsAndComments: this.props.governanceVersion || false,
		disableMediaFullScreen: this.props.governanceVersion || false,
		heartAnimation: false,
		comment: '',
		inputFocused: false,
		inputBorderWidth: new Animated.Value(0),
		inputAvatarSize: new Animated.Value(25),
		inputAvatarRadius: new Animated.Value(12.5),
		inputIconPosition: new Animated.Value(100),
		viewOffensiveContent: false,
	};

	private readonly containerViewRef: React.RefObject<View> = React.createRef();
	private keyboardDidHideListener: any;

	public componentDidMount() {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustNothing();
		}
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this.keyboardDidHide,
		);
	}

	public shouldComponentUpdate(
		nextProps: IWallPostCardProps,
		nextState: IWallPostCardState,
	) {
		return (
			this.state !== nextState ||
			this.props.postId !== nextProps.postId ||
			this.props.numberOfComments !== nextProps.numberOfComments ||
			this.props.bestComments !== nextProps.bestComments ||
			this.props.likes !== nextProps.likes ||
			this.props.likedByMe !== nextProps.likedByMe ||
			this.props.listLoading !== nextProps.listLoading ||
			this.props.likeError !== nextProps.likeError ||
			this.props.owner !== nextProps.owner
		);
	}

	public componentWillUnmount() {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
		this.keyboardDidHideListener.remove();
	}

	public render() {
		const {
			getText,
			timestamp,
			marginBottom,
			owner,
			taggedFriends,
			location,
			onUserPress,
			postText,
			numberOfComments,
			numberOfSuperLikes,
			numberOfWalletCoins,
			postId,
			onCommentPress,
			onLikePress,
			likedByMe,
			likeError,
			media,
			onImagePress,
			likes,
			bestComments,
			noInput,
			contentOffensive,
			listLoading,
			currentUserAvatarURL,
		} = this.props;

		const {
			viewOffensiveContent,
			inputAvatarRadius,
			inputAvatarSize,
			inputBorderWidth,
			inputIconPosition,
			displayOptions,
			reportProblemModalVisible,
			disableNavigation,
			fullTextVisible,
			hidePostActionsAndComments,
			heartAnimation,
			disableMediaFullScreen,
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
				{!displayOptions && (
					<ReportProblemModal
						visible={reportProblemModalVisible}
						confirmHandler={this.reportProblemHandler}
						declineHandler={this.toggleDeclineReportModal}
						marginBottom={marginBottom}
						getText={getText}
					/>
				)}
				<UserDetails
					user={owner}
					timestamp={timestamp}
					displayOptions={displayOptions}
					disableNavigation={disableNavigation}
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
				{media!.length > 0 && (
					<View style={styles.mediaContainer}>
						{heartAnimation && (
							<HeartAnimation
								ended={(status) => this.setState({ heartAnimation: !status })}
							/>
						)}
						{(!contentOffensive || viewOffensiveContent) && (
							<WallPostMedia
								mediaObjects={media}
								onMediaObjectView={(index: number) =>
									onImagePress(index, media, postId)
								}
								onLikeButtonPressed={this.onDoubleTapLikeHandler}
								noInteraction={disableMediaFullScreen}
								getText={getText}
							/>
						)}
						<WarnOffensiveContent
							getText={getText}
							onShowOffensiveContent={this.showOffensiveContent}
							visible={contentOffensive && !viewOffensiveContent}
						/>
					</View>
				)}
				{!hidePostActionsAndComments && (
					<WallPostActions
						likedByMe={likedByMe}
						likeError={likeError}
						numberOfSuperLikes={numberOfSuperLikes}
						numberOfWalletCoins={numberOfWalletCoins}
						onLikePress={() => onLikePress(likedByMe, postId)}
						onCommentPress={() => onCommentPress(postId, true)}
						onSuperLikePress={this.superLikeButtonPressedHandler}
						onWalletCoinsButtonPress={this.walletCoinsButtonPressedHandler}
						getText={getText}
					/>
				)}
				<RecentLikes
					likes={likes}
					onUserPress={onUserPress}
					getText={getText}
				/>
				<ViewAllComments
					numberOfComments={numberOfComments}
					onCommentPress={() => onCommentPress(postId, false)}
					getText={getText}
				/>
				<BestComments
					bestComments={bestComments}
					onUserPress={onUserPress}
					onCommentPress={() => onCommentPress(postId, false)}
				/>
				<CommentInput
					noInput={noInput}
					comment={comment}
					disabled={listLoading}
					avatarURL={currentUserAvatarURL}
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

	private reportProblemHandler = (reason: string, description: string) => {
		this.props.onReportProblem(reason, description);
		this.toggleDeclineReportModal();
	};

	private toggleDeclineReportModal = () => {
		this.setState((prevState) => ({
			reportProblemModalVisible: !prevState.reportProblemModalVisible,
		}));
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

	private onDoubleTapLikeHandler = async () => {
		const { likedByMe, postId, onLikePress } = this.props;

		if (likedByMe) {
			this.setState({ heartAnimation: true });
		} else {
			this.setState({ heartAnimation: true });
			onLikePress(likedByMe, postId);
		}
	};

	private onCommentInputChange = (comment: string) => {
		if (!this.props.listLoading) {
			this.setState({ comment });
		}
	};

	private onSubmitCommentHandler = async () => {
		const { postId, onSubmitComment } = this.props;
		const escapedComment = this.state.comment.replace(/\n/g, '\\n');
		this.setState({ comment: '' });
		Keyboard.dismiss();
		await onSubmitComment(escapedComment, postId);
	};

	private onCommentInputPress = () => {
		if (!this.props.listLoading && this.containerViewRef.current) {
			this.containerViewRef.current.measure(
				(x: number, y: number, width: number, height: number) => {
					this.props.onAddComment(0, height);
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
		const { getText, canDelete, showDotsMenuModal } = this.props;

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
				await this.props.onDeletePostPress(this.props.postId);
			},
		};

		const items = canDelete ? [...baseItems, deleteItem] : baseItems;
		showDotsMenuModal(items);
	};
}
