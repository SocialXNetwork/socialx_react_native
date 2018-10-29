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
	DotsMenuModal,
	Header,
	OfflineOverlayModal,
	TabIcon,
	TransparentOverlayModal,
} from '../components';
import { WithNavigation } from '../enhancers/navigation/WithNavigation';
import { IDotsMenuItem, IStackDefaultConfig } from '../types';

import styles, { tabBarBackgroundColor } from './Navigation.style';

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
	LoginScreen,
	MaintenanceScreen,
	MediaViewerScreen,
	MyProfileScreen,
	NewAdConfigBudgetScreen,
	NewAdSetupAudience,
	NewAdSetupPostScreen,
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
		SocialXAccountScreen: { screen: SocialXAccountScreen },
		ReferralScreen: { screen: ReferralScreen },
		WalletActivityScreen: { screen: WalletActivityScreen },
	},
	defaultConfig,
);

const TabbedFeedNavigator = createMaterialTopTabNavigator(
	{
		Friends: FriendsUserFeed,
		Global: GlobalUserFeed,
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
		TrendingScreen: {
			screen: TrendingScreen,
		},
		TabbedSearchScreen: {
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
						showDotsMenuModal={props.screenProps.showDotsMenuModal}
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
				style: {
					backgroundColor: tabBarBackgroundColor,
				},
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
		AdsStatisticsScreen: { screen: AdsStatisticsScreen },
		AdsManagementScreen: { screen: AdsManagementScreen },
		AdsManagementEditAdScreen: { screen: AdsManagementEditAdScreen },
		NewAdSetupAudience: { screen: NewAdSetupAudience },
		NewAdSetupPostScreen: { screen: NewAdSetupPostScreen },
		NewAdConfigBudgetScreen: {
			screen: NewAdConfigBudgetScreen,
		},
		AdsManagementOverviewScreen: { screen: AdsManagementOverviewScreen },
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

// TODO @jake @serkan @alex when jake completes the notifications provider and redux api,
// we will remove WithNavigation from here and instead directly use WithI18n and WithNotifications
const Navigation = () => (
	<WithNavigation>
		{({ notifications, getText }) => (
			<Root>
				<WithNavigationParams>
					{({ setNavigationParams }) => (
						<WithOverlays>
							{({ showOptionsMenu }) => (
								<AppNavigation
									screenProps={{
										notifications,
										getText,
										setNavigationParams,
										showDotsMenuModal: (items: IDotsMenuItem[]) => showOptionsMenu({ items }),
									}}
								/>
							)}
						</WithOverlays>
					)}
				</WithNavigationParams>
				<WithGlobals>
					{({ globals }) => (
						<WithActivities>
							{({ activities }) => (
								<WithOverlays>
									{({ confirmation, hideConfirmation, optionsMenu, hideOptionsMenu }) => (
										<WithI18n>
											{(i18n) => (
												<React.Fragment>
													<TransparentOverlayModal
														visible={globals.transparentOverlay.visible}
														alpha={globals.transparentOverlay.alpha}
														loader={globals.transparentOverlay.loader}
													/>
													<OfflineOverlayModal visible={!!globals.offline} getText={i18n.getText} />
													<ActivityIndicatorModal
														visible={globals.activity.visible}
														title={globals.activity.title}
														message={globals.activity.message}
														getText={i18n.getText}
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
													<DotsMenuModal
														visible={!!optionsMenu}
														items={(optionsMenu && optionsMenu.items) || []}
														onBackdropPress={hideOptionsMenu}
													/>
												</React.Fragment>
											)}
										</WithI18n>
									)}
								</WithOverlays>
							)}
						</WithActivities>
					)}
				</WithGlobals>
			</Root>
		)}
	</WithNavigation>
);

export default Navigation;
