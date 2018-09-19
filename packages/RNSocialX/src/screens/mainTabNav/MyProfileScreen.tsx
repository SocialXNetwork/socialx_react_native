/**
 * TODO list:
 * 1. Refactor the commented part into the header component
 * 2. Implement onViewProfilePhoto (check IPFS)
 */

import * as React from 'react';
import {AsyncStorage, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {DataProvider} from 'recyclerlistview';
import uuidv4 from 'uuid/v4';

import {DotsMenuButton, DotsMenuItem, IconButton} from '../../components';
import {IWithMyProfileEnhancedActions, IWithMyProfileEnhancedData, WithMyProfile} from '../../enhancers/screens';
import {INavigationProps} from '../../types';
import styles, {icons} from './MyProfileScreen.style';
import {MyProfileScreenView} from './MyProfileScreen.view';

const GRID_PAGE_SIZE = 20;

type IMyProfileScreenProps = INavigationProps & IWithMyProfileEnhancedData & IWithMyProfileEnhancedActions;

interface IMyProfileScreenState {
	refreshing: boolean;
	gridMediaProvider: DataProvider;
}

class Screen extends React.Component<IMyProfileScreenProps, IMyProfileScreenState> {
	// public static navigationOptions = (options: {navigation: any}) => ({
	// 	title: 'PROFILE',
	// 	headerLeft: (
	// 		<View style={styles.titleBarLeftButton}>
	// 			// @ts-ignore
	// 			<IconButton
	// 				iconSource={icons.shareIconWhite}
	// 				iconType={'image'}
	// 				iconStyle={styles.icon}
	// 				onPress={() => MyProfileScreen.goToReferralPage(options.navigation)}
	// 			/>
	// 		</View>
	// 	),
	// 	headerRight: (
	// 		<View style={styles.titleBarRightButton}>
	// 			<DotsMenuButton items={MyProfileScreen.getTooltipItems(navigation, navigationOptions.getText)} />
	// 		</View>
	// 	),
	// 	headerStyle: {
	// 		borderBottomWidth: 0,
	// 		backgroundColor: Colors.pink,
	// 		elevation: 0,
	// 	},
	// });

	// private static getTooltipItems = (navigation: NavigationScreenProp<any>, getText: any) => {
	// 	return [
	// 		// {
	// 		// 	label: getText('my.profile.screen.menu.profile.analytics'),
	// 		// 	icon: Icons.iconProfileAnalytics,
	// 		// 	actionHandler: () => MyProfileScreen.goToProfileAnalyticsPage(navigation),
	// 		// },
	// 		// {
	// 		// 	label: getText('my.profile.screen.menu.wallet'),
	// 		// 	icon: Icons.iconWallet2,
	// 		// 	actionHandler: () => MyProfileScreen.goToWalletActivityPage(navigation),
	// 		// },
	// 		{
	// 			label: getText('my.profile.screen.menu.settings'),
	// 			icon: 'ios-settings-outline',
	// 			actionHandler: () => MyProfileScreen.goToSettingsPage(navigation),
	// 		},
	// 		{
	// 			label: getText('my.profile.screen.menu.logout'),
	// 			icon: 'ios-log-out',
	// 			actionHandler: () => MyProfileScreen.logoutHandler(navigation),
	// 		},
	// 	];
	// };

	// private static goToProfileAnalyticsPage = (navigation: NavigationScreenProp<any>) => {
	// 	navigation.navigate('ProfileAnalyticsScreen');
	// };

	// private static goToWalletActivityPage = (navigation: NavigationScreenProp<any>) => {
	// 	navigation.navigate('WalletActivityScreen');
	// };

	// private static goToSettingsPage = (navigation: NavigationScreenProp<any>) => {
	// 	navigation.navigate('SettingsScreen');
	// };

	// private static goToReferralPage = (navigation: NavigationScreenProp<any>) => {
	// 	navigation.navigate('ReferralScreen');
	// };

	// private static logoutHandler = async (navigation: NavigationScreenProp<any>) => {
	// 	try {
	// 		await Signout();
	// 		await AsyncStorage.clear();
	// 		resetNavigationToRoute('PreAuthScreen', navigation);
	// 	} catch (ex) {
	// 		console.log(ex);
	// 	}
	// };

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
			refreshing: false,
		};
	}

	public render() {
		const {currentUser} = this.props;
		const {refreshing, gridMediaProvider} = this.state;
		const {
			numberOfLikes,
			numberOfPhotos,
			numberOfFriends,
			numberOfViews,
			avatarURL,
			fullName,
			userName,
			aboutMeText,
			loading,
			mediaObjects,
		} = currentUser;

		return (
			// @ts-ignore
			<MyProfileScreenView
				isLoading={loading}
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
				refreshing={refreshing}
				gridMediaProvider={gridMediaProvider}
				hasPhotos={mediaObjects.length > 0}
				onViewMediaFullScreen={this.onPhotoPressHandler}
				onEditProfile={this.onEditProfilePressHandler}
				onViewProfilePhoto={() => {
					/**/
				}}
				getText={this.props.getText}
			/>
		);
	}

	private loadMorePhotosHandler = () => {
		const {gridMediaProvider, refreshing} = this.state;
		const {mediaObjects} = this.props.currentUser;
		const headerElement = [{index: uuidv4()}];

		if (mediaObjects.length === 0) {
			this.setState({
				gridMediaProvider: gridMediaProvider.cloneWithRows(headerElement),
			});
		} else if (this.lastLoadedPhotoIndex < mediaObjects.length && !refreshing) {
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
		const {currentUser, refreshUser} = this.props;
		if (!this.state.refreshing) {
			this.setState({
				refreshing: true,
			});
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
}

export const MyProfileScreen = (navProps: INavigationProps) => (
	<WithMyProfile>{({data, actions}) => <Screen {...navProps} {...data} {...actions} />}</WithMyProfile>
);
