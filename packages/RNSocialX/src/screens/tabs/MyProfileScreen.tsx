import { isEqual } from 'lodash';
import * as React from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { DataProvider } from 'recyclerlistview';
import uuid from 'uuid/v4';

import {
	IWithNavigationHandlersEnhancedActions,
	WithNavigationHandlers,
} from '../../enhancers/intermediary';
import {
	IWithMyProfileEnhancedActions,
	IWithMyProfileEnhancedData,
	WithMyProfile,
} from '../../enhancers/screens';

import { NAVIGATION, PROFILE_TAB_ICON_TYPES, SCREENS } from '../../environment/consts';
import { IMedia, INavigationProps, MediaTypeImage } from '../../types';
import { MyProfileScreenView } from './MyProfileScreen.view';

import { SCREEN_WIDTH } from './MyProfileScreen.style';
const GRID_PAGE_SIZE = 21;
const END_REACHED_OFFSET = 500;

type IProps = INavigationProps &
	IWithMyProfileEnhancedData &
	IWithMyProfileEnhancedActions &
	IWithNavigationHandlersEnhancedActions;

interface IState {
	data: { media: IMedia[] };
	dataProvider: DataProvider;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
}

class Screen extends React.Component<IProps, IState> {
	private readonly dataProvider: DataProvider;
	private lastLoadedIndex: number = 0;

	constructor(props: IProps) {
		super(props);
		this.dataProvider = new DataProvider((r1, r2) => {
			return r1 !== r2;
		});

		this.state = {
			data: { media: [] },
			dataProvider: this.dataProvider,
			listTranslate: new Animated.Value(0),
			gridTranslate: new Animated.Value(SCREEN_WIDTH),
			activeTab: PROFILE_TAB_ICON_TYPES.LIST,
			containerHeight: 0,
		};
	}

	public componentDidMount() {
		const media = this.state.data.media.slice();
		for (let i = 0; i < 1000; i++) {
			media.push({
				size: 13855,
				hash: 'QmPKTuijqJFycUhk6Jca9heeJ5pe9M9R8rtbujBHumyQ6p',
				type: {
					key: 'image',
					name: 'Photo',
					category: 'Photography',
				},
				extension: 'image/png',
			});
		}

		this.setState({
			data: { media },
		});
	}

	public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
		return (
			this.state !== nextState ||
			this.state.dataProvider.getSize() !== nextState.dataProvider.getSize() ||
			this.props.hasFriends !== nextProps.hasFriends ||
			this.props.loadingProfile !== nextProps.loadingProfile ||
			this.props.loadingPosts !== nextProps.loadingPosts ||
			!isEqual(this.props.currentUser, nextProps.currentUser)
		);
	}

	public componentDidUpdate(prevProps: IProps, prevState: IState) {
		// const loaded = this.state.dataProvider.getSize();
		// if (loaded === 0) {
		// 	this.initializeGrid();
		// }

		console.log(this.lastLoadedIndex);
		if (this.state.data.media.length !== 0 && prevState.data.media.length === 0) {
			this.initializeGrid();
		}
	}

	public render() {
		const {
			currentUser,
			hasFriends,
			loadingProfile,
			loadingPosts,
			navigation,
			onViewFriends,
			getText,
		} = this.props;
		const { activeTab, listTranslate, gridTranslate, containerHeight, dataProvider } = this.state;

		return (
			<MyProfileScreenView
				currentUser={currentUser}
				hasFriends={hasFriends}
				loadingProfile={loadingProfile}
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
				onViewMedia={this.onViewMediaHandler}
				onEditProfile={this.onEditProfilePressHandler}
				onSharePress={this.onSharePressHandler}
				onProfilePhotoPress={this.onProfilePhotoPressHandler}
				onShowOptionsMenu={this.onShowOptionsMenuHandler}
				onViewFriends={onViewFriends}
				navigation={navigation}
				getText={getText}
			/>
		);
	}

	private onRefreshHandler = async () => {
		const { loadingProfile, loadingPosts, getUserProfile } = this.props;

		if (!loadingProfile && !loadingPosts) {
			await getUserProfile();
		}
	};

	private onShowOptionsMenuHandler = () => {
		const {
			showOptionsMenu,
			logout,
			setGlobal,
			navigation,
			resetNavigationToRoute,
			getText,
		} = this.props;
		const menuItems = [
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

	private initializeGrid = () => {
		const {
			dataProvider,
			data: { media },
		} = this.state;
		// const { media } = this.props.currentUser;
		const headerElement = [{ index: uuid() }];

		if (media.length === 0) {
			this.setState({
				dataProvider: dataProvider.cloneWithRows(headerElement),
			});
		} else {
			// const newMedia = media.slice(0, media.length);
			const newMedia = media.slice(0, GRID_PAGE_SIZE).map((m, index) => ({
				...m,
				url: 'https://avatars2.githubusercontent.com/u/' + (this.lastLoadedIndex + index),
			}));
			const allMedia = [...headerElement, ...newMedia];

			this.setState({
				dataProvider: dataProvider.cloneWithRows(allMedia),
			});
			this.lastLoadedIndex = allMedia.length - 1;
		}
	};

	// Improve this when we have lazy loading
	private onLoadMorePhotosHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		if (event.nativeEvent.contentOffset.y >= this.state.containerHeight - END_REACHED_OFFSET) {
			console.log('trigger');
			const {
				dataProvider,
				data: { media },
			} = this.state;
			// const { media } = this.props.currentUser;

			const endIndex = this.lastLoadedIndex + GRID_PAGE_SIZE;
			const loadedMedia = dataProvider.getAllData();
			// console.log(loadedMedia);
			// const newMedia = media.slice(this.lastLoadedIndex, endIndex);
			const newMedia = media.slice(this.lastLoadedIndex, endIndex).map((m, index) => ({
				...m,
				url: 'https://avatars2.githubusercontent.com/u/' + (this.lastLoadedIndex + index),
			}));

			const allMedia = [...loadedMedia, ...newMedia];

			this.setState({
				dataProvider: dataProvider.cloneWithRows(allMedia),
			});
			this.lastLoadedIndex = allMedia.length - 1;
		}
	};

	private onViewMediaHandler = (index: number) => {
		const {
			currentUser: { media },
			onViewImage,
		} = this.props;

		onViewImage(media, index, media[index].postId);
	};

	private onProfilePhotoPressHandler = () => {
		const { currentUser, onViewImage } = this.props;

		if (currentUser.avatar.length > 0) {
			const media = [
				{
					hash: currentUser.avatar,
					size: 0,
					extension: '',
					type: MediaTypeImage,
				},
			];

			onViewImage(media, 0);
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
		this.props.navigation.navigate(SCREENS.Settings);
	};

	private onSharePressHandler = () => {
		this.props.navigation.navigate(SCREENS.Referral);
	};
}

export const MyProfileScreen = (props: INavigationProps) => (
	<WithNavigationHandlers navigation={props.navigation}>
		{(nav) => (
			<WithMyProfile>
				{(profile) => <Screen {...props} {...profile.data} {...profile.actions} {...nav.actions} />}
			</WithMyProfile>
		)}
	</WithNavigationHandlers>
);
