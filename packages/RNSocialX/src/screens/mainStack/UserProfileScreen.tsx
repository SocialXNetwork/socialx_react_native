import * as React from 'react';
import { Animated, Dimensions } from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { DataProvider } from 'recyclerlistview';
import uuidv4 from 'uuid/v4';

import {
	IWithNavigationHandlersEnhancedActions,
	WithNavigationHandlers,
} from '../../enhancers/intermediary';
import {
	IWithUserProfileEnhancedActions,
	IWithUserProfileEnhancedData,
	WithUserProfile,
} from '../../enhancers/screens';

import { PROFILE_TAB_ICON_TYPES } from '../../environment/consts';
import { IMedia, INavigationProps, MediaTypeImage } from '../../types';
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
	IWithUserProfileEnhancedActions &
	IWithNavigationHandlersEnhancedActions;

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
		const { visitedUser, loadingProfile, loadingPosts, onGoBack, navigation, getText } = this.props;
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
				onViewMedia={this.onViewMediaHandler}
				onIconPress={this.onIconPressHandler}
				onLayoutChange={this.onLayoutChangeHandler}
				onGoBack={onGoBack}
				navigation={navigation}
				getText={getText}
			/>
		);
	}

	// Improve this when we have lazy loading
	private onLoadMorePhotosHandler = () => {
		const { dataProvider } = this.state;
		const { visitedUser } = this.props;
		const { media } = visitedUser;

		const headerElement = [{ index: uuidv4() }];

		if (media.length === 0) {
			this.setState({
				dataProvider: dataProvider.cloneWithRows(headerElement),
			});
		} else if (this.lastLoadedPhotoIndex < media.length) {
			const loadedSize = dataProvider.getSize();
			const endIndex = this.lastLoadedPhotoIndex + GRID_PAGE_SIZE;
			const loadedMedia = loadedSize === 0 ? headerElement : dataProvider.getAllData();
			const newMedia = media
				.slice(this.lastLoadedPhotoIndex, endIndex)
				.map((obj: IMedia, index: number) => ({
					hash: obj.hash,
					type: obj.type,
					index: this.lastLoadedPhotoIndex + index,
				}));

			const allMedia = [...loadedMedia, ...newMedia];

			this.setState({
				dataProvider: dataProvider.cloneWithRows(allMedia),
			});
			this.lastLoadedPhotoIndex = allMedia.length - 1;
		}
	};

	private onRefreshHandler = async () => {
		const { visitedUser, loadingProfile, loadingPosts, getUserPosts, getUserProfile } = this.props;

		if (!loadingProfile && !loadingPosts) {
			const userId = visitedUser.userId;
			await getUserProfile(userId);
			await getUserPosts(userId);
		}
	};

	private onAddFriendHandler = () => {
		this.props.addFriend(this.props.visitedUser.userId);
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

	private onViewMediaHandler = (index: number) => {
		const {
			visitedUser: { media },
			onViewImage,
		} = this.props;

		onViewImage(media, index, media[index].postId);
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
		const items = [
			{
				label: getText('friendship.menu.option.remove'),
				icon: 'md-remove-circle',
				actionHandler: () => this.onRemoveFriendshipHandler,
			},
		];

		showOptionsMenu(items);
	};

	private onRemoveFriendshipHandler = () => {
		// TODO: API call to remove + refresh user query so relationship is updated!
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
