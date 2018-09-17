/**
 * TODO List:
 * 1. @Serkan: decide how we configure moment.js to avoid hack in method getFormattedPostTime.
 * 2. @Alex: check prop suggested. Is this used here?
 * 3. @Alex: check prop noInput. Should this be passed to CommentInput?
 */

import moment from 'moment';
import * as React from 'react';
import {Alert, Animated, Keyboard, Linking, Platform, Text, View} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import {HeartAnimation, ISuggestionCardItem, ReportProblemModal} from '../../';
import {OS_TYPES} from '../../../environment/consts';
import {IMediaProps, IPostLike, IResizeProps, ISimpleComment, ITranslatedProps} from '../../../types';
import {
	BestComments,
	CommentInput,
	PostText,
	RecentLikes,
	UserDetails,
	ViewAllComments,
	WallPostActions,
	WallPostMedia,
} from './';
// import {TooltipDots, TooltipItem} from '../DotsWithTooltips';
import styles from './WallPostCard.style';

export interface ISimpleWallPostCardProps {
	id: string;
	postText: false | string;
	location: false | string;
	taggedFriends: Array<{fullName: string}>;
	timestamp: Date;
	owner: any; // IUserQuery; // TODO: @Alex fix typing after backend is ready
	currentUser: any; // IUserQuery; // @Alex TODO: fix typing after backend is ready
}

export interface IWallPostCardProps extends ISimpleWallPostCardProps, ITranslatedProps, IResizeProps {
	governanceVersion: boolean;
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
	onImagePress: (index: number) => void;
	onLikeButtonPress: () => void;
	onDeletePress: (postId: string) => void;
	onUserPress: (userId: string) => void;
	onCommentPress: (startComment: boolean) => void;
	onAddComment: (height: number) => void;
	likedByMe: boolean;
	canDelete: boolean;
	media: IMediaProps[];
	likes: IPostLike[];
	bestComments: ISimpleComment[];
	listLoading: boolean;
	suggested: undefined | ISuggestionCardItem[];
	noInput: boolean;
}

export interface IWallPostCardState {
	fullTextVisible: boolean;
	reportProblemModalVisible: boolean;
	hideAdvancedMenu: boolean;
	hideGoToUserProfile: boolean;
	hidePostActionsAndComments: boolean;
	disableMediaFullScreen: boolean;
	heartAnimation: boolean;
	comment: string;
	inputFocused: boolean;
	inputBorderWidth: Animated.Value;
	inputAvatarWidth: Animated.Value;
	inputAvatarHeight: Animated.Value;
}

export class WallPostCard extends React.Component<IWallPostCardProps, IWallPostCardState> {
	public static defaultProps = {
		governanceVersion: false,
		numberOfSuperLikes: 0,
		numberOfComments: 0,
		numberOfWalletCoins: 0,
		canDelete: false,
		likedByMe: false,
		media: false,
		suggested: undefined,
		taggedFriends: [],
		location: false,
		postText: false,
		likes: [],
	};

	public state = {
		fullTextVisible: false,
		reportProblemModalVisible: false,
		hideAdvancedMenu: this.props.governanceVersion || false,
		hideGoToUserProfile: this.props.governanceVersion || false,
		hidePostActionsAndComments: this.props.governanceVersion || false,
		disableMediaFullScreen: this.props.governanceVersion || false,
		heartAnimation: false,
		comment: '',
		inputFocused: false,
		inputBorderWidth: new Animated.Value(0),
		inputAvatarWidth: new Animated.Value(25),
		inputAvatarHeight: new Animated.Value(25),
	};

	private readonly containerViewRef: React.RefObject<View> = React.createRef();
	private keyboardDidHideListener: any;

	public componentDidMount() {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustNothing();
		}
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

	public shouldComponentUpdate(
		nextProps: Readonly<IWallPostCardProps>,
		nextState: Readonly<IWallPostCardState>,
	): boolean {
		return (
			this.props.id !== nextProps.id ||
			this.props.numberOfComments !== nextProps.numberOfComments ||
			this.state.reportProblemModalVisible !== nextState.reportProblemModalVisible ||
			this.state.fullTextVisible !== nextState.fullTextVisible ||
			this.state.heartAnimation !== nextState.heartAnimation ||
			this.state.comment !== nextState.comment ||
			this.state.inputFocused !== nextState.inputFocused ||
			this.state.inputBorderWidth !== nextState.inputBorderWidth ||
			this.state.inputAvatarWidth !== nextState.inputAvatarHeight ||
			this.state.inputAvatarHeight !== nextState.inputAvatarHeight ||
			this.props.listLoading !== nextProps.listLoading
		);
	}

	public componentWillUnmount() {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
		this.keyboardDidHideListener.remove();
	}

	public render() {
		const timeStampDate = moment(this.props.timestamp).format('MMM DD');
		const timeStampHour = moment(this.props.timestamp).format('hh:mma');
		const formatedTimestamp = this.getFormattedPostTime(this.props.timestamp);
		const animationValues = {
			border: this.state.inputBorderWidth,
			width: this.state.inputAvatarWidth,
			height: this.state.inputAvatarHeight,
		};

		return (
			<View style={styles.container} ref={this.containerViewRef}>
				{!this.state.hideAdvancedMenu && (
					<ReportProblemModal
						visible={this.state.reportProblemModalVisible}
						confirmHandler={this.reportProblemHandler}
						declineHandler={this.toggleDeclineReportModal}
						marginBottom={this.props.marginBottom}
						getText={this.props.getText}
					/>
				)}
				<UserDetails
					user={this.props.owner}
					timeStampDate={timeStampDate}
					timeStampHour={timeStampHour}
					hideAdvancedMenu={this.state.hideAdvancedMenu}
					hideGoToUserProfile={this.state.hideGoToUserProfile}
					taggedFriends={this.props.taggedFriends}
					location={this.props.location}
					onUserPress={this.props.onUserPress}
					getText={this.props.getText}
				/>
				<PostText
					text={this.props.postText}
					fullTextVisible={this.state.fullTextVisible}
					getText={this.props.getText}
					toggleShowFullText={this.toggleShowFullText}
					handleHashTag={this.handleHashTag}
					handleUserTag={this.handleUserTag}
					launchExternalUrl={this.launchExternalURL}
				/>
				{!this.state.hidePostActionsAndComments && (
					<WallPostActions
						likedByMe={this.props.likedByMe}
						numberOfSuperLikes={this.props.numberOfSuperLikes}
						numberOfWalletCoins={this.props.numberOfWalletCoins}
						onLikePress={this.props.onLikeButtonPress}
						onCommentsPress={() => this.props.onCommentPress(false)}
						onSuperLikePress={this.superLikeButtonPressedHandler}
						onWalletCoinsButtonPress={this.walletCoinsButtonPressedHandler}
						getText={this.props.getText}
					/>
				)}
				<View>
					{this.state.heartAnimation && <HeartAnimation ended={(status) => this.setState({heartAnimation: !status})} />}
					{this.props.media && (
						<WallPostMedia
							mediaObjects={this.props.media}
							onMediaObjectView={this.props.onImagePress}
							onLikeButtonPressed={this.onDoubleTapLikeHandler}
							noInteraction={this.state.disableMediaFullScreen}
						/>
					)}
				</View>
				<RecentLikes likes={this.props.likes} onUserPress={this.props.onUserPress} getText={this.props.getText} />
				<ViewAllComments
					numberOfComments={this.props.numberOfComments}
					onCommentPress={this.props.onCommentPress}
					getText={this.props.getText}
				/>
				<BestComments
					bestComments={this.props.bestComments}
					onUserPress={this.props.onUserPress}
					onCommentPress={this.props.onCommentPress}
				/>
				<CommentInput
					noInput={false}
					comment={this.state.comment}
					disabled={this.props.listLoading}
					avatarURL={this.props.currentUser.avatarURL}
					animationValues={animationValues}
					onCommentInputChange={this.onCommentInputChange}
					onCommentInputPress={this.onCommentInputPress}
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
				Animated.timing(this.state.inputAvatarWidth, {
					toValue: 25,
					duration: 250,
				}),
				Animated.timing(this.state.inputAvatarHeight, {
					toValue: 25,
					duration: 250,
				}),
			]).start();
			this.setState({inputFocused: false});
		}
	};

	private reportProblemHandler = () => {
		this.toggleDeclineReportModal();
	};

	private toggleDeclineReportModal = () => {
		this.setState((prevState) => {
			return {
				reportProblemModalVisible: !prevState.reportProblemModalVisible,
			};
		});
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
		if (this.props.likedByMe) {
			this.setState({heartAnimation: true});
		} else {
			this.setState({heartAnimation: true});
			this.props.onLikeButtonPress();
		}
	};

	private onCommentInputChange = (comment: string) => {
		if (!this.props.listLoading) {
			this.setState({comment});
		}
	};

	private onCommentInputPress = () => {
		if (!this.props.listLoading && this.containerViewRef.current) {
			this.containerViewRef.current.measure((x: number, y: number, width: number, height: number) => {
				this.props.onAddComment(height);
			});
			if (!this.state.inputFocused) {
				Animated.parallel([
					Animated.timing(this.state.inputBorderWidth, {
						toValue: 2,
						duration: 350,
					}),
					Animated.timing(this.state.inputAvatarWidth, {
						toValue: 35,
						duration: 350,
					}),
					Animated.timing(this.state.inputAvatarHeight, {
						toValue: 35,
						duration: 350,
					}),
				]).start();
				this.setState({inputFocused: true});
			}
		}
	};

	private getFormattedPostTime = (timestamp: Date) => {
		const diff = moment(timestamp).fromNow();
		const split = diff.split(/([0-9]+)/).filter(Boolean);
		const value = split[0];
		let type = split[1];

		switch (type) {
			case 's': {
				type = +value === 1 ? 'SECOND' : 'SECONDS';
				break;
			}
			case 'm': {
				type = +value === 1 ? 'MINUTE' : 'MINUTES';
				break;
			}
			case 'h': {
				type = +value === 1 ? 'HOUR' : 'HOURS';
				break;
			}
			case 'd': {
				type = +value === 1 ? 'DAY' : 'DAYS';
				break;
			}
			case 'month': {
				type = +value === 1 ? 'MONTH' : 'MONTHS';
				break;
			}
			default:
				break;
		}

		split[0] = value;
		split[1] = type;
		return split.join(' ').concat(' AGO');
	};
}
