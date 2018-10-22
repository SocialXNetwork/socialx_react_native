/**
 * TODO list:
 * 1. @Serkan: Take a look over onViewProfilePhotoHandler function, it uses ipfs
 * 2. @Alex: check and implemented onAddComment, similar with what is on UserFeed?
 */

import * as React from 'react';
import { Alert, Animated, Dimensions } from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { DataProvider } from 'recyclerlistview';
import uuidv4 from 'uuid/v4';

import {
	IWithUserProfileEnhancedActions,
	IWithUserProfileEnhancedData,
	WithUserProfile,
} from '../../enhancers/screens';

import { PROFILE_TAB_ICON_TYPES, SCREENS } from '../../environment/consts';
import { IMediaProps, INavigationProps } from '../../types';
import { UserProfileScreenView } from './UserProfileScreen.view';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_PAGE_SIZE = 20;

interface IUserProfileScreenState {
	gridMediaProvider: DataProvider;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
}

type IUserProfileScreenProps = INavigationProps &
	IWithUserProfileEnhancedData &
	IWithUserProfileEnhancedActions;

class Screen extends React.Component<
	IUserProfileScreenProps,
	IUserProfileScreenState
> {
	private lastLoadedPhotoIndex = 0;
	private readonly gridPhotosProvider: DataProvider;

	constructor(props: IUserProfileScreenProps) {
		super(props);
		this.gridPhotosProvider = new DataProvider((row1: any, row2: any) => {
			return row1.index !== row2.index;
		});

		this.state = {
			gridMediaProvider: this.gridPhotosProvider,
			listTranslate: new Animated.Value(0),
			gridTranslate: new Animated.Value(SCREEN_WIDTH),
			activeTab: PROFILE_TAB_ICON_TYPES.LIST,
			containerHeight: 0,
		};
	}

	public render() {
		const {
			currentUserAvatarURL,
			visitedUser,
			refreshingProfile,
			postComment,
			blockUser,
			reportProblem,
		} = this.props;
		const {
			activeTab,
			listTranslate,
			gridTranslate,
			containerHeight,
			gridMediaProvider,
		} = this.state;
		const {
			recentPosts,
			numberOfLikes,
			numberOfPhotos,
			numberOfFriends,
			numberOfComments,
			avatarURL,
			fullName,
			userName,
			aboutMeText,
			relationship,
		} = visitedUser;

		return (
			<UserProfileScreenView
				refreshing={refreshingProfile}
				onRefresh={this.onRefreshHandler}
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFriends={numberOfFriends}
				numberOfComments={numberOfComments}
				avatarURL={avatarURL}
				fullName={fullName}
				userName={userName}
				aboutMeText={aboutMeText}
				recentPosts={recentPosts}
				loadMorePhotosHandler={this.loadMorePhotosHandler}
				onAddFriend={this.onAddFriendHandler}
				onShowFriendshipOptions={this.onShowFriendshipOptionsHandler}
				relationship={relationship}
				onViewProfilePhoto={this.onViewProfilePhotoHandler}
				onViewMediaFullscreen={this.onViewMediaFullScreenHandler}
				gridMediaProvider={gridMediaProvider}
				currentUserAvatarURL={currentUserAvatarURL}
				onIconPress={this.onIconPressHandler}
				listTranslate={listTranslate}
				gridTranslate={gridTranslate}
				activeTab={activeTab}
				containerHeight={containerHeight}
				onLayoutChange={this.onLayoutChangeHandler}
				onClose={this.onCloseHandler}
				getText={this.props.getText}
				onImagePress={this.onMediaObjectPressHandler}
				onLikePress={this.onLikePressHandler}
				onUserPress={this.onViewUserProfile}
				onSubmitComment={postComment}
				onCommentPress={this.onViewCommentsForPost}
				onAddComment={(height: number) => {
					/**/
				}}
				onDeletePostPress={() => undefined}
				onBlockUser={blockUser}
				onReportProblem={reportProblem}
			/>
		);
	}

	private loadMorePhotosHandler = () => {
		const { gridMediaProvider } = this.state;
		const { visitedUser } = this.props;
		const { mediaObjects } = visitedUser;

		const headerElement = [{ index: uuidv4() }];

		if (mediaObjects.length === 0) {
			this.setState({
				gridMediaProvider: gridMediaProvider.cloneWithRows(headerElement),
			});
		} else if (this.lastLoadedPhotoIndex < mediaObjects.length) {
			const loadedSize = gridMediaProvider.getSize();
			const endIndex = this.lastLoadedPhotoIndex + GRID_PAGE_SIZE;
			const loadedMedia =
				loadedSize === 0 ? headerElement : gridMediaProvider.getAllData();
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
		const { visitedUser, addFriend } = this.props;
		addFriend(visitedUser.userId);
	};

	private onMediaObjectPressHandler = (
		index: number,
		media: IMediaProps[],
		postId: string,
	) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.MediaViewer,
			params: {
				mediaObjects: media,
				startIndex: index,
				postId,
			},
		});
		navigation.navigate(SCREENS.MediaViewer);
	};

	private onViewCommentsForPost = (postId: string, startComment: boolean) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.Comments,
			params: { postId, startComment },
		});
		navigation.navigate(SCREENS.Comments);
	};

	private onLikePressHandler = (likedByMe: boolean, postId: string) => {
		const { likePost, unlikePost } = this.props;

		likedByMe ? unlikePost(postId) : likePost(postId);
		return !likedByMe;
	};

	private onRefreshHandler = () => {
		const { loadMorePosts, loadMorePhotos, visitedUser } = this.props;

		if (this.state.activeTab === PROFILE_TAB_ICON_TYPES.LIST) {
			loadMorePosts(visitedUser.userId);
		} else {
			loadMorePhotos(visitedUser.userId);
		}
	};

	private onViewProfilePhotoHandler = () => {
		// const {navigation, getUserQuery} = this.props;
		// navigation.navigate('MediaViewerScreen', {
		// 	mediaObjects: [{type: 'jpg', hash: getUserQuery.getUser.avatarURL.replace(base.ipfs_URL, '')}],
		// 	startIndex: 0,
		// });
	};

	private onViewMediaFullScreenHandler = (index: number) => {
		const { navigation, setNavigationParams, visitedUser } = this.props;
		setNavigationParams({
			screenName: SCREENS.MediaViewer,
			params: {
				mediaObjects: visitedUser.mediaObjects,
				startIndex: index,
			},
		});
		navigation.navigate(SCREENS.MediaViewer);
	};

	private onIconPressHandler = (tab: string) => {
		if (this.state.activeTab !== tab) {
			this.setState({ activeTab: tab });
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
			this.setState({ containerHeight: height });
		}
	};

	private onShowFriendshipOptionsHandler = () => {
		const { showDotsMenuModal, getText } = this.props;
		const menuItems = [
			{
				label: getText('friendship.menu.option.remove'),
				icon: 'md-remove-circle',
				actionHandler: () => this.onRemoveFriendshipHandler,
			},
		];
		showDotsMenuModal(menuItems);
	};

	private onRemoveFriendshipHandler = () => {
		Alert.alert('onRemoveFriendshipHandler: TBD');
		// TODO: API call to remove + refresh user query so relationship is updated!
	};

	private onCloseHandler = () => {
		this.props.navigation.goBack(null);
	};

	private onViewUserProfile = (userId: string) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.UserProfile,
			params: { userId },
		});
		navigation.navigate(SCREENS.UserProfile);
	};
}

export const UserProfileScreen = ({ navigation }: INavigationProps) => (
	<WithUserProfile>
		{({ data, actions }) => (
			<Screen navigation={navigation} {...data} {...actions} />
		)}
	</WithUserProfile>
);
