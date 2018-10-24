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
import { INavigationProps } from '../../types';
import { MyProfileScreenView } from './MyProfileScreen.view';

const GRID_PAGE_SIZE = 20;

type IMyProfileScreenProps = INavigationProps &
	IWithMyProfileEnhancedData &
	IWithMyProfileEnhancedActions;

interface IMyProfileScreenState {
	dataProvider: DataProvider;
}

class Screen extends React.Component<
	IMyProfileScreenProps,
	IMyProfileScreenState
> {
	// todo @serkan @jake why?
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

	public render() {
		const { currentUser, getText } = this.props;
		const { dataProvider } = this.state;
		const {
			numberOfLikes,
			numberOfPhotos,
			numberOfFriends,
			numberOfComments,
			avatarURL,
			fullName,
			userName,
			aboutMeText,
			mediaObjects,
		} = currentUser;

		return (
			<MyProfileScreenView
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFriends={numberOfFriends}
				numberOfComments={numberOfComments}
				avatarURL={avatarURL}
				fullName={fullName}
				userName={userName}
				aboutMeText={aboutMeText}
				loadMorePhotosHandler={this.loadMorePhotosHandler}
				dataProvider={dataProvider}
				hasPhotos={mediaObjects.length > 0}
				onViewMediaFullScreen={this.onPhotoPressHandler}
				onEditProfile={this.onEditProfilePressHandler}
				onSharePress={this.onSharePressHandler}
				onViewProfilePhoto={() => {
					/**/
				}}
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
		const { showDotsMenuModal } = this.props;

		const menuItems = this.getDotsModalItems();
		showDotsMenuModal(menuItems);
	};

	private loadMorePhotosHandler = () => {
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
			const loadedMedia =
				loadedSize === 0 ? headerElement : dataProvider.getAllData();
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

	private onPhotoPressHandler = (index: number) => {
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
