import * as React from 'react';
import { DataProvider } from 'recyclerlistview';
import uuid from 'uuid/v4';

import { resetNavigationToRoute } from '../../enhancers/helpers';
import {
	IWithMyProfileEnhancedActions,
	IWithMyProfileEnhancedData,
	WithMyProfile,
} from '../../enhancers/screens';
import { NAVIGATION, SCREENS } from '../../environment/consts';
import { INavigationProps, MediaTypeImage } from '../../types';
import { MyProfileScreenView } from './MyProfileScreen.view';

const GRID_PAGE_SIZE = 20;

type IMyProfileScreenProps = INavigationProps &
	IWithMyProfileEnhancedData &
	IWithMyProfileEnhancedActions;

interface IMyProfileScreenState {
	dataProvider: DataProvider;
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
		};
	}

	public componentDidUpdate(prevProps: IMyProfileScreenProps) {
		if (prevProps.currentUser.mediaObjects !== this.props.currentUser.mediaObjects) {
			this.onLoadMorePhotosHandler();
		}
	}

	public render() {
		const { currentUser, getText } = this.props;
		const { dataProvider } = this.state;
		const {
			numberOfLikes,
			numberOfPhotos,
			numberOfFriends,
			numberOfComments,
			avatar,
			fullName,
			userName,
			description,
			mediaObjects,
		} = currentUser;

		return (
			<MyProfileScreenView
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFriends={numberOfFriends}
				numberOfComments={numberOfComments}
				avatar={avatar}
				fullName={fullName}
				userName={userName}
				description={description}
				onLoadMorePhotos={this.onLoadMorePhotosHandler}
				dataProvider={dataProvider}
				hasPhotos={mediaObjects.length > 0}
				onViewMediaFullScreen={this.onViewMediaFullScreenHandler}
				onEditProfile={this.onEditProfilePressHandler}
				onSharePress={this.onSharePressHandler}
				onProfilePhotoPress={this.onProfilePhotoPressHandler}
				onShowDotsModal={this.onShowDotsModalHandler}
				getText={getText}
			/>
		);
	}

	private getDotsModalItems = () => {
		const { navigation, getText, logout, setGlobal } = this.props;
		return [
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
	};

	private onShowDotsModalHandler = () => {
		const { showOptionsMenu } = this.props;

		const menuItems = this.getDotsModalItems();
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
			currentUser: { mediaObjects },
		} = this.props;

		setNavigationParams({
			screenName: SCREENS.MediaViewer,
			params: {
				mediaObjects,
				startIndex: index,
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
