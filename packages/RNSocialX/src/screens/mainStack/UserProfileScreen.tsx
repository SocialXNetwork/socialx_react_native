/**
 * TODO list:
 * 1. Props data: currentUser, visitedUser
 * 2. Props actions: addFriend, likePost, unlikePost, refreshUser
 * 3. @Serkan: Take a look over onViewProfilePhotoHandler function, it uses ipfs
 */

import {ActionSheet} from 'native-base';
import * as React from 'react';
import {Alert, Animated, Dimensions, View} from 'react-native';
import {AnimatedValue, NavigationScreenProp} from 'react-navigation';
import {DataProvider} from 'recyclerlistview';
// import {ipfsConfig as base} from 'configuration';
import uuidv4 from 'uuid/v4';

import {CloseButton} from '../../components';
import {PROFILE_TAB_ICON_TYPES} from '../../environment/consts';
import {IMediaProps, ITranslatedProps} from '../../types';
import {UserProfileScreenView} from './UserProfileScreen.view';

import {headerDefaultStyles} from './UserProfileScreen.style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_PAGE_SIZE = 20;

interface IUserProfileScreenProps extends ITranslatedProps {
	navigation: NavigationScreenProp<any>;
	currentUser: any;
	visitedUser: any;
	addFriend: (userId: string) => void;
	likePost: (postId: string) => void;
	unlikePost: (postId: string) => void;
	refreshUser: () => void;
}

interface IUserProfileScreenState {
	refreshing: boolean;
	gridMediaProvider: DataProvider;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
}

export class UserProfileScreen extends React.Component<IUserProfileScreenProps, IUserProfileScreenState> {
	public static navigationOptions = (options: any) => ({
		title: 'PROFILE',
		headerLeft: <View />,
		headerRight: (
			<View style={{flexDirection: 'row'}}>
				// @ts-ignore
				<CloseButton navigation={options.navigation} />
			</View>
		),
		headerStyle: headerDefaultStyles,
	});

	private lastLoadedPhotoIndex = 0;
	private readonly gridPhotosProvider: DataProvider;

	constructor(props: IUserProfileScreenProps) {
		super(props);
		this.gridPhotosProvider = new DataProvider((row1: any, row2: any) => {
			return row1.index !== row2.index;
		});

		this.state = {
			refreshing: false,
			gridMediaProvider: this.gridPhotosProvider,
			listTranslate: new Animated.Value(0),
			gridTranslate: new Animated.Value(SCREEN_WIDTH),
			activeTab: PROFILE_TAB_ICON_TYPES.LIST,
			containerHeight: 0,
		};
	}

	public render() {
		const {currentUser, visitedUser} = this.props;
		const {refreshing, gridMediaProvider} = this.state;
		const {
			recentPosts,
			numberOfLikes,
			numberOfPhotos,
			numberOfFriends,
			numberOfViews,
			avatarURL,
			fullName,
			userName,
			aboutMeText,
			relationship,
			loading,
		} = visitedUser;

		return (
			<UserProfileScreenView
				isLoading={loading || recentPosts.loading}
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFriends={numberOfFriends}
				numberOfViews={numberOfViews}
				avatarURL={avatarURL}
				fullName={fullName}
				userName={userName}
				aboutMeText={aboutMeText}
				recentPosts={recentPosts}
				loadMorePhotosHandler={this.loadMorePhotosHandler}
				onCommentPress={this.onCommentsButtonPressHandler}
				onImagePress={this.onMediaObjectPressHandler}
				onLikePress={this.onLikePressHandler}
				onAddFriend={this.onAddFriendHandler}
				onShowFriendshipOptions={this.onShowFriendshipOptionsHandler}
				relationship={relationship}
				onRefresh={this.onRefreshHandler}
				onViewProfilePhoto={this.onViewProfilePhotoHandler}
				onViewMediaFullscreen={this.onViewMediaFullscreenHandler}
				refreshing={refreshing}
				gridMediaProvider={gridMediaProvider}
				currentUserId={currentUser.userId}
				onIconPress={this.onIconPressHandler}
				listTranslate={this.state.listTranslate}
				gridTranslate={this.state.gridTranslate}
				activeTab={this.state.activeTab}
				containerHeight={this.state.containerHeight}
				onLayoutChange={this.onLayoutChangeHandler}
				getText={this.props.getText}
			/>
		);
	}

	private loadMorePhotosHandler = () => {
		const {gridMediaProvider, refreshing} = this.state;
		const {mediaObjects} = this.props.visitedUser;
		const headerElement = [{index: uuidv4()}];

		if (mediaObjects.length === 0) {
			this.setState({
				gridMediaProvider: gridMediaProvider.cloneWithRows(headerElement),
			});
		} else if (this.lastLoadedPhotoIndex < mediaObjects.length && !refreshing) {
			const loadedSize = gridMediaProvider.getSize();
			const endIndex = this.lastLoadedPhotoIndex + GRID_PAGE_SIZE;
			const loadedMedia = loadedSize === 0 ? headerElement : gridMediaProvider.getAllData();
			const newMedia = mediaObjects
				.slice(this.lastLoadedPhotoIndex, endIndex)
				.map((mediaObject: IMediaProps, index: number) => ({
					url: mediaObject.url,
					type: mediaObject.type,
					index: this.lastLoadedPhotoIndex + index,
				}));

			const allMedia = [...loadedMedia, ...newMedia];

			this.setState({
				gridMediaProvider: gridMediaProvider.cloneWithRows(allMedia),
			});
			this.lastLoadedPhotoIndex = allMedia.length - 1;
		}
	};

	private onAddFriendHandler = () => {
		const {visitedUser, addFriend} = this.props;
		addFriend(visitedUser.userId);
	};

	private onMediaObjectPressHandler = (index: number, media: any) => {
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects: media,
			startIndex: index,
		});
	};

	private onCommentsButtonPressHandler = (postId: any, userId: any) => {
		this.props.navigation.navigate('CommentsStack', {postId, userId});
	};

	private onLikePressHandler = (likedByMe: boolean, postId: string) => {
		const {likePost, unlikePost} = this.props;

		likedByMe ? unlikePost(postId) : likePost(postId);
		return !likedByMe;
	};

	private onRefreshHandler = () => {
		const {refreshUser} = this.props;
		if (!this.state.refreshing) {
			this.setState({
				refreshing: true,
			});
			refreshUser();
		}
	};

	private onViewProfilePhotoHandler = () => {
		// const {navigation, getUserQuery} = this.props;
		// navigation.navigate('MediaViewerScreen', {
		// 	mediaObjects: [{type: 'jpg', hash: getUserQuery.getUser.avatarURL.replace(base.ipfs_URL, '')}],
		// 	startIndex: 0,
		// });
	};

	private onViewMediaFullscreenHandler = (index: number) => {
		const {mediaObjects} = this.props.visitedUser;
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects,
			startIndex: index,
		});
	};

	private onIconPressHandler = (tab: string) => {
		if (this.state.activeTab !== tab) {
			this.setState({activeTab: tab});
		}

		if (tab === PROFILE_TAB_ICON_TYPES.GRID) {
			Animated.parallel([
				Animated.timing(this.state.listTranslate, {
					toValue: -SCREEN_WIDTH,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(this.state.gridTranslate, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(this.state.listTranslate, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(this.state.gridTranslate, {
					toValue: SCREEN_WIDTH,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();
		}
	};

	private onLayoutChangeHandler = (height: number) => {
		if (this.state.containerHeight !== height) {
			this.setState({containerHeight: height});
		}
	};

	private onShowFriendshipOptionsHandler = () => {
		const {getText} = this.props;
		const menuOptions = [getText('friendship.menu.option.remove'), getText('button.CANCEL')];
		ActionSheet.show(
			{
				options: menuOptions,
				cancelButtonIndex: menuOptions.length - 1,
			},
			(buttonIndex: number) => {
				if (buttonIndex === 0) {
					this.onRemoveFriendshipHandler();
				}
			},
		);
	};

	private onRemoveFriendshipHandler = () => {
		Alert.alert('onRemoveFriendshipHandler: TBD');
		// TODO: API call to remove + refresh user query so relationship is updated!
	};
}
