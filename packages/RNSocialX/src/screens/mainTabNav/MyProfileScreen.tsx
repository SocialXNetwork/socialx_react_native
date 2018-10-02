/**
 * TODO list:
 * 1. Refactor the commented part into the header component - Done
 * 2. Implement onViewProfilePhoto (check IPFS)
 */

import * as React from 'react';
import { DataProvider } from 'recyclerlistview';
import uuidv4 from 'uuid/v4';

import {
	IWithMyProfileEnhancedActions,
	IWithMyProfileEnhancedData,
	WithMyProfile,
} from '../../enhancers/screens';
import { SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { icons } from './MyProfileScreen.style';
import { MyProfileScreenView } from './MyProfileScreen.view';

const GRID_PAGE_SIZE = 20;

type IMyProfileScreenProps = INavigationProps &
	IWithMyProfileEnhancedData &
	IWithMyProfileEnhancedActions;

interface IMyProfileScreenState {
	gridMediaProvider: DataProvider;
}

class Screen extends React.Component<
	IMyProfileScreenProps,
	IMyProfileScreenState
> {
	// todo @serkan @jake why?
	private lastLoadedPhotoIndex = 0;

	private readonly gridPhotosProvider: DataProvider;

	constructor(props: IMyProfileScreenProps) {
		super(props);
		this.gridPhotosProvider = new DataProvider((row1: any, row2: any) => {
			return row1.index !== row2.index;
		});

		this.state = {
			gridMediaProvider: this.gridPhotosProvider,
		};
	}

	public render() {
		const { currentUser, getText } = this.props;
		const { gridMediaProvider } = this.state;
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
				gridMediaProvider={gridMediaProvider}
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
		const { navigation, getText, logout, resetNavigationToRoute } = this.props;
		return [
			{
				label: getText('my.profile.screen.menu.profile.analytics'),
				icon: icons.iconProfileAnalytics,
				actionHandler: () => navigation.navigate(SCREENS.ProfileAnalytics),
			},
			{
				label: getText('my.profile.screen.menu.wallet'),
				icon: icons.iconWallet2,
				actionHandler: () => navigation.navigate(SCREENS.WalletActivity),
			},
			{
				label: getText('my.profile.screen.menu.settings'),
				icon: 'ios-settings-outline',
				actionHandler: () => navigation.navigate(SCREENS.Settings),
			},
			{
				label: getText('my.profile.screen.menu.logout'),
				icon: 'ios-log-out',
				actionHandler: () => {
					logout();
					resetNavigationToRoute('PreAuthScreen', navigation);
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
		const { gridMediaProvider } = this.state;
		const { mediaObjects } = this.props.currentUser;
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
				.map((mediaObject, index: number) => ({
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
