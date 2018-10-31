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
import { IMediaProps, INavigationProps, MediaTypeImage } from '../../types';
import { UserProfileScreenView } from './UserProfileScreen.view';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_PAGE_SIZE = 20;

interface IUserProfileScreenState {
	dataProvider: DataProvider;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
}

type IUserProfileScreenProps = INavigationProps &
	IWithUserProfileEnhancedData &
	IWithUserProfileEnhancedActions;

class Screen extends React.Component<IUserProfileScreenProps, IUserProfileScreenState> {
	private lastLoadedPhotoIndex = 0;
	private readonly dataProvider: DataProvider;

	constructor(props: IUserProfileScreenProps) {
		super(props);
		this.dataProvider = new DataProvider((row1: any, row2: any) => {
			return row1.index !== row2.index;
		});

		this.state = {
			dataProvider: this.dataProvider,
			listTranslate: new Animated.Value(0),
			gridTranslate: new Animated.Value(SCREEN_WIDTH),
			activeTab: PROFILE_TAB_ICON_TYPES.LIST,
			containerHeight: 0,
		};
	}

	public render() {
		const { visitedUser, loadingProfile, loadingPosts } = this.props;
		const { activeTab, listTranslate, gridTranslate, containerHeight, dataProvider } = this.state;

		return (
			<UserProfileScreenView
				visitedUser={visitedUser}
				refreshing={loadingProfile && loadingPosts}
				loadingPosts={loadingPosts}
				dataProvider={dataProvider}
				listTranslate={listTranslate}
				gridTranslate={gridTranslate}
				activeTab={activeTab}
				containerHeight={containerHeight}
				onRefresh={this.onRefreshHandler}
				onLoadMorePhotos={this.onLoadMorePhotosHandler}
				onAddFriend={this.onAddFriendHandler}
				onShowFriendshipOptions={this.onShowFriendshipOptionsHandler}
				onProfilePhotoPress={this.onProfilePhotoPressHandler}
				onViewMediaFullscreen={this.onViewMediaFullScreenHandler}
				onIconPress={this.onIconPressHandler}
				onLayoutChange={this.onLayoutChangeHandler}
				onGoBack={this.onGoBackHandler}
				navigation={this.props.navigation}
				getText={this.props.getText}
			/>
		);
	}

	// Improve this when we have lazy loading
	private onLoadMorePhotosHandler = () => {
		const { dataProvider } = this.state;
		const { visitedUser } = this.props;
		const { mediaObjects } = visitedUser;

		const headerElement = [{ index: uuidv4() }];

		if (mediaObjects.length === 0) {
			this.setState({
				dataProvider: dataProvider.cloneWithRows(headerElement),
			});
		} else if (this.lastLoadedPhotoIndex < mediaObjects.length) {
			const loadedSize = dataProvider.getSize();
			const endIndex = this.lastLoadedPhotoIndex + GRID_PAGE_SIZE;
			const loadedMedia = loadedSize === 0 ? headerElement : dataProvider.getAllData();
			const newMedia = mediaObjects
				.slice(this.lastLoadedPhotoIndex, endIndex)
				.map((mediaObject: IMediaProps, index: number) => ({
					url: mediaObject.url,
					type: mediaObject.type,
					index: this.lastLoadedPhotoIndex + index,
				}));

			const allMedia = [...loadedMedia, ...newMedia];

			this.setState({
				dataProvider: dataProvider.cloneWithRows(allMedia),
			});
			this.lastLoadedPhotoIndex = allMedia.length - 1;
		}
	};

	private onAddFriendHandler = () => {
		const { visitedUser, addFriend } = this.props;
		addFriend(visitedUser.userId);
	};

	private onRefreshHandler = async () => {
		const {
			visitedUser,
			loadingProfile,
			loadingPosts,
			getProfileForUser,
			getPostsForUser,
		} = this.props;

		if (!loadingProfile && !loadingPosts) {
			const userId = visitedUser.userId;
			await getProfileForUser(userId);
			await getPostsForUser(userId);
		}
	};

	private onProfilePhotoPressHandler = () => {
		const { navigation, setNavigationParams, visitedUser } = this.props;

		const mediaObjects = [
			{
				url: visitedUser.avatar,
				type: MediaTypeImage,
			},
		];

		setNavigationParams({
			screenName: SCREENS.MediaViewer,
			params: {
				mediaObjects,
				startIndex: 0,
			},
		});
		navigation.navigate(SCREENS.MediaViewer);
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
		const { showOptionsMenu, getText } = this.props;
		const menuItems = [
			{
				label: getText('friendship.menu.option.remove'),
				icon: 'md-remove-circle',
				actionHandler: () => this.onRemoveFriendshipHandler,
			},
		];
		showOptionsMenu(menuItems);
	};

	private onRemoveFriendshipHandler = () => {
		Alert.alert('onRemoveFriendshipHandler: TBD');
		// TODO: API call to remove + refresh user query so relationship is updated!
	};

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const UserProfileScreen = ({ navigation }: INavigationProps) => (
	<WithUserProfile>
		{({ data, actions }) => <Screen navigation={navigation} {...data} {...actions} />}
	</WithUserProfile>
);
