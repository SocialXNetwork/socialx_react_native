import { isEqual } from 'lodash';
import * as React from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { DataProvider } from 'recyclerlistview';

import {
	IWithNavigationHandlersEnhancedActions,
	WithNavigationHandlers,
} from '../../enhancers/intermediary';
import {
	IWithMyProfileEnhancedActions,
	IWithMyProfileEnhancedData,
	WithMyProfile,
} from '../../enhancers/screens';

import { ICON_TYPES, NAVIGATION, PROFILE_TAB_ICON_TYPES, SCREENS } from '../../environment/consts';
import { INavigationProps, MediaTypeImage } from '../../types';
import { MyProfileScreenView } from './MyProfileScreen.view';

import { SCREEN_WIDTH } from './MyProfileScreen.style';
const GRID_PAGE_SIZE = 21;
const END_REACHED_OFFSET = 500;

type IProps = INavigationProps &
	IWithMyProfileEnhancedData &
	IWithMyProfileEnhancedActions &
	IWithNavigationHandlersEnhancedActions;

interface IState {
	dataProvider: DataProvider;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		dataProvider: new DataProvider((r1, r2) => r1 !== r2),
		listTranslate: new Animated.Value(0),
		gridTranslate: new Animated.Value(SCREEN_WIDTH),
		activeTab: PROFILE_TAB_ICON_TYPES.LIST,
		containerHeight: 0,
	};
	private lastLoadedIndex: number = 0;

	public componentDidMount() {
		this.loadPhotos();
	}

	public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
		return (
			this.state.dataProvider !== nextState.dataProvider ||
			this.state.activeTab !== nextState.activeTab ||
			this.state.containerHeight !== nextState.containerHeight ||
			this.props.hasFriends !== nextProps.hasFriends ||
			this.props.loadingProfile !== nextProps.loadingProfile ||
			!isEqual(this.props.currentUser, nextProps.currentUser)
		);
	}

	public componentDidUpdate(prevProps: IProps) {
		if (prevProps.currentUser.media.length !== this.props.currentUser.media.length) {
			this.refreshGrid();
		}
	}

	public render() {
		const {
			currentUser,
			hasFriends,
			loadingProfile,
			navigation,
			onViewFriends,
			dictionary,
		} = this.props;
		const { dataProvider, activeTab, listTranslate, gridTranslate, containerHeight } = this.state;

		return (
			<MyProfileScreenView
				currentUser={currentUser}
				hasFriends={hasFriends}
				loadingProfile={loadingProfile}
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
				dictionary={dictionary}
			/>
		);
	}

	private onRefreshHandler = async () => {
		const { loadingProfile, getUserProfile } = this.props;

		if (!loadingProfile) {
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
			dictionary,
		} = this.props;
		const menuItems = [
			{
				label: dictionary.screens.myProfile.wallet,
				icon: 'ios-wallet',
				actionHandler: () => navigation.navigate(SCREENS.WalletActivity),
			},
			{
				label: dictionary.screens.myProfile.nodes,
				icon: 'network',
				source: ICON_TYPES.ENT,
				actionHandler: () => navigation.navigate(SCREENS.Nodes),
			},
			{
				label: dictionary.screens.myProfile.settings,
				icon: 'ios-settings',
				actionHandler: () => navigation.navigate(SCREENS.Settings),
			},
			{
				label: dictionary.screens.myProfile.logout,
				icon: 'sign-out',
				source: ICON_TYPES.OCT,
				actionHandler: () => {
					setGlobal({ logout: true });
					resetNavigationToRoute(NAVIGATION.PreAuth, navigation);
					logout();
				},
			},
		];

		showOptionsMenu(menuItems);
	};

	private onLoadMorePhotosHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		if (
			event.nativeEvent.contentOffset.y >= this.state.containerHeight - END_REACHED_OFFSET &&
			this.state.activeTab === PROFILE_TAB_ICON_TYPES.GRID &&
			this.lastLoadedIndex < this.props.currentUser.media.length
		) {
			this.loadPhotos();
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
					type: MediaTypeImage,
				},
			];

			onViewImage(media);
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

	private loadPhotos = () => {
		const { dataProvider } = this.state;
		const { media } = this.props.currentUser;

		if (this.lastLoadedIndex < media.length) {
			const endIndex = this.lastLoadedIndex + GRID_PAGE_SIZE;

			const loadedMedia = dataProvider.getAllData();
			const newMedia = media.slice(this.lastLoadedIndex, endIndex);
			const allMedia = [...loadedMedia, ...newMedia];

			this.setState({
				dataProvider: dataProvider.cloneWithRows(allMedia),
			});
			this.lastLoadedIndex = allMedia.length;
		}
	};

	private refreshGrid = () => {
		const { dataProvider } = this.state;
		const { media } = this.props.currentUser;

		this.setState({ dataProvider: dataProvider.cloneWithRows(media) });
		this.lastLoadedIndex = media.length;
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
