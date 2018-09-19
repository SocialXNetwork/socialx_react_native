/**
 * TODO list:
 * 1. Refactor the commented part into the header component - Done
 * 2. Implement onViewProfilePhoto (check IPFS)
 */

import * as React from 'react';
import {DataProvider} from 'recyclerlistview';
import uuidv4 from 'uuid/v4';

import {IWithMyProfileEnhancedActions, IWithMyProfileEnhancedData, WithMyProfile} from '../../enhancers/screens';
import {INavigationProps} from '../../types';
import {icons} from './MyProfileScreen.style';
import {MyProfileScreenView} from './MyProfileScreen.view';

const GRID_PAGE_SIZE = 20;

type IMyProfileScreenProps = INavigationProps & IWithMyProfileEnhancedData & IWithMyProfileEnhancedActions;

interface IMyProfileScreenState {
	gridMediaProvider: DataProvider;
}

class Screen extends React.Component<IMyProfileScreenProps, IMyProfileScreenState> {
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
		const {currentUser, refreshingUser, loadingUser, getText} = this.props;
		const {gridMediaProvider} = this.state;
		const {
			numberOfLikes,
			numberOfPhotos,
			numberOfFriends,
			numberOfViews,
			avatarURL,
			fullName,
			userName,
			aboutMeText,
			mediaObjects,
		} = currentUser;

		return (
			<MyProfileScreenView
				isLoading={loadingUser}
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFriends={numberOfFriends}
				numberOfViews={numberOfViews}
				avatarURL={avatarURL}
				fullName={fullName}
				userName={userName}
				aboutMeText={aboutMeText}
				loadMorePhotosHandler={this.loadMorePhotosHandler}
				onRefresh={this.onRefresHandler}
				refreshing={refreshingUser}
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
		const {navigation, getText, logout} = this.props;
		return [
			{
				label: getText('my.profile.screen.menu.profile.analytics'),
				icon: icons.iconProfileAnalytics,
				actionHandler: () => navigation.navigate('ProfileAnalyticsScreen'),
			},
			{
				label: getText('my.profile.screen.menu.wallet'),
				icon: icons.iconWallet2,
				actionHandler: () => navigation.navigate('WalletActivityScreen'),
			},
			{
				label: getText('my.profile.screen.menu.settings'),
				icon: 'ios-settings-outline',
				actionHandler: () => navigation.navigate('SettingsScreen'),
			},
			{
				label: getText('my.profile.screen.menu.logout'),
				icon: 'ios-log-out',
				actionHandler: () => logout(),
			},
		];
	};

	private onShowDotsModalHandler = () => {
		const {showDotsMenuModal} = this.props;

		const menuItems = this.getDotsModalItems();
		showDotsMenuModal(menuItems);
	};

	private loadMorePhotosHandler = () => {
		const {gridMediaProvider} = this.state;
		const {mediaObjects} = this.props.currentUser;
		const headerElement = [{index: uuidv4()}];

		if (mediaObjects.length === 0) {
			this.setState({
				gridMediaProvider: gridMediaProvider.cloneWithRows(headerElement),
			});
		} else if (this.lastLoadedPhotoIndex < mediaObjects.length && !this.props.refreshingUser) {
			const loadedSize = gridMediaProvider.getSize();
			const endIndex = this.lastLoadedPhotoIndex + GRID_PAGE_SIZE;
			const loadedMedia = loadedSize === 0 ? headerElement : gridMediaProvider.getAllData();
			const newMedia = mediaObjects.slice(this.lastLoadedPhotoIndex, endIndex).map((mediaObject, index: number) => ({
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

	private onRefresHandler = () => {
		const {currentUser, refreshUser, refreshingUser} = this.props;
		if (!refreshingUser) {
			refreshUser(currentUser.userId);
		}
	};

	private onPhotoPressHandler = (index: number) => {
		const {
			navigation,
			currentUser: {mediaObjects},
		} = this.props;

		navigation.navigate('MediaViewerScreen', {
			mediaObjects,
			startIndex: index,
		});
	};

	private onEditProfilePressHandler = () => {
		const {navigation} = this.props;
		navigation.navigate('SettingsScreen');
	};

	private onSharePressHandler = () => {
		const {navigation} = this.props;
		navigation.navigate('ReferralScreen');
	};
}

export const MyProfileScreen = (navProps: INavigationProps) => (
	<WithMyProfile>{({data, actions}) => <Screen {...navProps} {...data} {...actions} />}</WithMyProfile>
);
