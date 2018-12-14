import React from 'react';
import { Animated, Easing } from 'react-native';
import {
	createBottomTabNavigator,
	createMaterialTopTabNavigator,
	createStackNavigator,
	NavigationSceneRendererProps,
	TransitionConfig,
} from 'react-navigation';

import { Root } from 'native-base';

import {
	ActivityIndicatorModal,
	ConfirmationModal,
	Header,
	OfflineOverlayModal,
	OptionsMenuModal,
	TabIcon,
	TransparentOverlayModal,
} from '../components';
import { IOptionsMenuItem, IStackDefaultConfig } from '../types';

import styles, { tabStyles } from './Navigation.style';

import {
	AdsManagementEditAdScreen,
	AdsManagementOverviewScreen,
	AdsManagementScreen,
	AdsStatisticsScreen,
	CommentsScreen,
	CreateWallPostScreen,
	ForgotPasswordScreen,
	FriendsUserFeed,
	GlobalUserFeed,
	IntroScreen,
	LaunchScreen,
	LikesScreen,
	LoginScreen,
	MaintenanceScreen,
	ManageCountriesScreen,
	MediaViewerScreen,
	MyProfileScreen,
	NewAdSliderScreen,
	NodesScreen,
	NotificationsScreen,
	PhotoScreen,
	ReferralScreen,
	RegisterScreen,
	ResetPasswordScreen,
	SearchScreen,
	SettingsScreen,
	SocialXAccountScreen,
	TermsAndConditionsScreen,
	TrendingScreen,
	UserProfileScreen,
	WalletActivityScreen,
} from '../screens';

import { WithI18n } from '../enhancers/connectors/app/WithI18n';
import { WithNavigationParams } from '../enhancers/connectors/app/WithNavigationParams';
import { WithGlobals } from '../enhancers/connectors/ui/WithGlobals';
import { WithOverlays } from '../enhancers/connectors/ui/WithOverlays';
import { WithNotifications } from '../enhancers/screens/mainTabNav/WithNotifications';

const defaultConfig: IStackDefaultConfig = {
	headerMode: 'none',
	navigationOptions: {
		gesturesEnabled: true,
	},
};

// keep this as a reference for later use
const slideFromLeftTransition = (): TransitionConfig => ({
	transitionSpec: {
		duration: 700,
		easing: Easing.out(Easing.poly(4)),
		timing: Animated.timing,
	},
	screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
		const { layout, position, scene } = sceneProps;

		const thisSceneIndex = scene.index;
		const width = layout.initWidth;

		const translateX = position.interpolate({
			inputRange: [thisSceneIndex - 1, thisSceneIndex],
			outputRange: [-width, 0],
		});

		return { transform: [{ translateX }] };
	},
});

const fadeIn = (): TransitionConfig => ({
	screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
		const { position, scene } = sceneProps;

		const sceneIndex = scene.index;

		const opacity = position.interpolate({
			inputRange: [sceneIndex - 1, sceneIndex],
			outputRange: [0, 1],
		});

		return { opacity };
	},
});

const MyProfileStackNavigator = createStackNavigator(
	{
		MyProfileScreen: { screen: MyProfileScreen },
		SettingsScreen: { screen: SettingsScreen },
		NodesScreen: { screen: NodesScreen },
		SocialXAccountScreen: { screen: SocialXAccountScreen },
		ReferralScreen: { screen: ReferralScreen },
		WalletActivityScreen: { screen: WalletActivityScreen },
	},
	defaultConfig,
);

const TabbedFeedNavigator = createMaterialTopTabNavigator(
	{
		Global: GlobalUserFeed,
		Friends: FriendsUserFeed,
	},
	{
		animationEnabled: true,
		swipeEnabled: true,
		tabBarOptions: styles,
	},
);

const UserFeedStackNavigator = createStackNavigator(
	{
		TabbedFeedScreen: {
			screen: TabbedFeedNavigator,
			navigationOptions: () => ({
				header: <Header logo={true} />,
			}),
		},
	},
	{
		navigationOptions: {
			gesturesEnabled: true,
		},
	},
);

const UserSearchStackNavigator = createStackNavigator(
	{
		// TrendingScreen: {
		// 	screen: TrendingScreen,
		// },
		SearchScreen: {
			screen: SearchScreen,
		},
	},
	{
		navigationOptions: {
			gesturesEnabled: false,
		},
		headerMode: 'none',
		transitionConfig: fadeIn,
	},
);

const MainScreenTabNavigation = createBottomTabNavigator(
	{
		UserFeedTab: UserFeedStackNavigator,
		SearchTab: UserSearchStackNavigator,
		PhotoTab: () => null,
		NotificationsTab: NotificationsScreen,
		MyProfileTab: MyProfileStackNavigator,
	},
	{
		navigationOptions: (props) => ({
			tabBarIcon: ({ focused }) => {
				return (
					<TabIcon
						navigation={props.navigation}
						focused={focused}
						notifications={props.screenProps.notifications}
						setNavigationParams={props.screenProps.setNavigationParams}
						showOptionsMenu={props.screenProps.showOptionsMenu}
						getText={props.screenProps.getText}
					/>
				);
			},
			tabBarOnPress: ({ navigation, defaultHandler }) => {
				if (navigation.state.routeName !== 'PhotoTab') {
					defaultHandler();
				}
			},
			tabBarOptions: {
				showLabel: false,
				style: tabStyles,
			},
		}),
	},
);

const UserProfileStack = createStackNavigator(
	{
		UserProfileScreen: { screen: UserProfileScreen },
		MediaViewerScreen: { screen: MediaViewerScreen },
	},
	{
		headerMode: 'none',
		mode: 'modal',
	},
);

const MainScreensWithModal = createStackNavigator(
	{
		MainScreenTabNavigation: { screen: MainScreenTabNavigation },
		CreateWallPostScreen: { screen: CreateWallPostScreen },
		PhotoScreen: { screen: PhotoScreen },
		MediaViewerScreen: { screen: MediaViewerScreen },
	},
	{
		headerMode: 'none',
		mode: 'modal',
	},
);

const MainScreens = createStackNavigator(
	{
		MainScreensWithModal: {
			screen: MainScreensWithModal,
		},
		UserProfileScreen: UserProfileStack,
		CommentsScreen: { screen: CommentsScreen },
		LikesScreen: { screen: LikesScreen },
	},
	{
		headerMode: 'none',
	},
);

const PreAuthNavigator = createStackNavigator(
	{
		LaunchScreen: { screen: LaunchScreen },
		LoginScreen: { screen: LoginScreen },
		RegisterScreen: { screen: RegisterScreen },
		ForgotPasswordScreen: { screen: ForgotPasswordScreen },
		ResetPasswordScreen: { screen: ResetPasswordScreen },
		TermsAndConditionsScreen: { screen: TermsAndConditionsScreen },
	},
	defaultConfig,
);

const HomelessNavigator = createStackNavigator(
	{
		NewAdSliderScreen: { screen: NewAdSliderScreen },
		AdsManagementOverviewScreen: { screen: AdsManagementOverviewScreen },
		ManageCountriesScreen: { screen: ManageCountriesScreen },
		AdsManagementScreen: { screen: AdsManagementScreen },
		AdsManagementEditAdScreen: { screen: AdsManagementEditAdScreen },
		AdsStatisticsScreen: { screen: AdsStatisticsScreen },
	},
	{
		headerMode: 'none',
	},
);

const AppNavigation = createStackNavigator(
	{
		// HomelessScreens: { screen: HomelessNavigator }, // TODO: enable only when adding new screens!
		PreAuth: { screen: PreAuthNavigator },
		Intro: { screen: IntroScreen },
		Main: { screen: MainScreens },
		Maintenance: { screen: MaintenanceScreen },
	},
	{
		headerMode: 'none',
	},
);

const Navigation = () => (
	<WithI18n>
		{({ getText }) => (
			<Root>
				<WithNavigationParams>
					{({ setNavigationParams }) => (
						<WithOverlays>
							{({ showOptionsMenu }) => (
								<WithNotifications>
									{({ data }) => (
										<AppNavigation
											screenProps={{
												notifications: data.unreadNotifications,
												showOptionsMenu: (items: IOptionsMenuItem[]) => showOptionsMenu({ items }),
												setNavigationParams,
												getText,
											}}
										/>
									)}
								</WithNotifications>
							)}
						</WithOverlays>
					)}
				</WithNavigationParams>
				<WithGlobals>
					{({ globals }) => (
						<WithOverlays>
							{({ confirmation, hideConfirmation, optionsMenu, hideOptionsMenu }) => (
								<React.Fragment>
									<TransparentOverlayModal
										visible={globals.transparentOverlay.visible}
										alpha={globals.transparentOverlay.alpha}
										loader={globals.transparentOverlay.loader}
									/>
									<OfflineOverlayModal visible={!!globals.offline} getText={getText} />
									<ActivityIndicatorModal
										visible={globals.activity.visible}
										title={globals.activity.title}
										message={globals.activity.message}
										getText={getText}
									/>
									<ConfirmationModal
										title={confirmation && confirmation.title}
										message={confirmation && confirmation.message}
										confirmActive={!!confirmation}
										confirmHandler={() => {
											if (confirmation) {
												confirmation.confirmHandler();
											}
											hideConfirmation();
										}}
										declineHandler={() => {
											if (confirmation && confirmation.cancelHandler) {
												confirmation.cancelHandler();
											}
											hideConfirmation();
										}}
									/>
									<OptionsMenuModal
										visible={!!optionsMenu}
										items={(optionsMenu && optionsMenu.items) || []}
										onBackdropPress={hideOptionsMenu}
									/>
								</React.Fragment>
							)}
						</WithOverlays>
					)}
				</WithGlobals>
			</Root>
		)}
	</WithI18n>
);

export default Navigation;
