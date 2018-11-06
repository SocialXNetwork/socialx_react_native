import * as React from 'react';
import { Animated } from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { DataProvider } from 'recyclerlistview';
import uuid from 'uuid/v4';

import { resetNavigationToRoute } from '../../enhancers/helpers';
import {
	IWithMyProfileEnhancedActions,
	IWithMyProfileEnhancedData,
	WithMyProfile,
} from '../../enhancers/screens';
import { NAVIGATION, PROFILE_TAB_ICON_TYPES, SCREENS } from '../../environment/consts';
import { INavigationProps, MediaTypeImage } from '../../types';
import { MyProfileScreenView } from './MyProfileScreen.view';

import { SCREEN_WIDTH } from './MyProfileScreen.style';
const GRID_PAGE_SIZE = 20;

type IMyProfileScreenProps = INavigationProps &
	IWithMyProfileEnhancedData &
	IWithMyProfileEnhancedActions;

interface IMyProfileScreenState {
	dataProvider: DataProvider;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
}

class Screen extends React.Component<IMyProfileScreenProps, IMyProfileScreenState> {
	private lastLoadedPhotoIndex = 0;

	private readonly dataProvider: DataProvider;

	constructor(props: IMyProfileScreenProps) {
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

	public componentDidUpdate(prevProps: IMyProfileScreenProps) {
		if (prevProps.currentUser.mediaObjects !== this.props.currentUser.mediaObjects) {
			this.onLoadMorePhotosHandler();
		}
	}

	public render() {
		const { currentUser, loadingProfile, loadingPosts, navigation, getText } = this.props;
		const { activeTab, listTranslate, gridTranslate, containerHeight, dataProvider } = this.state;

		return (
			<MyProfileScreenView
				currentUser={currentUser}
				refreshing={loadingProfile && loadingPosts}
				loadingPosts={loadingPosts}
				dataProvider={dataProvider}
				listTranslate={listTranslate}
				gridTranslate={gridTranslate}
				activeTab={activeTab}
				containerHeight={containerHeight}
				onRefresh={this.onRefreshHandler}
				onLoadMorePhotos={this.onLoadMorePhotosHandler}
				onIconPress={this.onIconPressHandler}
				onLayoutChange={this.onLayoutChangeHandler}
				onViewMediaFullScreen={this.onViewMediaFullScreenHandler}
				onEditProfile={this.onEditProfilePressHandler}
				onSharePress={this.onSharePressHandler}
				onProfilePhotoPress={this.onProfilePhotoPressHandler}
				onShowOptionsMenu={this.onShowOptionsMenuHandler}
				navigation={navigation}
				getText={getText}
			/>
		);
	}

	private onRefreshHandler = async () => {
		const { currentUser, loadingProfile, loadingPosts, getPostsForUser } = this.props;

		if (!loadingProfile && !loadingPosts) {
			await getPostsForUser(currentUser.userId);
		}
	};

	private onShowOptionsMenuHandler = () => {
		const { showOptionsMenu, logout, setGlobal, navigation, getText } = this.props;
		const menuItems = [
			{
				label: getText('my.profile.screen.menu.profile.analytics'),
				icon: 'ios-analytics',
				actionHandler: () => navigation.navigate(SCREENS.ProfileAnalytics),
			},
			{
				label: getText('my.profile.screen.menu.wallet'),
				icon: 'ios-wallet',
				actionHandler: () => navigation.navigate(SCREENS.WalletActivity),
			},
			{
				label: getText('my.profile.screen.menu.settings'),
				icon: 'ios-settings',
				actionHandler: () => navigation.navigate(SCREENS.Settings),
			},
			{
				label: getText('my.profile.screen.menu.logout'),
				icon: 'ios-log-out',
				actionHandler: () => {
					setGlobal({ logout: true });
					resetNavigationToRoute(NAVIGATION.PreAuth, navigation);
					logout();
				},
			},
		];

		showOptionsMenu(menuItems);
	};

	// Improve this when we have lazy loading
	private onLoadMorePhotosHandler = () => {
		const { dataProvider } = this.state;
		const { mediaObjects } = this.props.currentUser;
		const headerElement = [{ index: uuid() }];

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
				.map((mediaObject, index: number) => ({
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

	private onViewMediaFullScreenHandler = (index: number) => {
		const {
			navigation,
			setNavigationParams,
			currentUser: { mediaObjects, recentPosts },
		} = this.props;

		const selectedMedia = mediaObjects[index];
		const post = recentPosts.find((p) => p.postId === selectedMedia.postId);

		setNavigationParams({
			screenName: SCREENS.MediaViewer,
			params: {
				mediaObjects,
				startIndex: index,
				post,
			},
		});
		navigation.navigate(SCREENS.MediaViewer);
	};

	private onProfilePhotoPressHandler = () => {
		const {
			navigation,
			setNavigationParams,
			currentUser: { avatar },
		} = this.props;

		if (avatar.length > 0) {
			const mediaObjects = [
				{
					url: avatar,
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
		}
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

	private onEditProfilePressHandler = () => {
		const { navigation } = this.props;
		navigation.navigate(SCREENS.Settings);
	};

	private onSharePressHandler = () => {
		const { navigation } = this.props;
		navigation.navigate(SCREENS.Referral);
	};
}

export const MyProfileScreen = (navProps: INavigationProps) => (
	<WithMyProfile>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithMyProfile>
);
