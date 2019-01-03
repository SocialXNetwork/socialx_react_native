import { Root } from 'native-base';
import React from 'react';
import { Animated, Easing } from 'react-native';
import {
	createBottomTabNavigator,
	createMaterialTopTabNavigator,
	createStackNavigator,
	NavigationSceneRendererProps,
	TransitionConfig,
} from 'react-navigation';

import {
	ActivityIndicator,
	Alert,
	Confirmation,
	Header,
	OfflineOverlay,
	OptionsMenu,
	TabIcon,
	TransparentOverlay,
} from '../components';
import { TABS } from '../environment/consts';
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
	RewardsScreen,
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
import { WithNotifications } from '../enhancers/connectors/data/WithNotifications';
import { WithActivities } from '../enhancers/connectors/ui/WithActivities';
import { WithGlobals } from '../enhancers/connectors/ui/WithGlobals';
import { WithOverlays } from '../enhancers/connectors/ui/WithOverlays';

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
						focused={focused}
						navigation={props.navigation}
						notifications={props.screenProps.notifications}
						setNavigationParams={props.screenProps.setNavigationParams}
						showOptionsMenu={props.screenProps.showOptionsMenu}
						getText={props.screenProps.getText}
					/>
				);
			},
			tabBarOnPress: ({ navigation, defaultHandler }) => {
				if (navigation.state.routeName !== TABS.Photo) {
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
		RewardsScreen: { screen: RewardsScreen },
		AdsStatisticsScreen: { screen: AdsStatisticsScreen },
		NewAdSliderScreen: { screen: NewAdSliderScreen },
		AdsManagementOverviewScreen: { screen: AdsManagementOverviewScreen },
		ManageCountriesScreen: { screen: ManageCountriesScreen },
		AdsManagementScreen: { screen: AdsManagementScreen },
		AdsManagementEditAdScreen: { screen: AdsManagementEditAdScreen },
	},
	{
		headerMode: 'none',
	},
);

const AppNavigation = createStackNavigator(
	{
		HomelessScreens: { screen: HomelessNavigator }, // TODO: enable only when adding new screens!
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
									{({ unread }) => (
										<AppNavigation
											screenProps={{
												notifications: unread.length,
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
								<WithActivities>
									{({ errors }) => (
										<React.Fragment>
											<Alert errors={errors} getText={getText} />
											<TransparentOverlay
												visible={globals.transparentOverlay.visible}
												alpha={globals.transparentOverlay.alpha}
												loader={globals.transparentOverlay.loader}
											/>
											<OfflineOverlay visible={!!globals.offline} getText={getText} />
											<ActivityIndicator
												visible={globals.activity.visible}
												title={globals.activity.title}
												message={globals.activity.message}
												getText={getText}
											/>
											<Confirmation
												title={confirmation && confirmation.title}
												message={confirmation && confirmation.message}
												confirmActive={!!confirmation}
												onConfirm={() => {
													if (confirmation) {
														confirmation.confirmHandler();
													}
													hideConfirmation();
												}}
												onDecline={() => {
													if (confirmation && confirmation.cancelHandler) {
														confirmation.cancelHandler();
													}
													hideConfirmation();
												}}
											/>
											<OptionsMenu
												visible={!!optionsMenu}
												items={(optionsMenu && optionsMenu.items) || []}
												onBackdropPress={hideOptionsMenu}
											/>
										</React.Fragment>
									)}
								</WithActivities>
							)}
						</WithOverlays>
					)}
				</WithGlobals>
			</Root>
		)}
	</WithI18n>
);

export default Navigation;
