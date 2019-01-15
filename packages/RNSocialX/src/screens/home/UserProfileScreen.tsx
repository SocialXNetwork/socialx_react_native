import { isEqual } from 'lodash';
import * as React from 'react';
import {
	Animated,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
	StatusBar,
} from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { DataProvider } from 'recyclerlistview';

import {
	IWithNavigationHandlersEnhancedActions,
	WithNavigationHandlers,
} from '../../enhancers/intermediary';
import {
	IWithUserProfileEnhancedActions,
	IWithUserProfileEnhancedData,
	WithUserProfile,
} from '../../enhancers/screens';

import { OS_TYPES, PROFILE_TAB_ICON_TYPES } from '../../environment/consts';
import { INavigationProps, MediaTypeImage } from '../../types';
import { UserProfileScreenView } from './UserProfileScreen.view';

import { SCREEN_WIDTH } from './UserProfileScreen.style';
const GRID_PAGE_SIZE = 21;
const END_REACHED_OFFSET = 500;

interface IState {
	dataProvider: DataProvider;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
}

type IProps = INavigationProps &
	IWithUserProfileEnhancedData &
	IWithUserProfileEnhancedActions &
	IWithNavigationHandlersEnhancedActions;

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
		if (Platform.OS === OS_TYPES.IOS) {
			StatusBar.setBarStyle('light-content', true);
		}
	}

	public componentDidUpdate(prevProps: IProps) {
		if (prevProps.visitedUser.media.length !== this.props.visitedUser.media.length) {
			this.refreshGrid();
		}
	}

	public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
		return (
			this.state.dataProvider !== nextState.dataProvider ||
			this.state.activeTab !== nextState.activeTab ||
			this.state.containerHeight !== nextState.containerHeight ||
			this.props.hasFriends !== nextProps.hasFriends ||
			this.props.loadingProfile !== nextProps.loadingProfile ||
			this.props.loadingPosts !== nextProps.loadingPosts ||
			!isEqual(this.props.visitedUser, nextProps.visitedUser)
		);
	}

	public render() {
		const {
			visitedUser,
			hasFriends,
			loadingProfile,
			loadingPosts,
			onViewFriends,
			onGoBack,
			navigation,
			getText,
		} = this.props;
		const { activeTab, listTranslate, gridTranslate, containerHeight, dataProvider } = this.state;

		return (
			<UserProfileScreenView
				visitedUser={visitedUser}
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
				onProfilePhotoPress={this.onProfilePhotoPressHandler}
				onViewMedia={this.onViewMediaHandler}
				onIconPress={this.onIconPressHandler}
				onLayoutChange={this.onLayoutChangeHandler}
				onViewFriends={onViewFriends}
				onGoBack={onGoBack}
				navigation={navigation}
				getText={getText}
			/>
		);
	}

	private onRefreshHandler = async () => {
		const { visitedUser, loadingProfile, loadingPosts, getUserProfile } = this.props;

		if (!loadingProfile && !loadingPosts) {
			await getUserProfile(visitedUser.alias);
		}
	};

	private onLoadMorePhotosHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		if (
			event.nativeEvent.contentOffset.y >= this.state.containerHeight - END_REACHED_OFFSET &&
			this.state.activeTab === PROFILE_TAB_ICON_TYPES.GRID &&
			this.lastLoadedIndex < this.props.visitedUser.media.length
		) {
			this.loadPhotos();
		}
	};

	private onViewMediaHandler = (index: number) => {
		const {
			visitedUser: { media },
			onViewImage,
		} = this.props;

		onViewImage(media, index, media[index].postId);
	};

	private onProfilePhotoPressHandler = () => {
		const { visitedUser, onViewImage } = this.props;

		if (visitedUser.avatar.length > 0) {
			const media = [
				{
					hash: visitedUser.avatar,
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

	private loadPhotos = () => {
		const { dataProvider } = this.state;
		const { media } = this.props.visitedUser;

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
		const { media } = this.props.visitedUser;

		this.setState({ dataProvider: dataProvider.cloneWithRows(media) });
		this.lastLoadedIndex = media.length;
	};
}

export const UserProfileScreen = (props: INavigationProps) => (
	<WithNavigationHandlers navigation={props.navigation}>
		{(nav) => (
			<WithUserProfile>
				{(profile) => <Screen {...props} {...profile.data} {...profile.actions} {...nav.actions} />}
			</WithUserProfile>
		)}
	</WithNavigationHandlers>
);
