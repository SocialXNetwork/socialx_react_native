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
	NavigationTabBar,
	OfflineOverlayModal,
} from '../components';
import { WithNavigation } from '../enhancers/navigation/WithNavigation';
import { IDotsMenuItem, IStackDefaultConfig } from '../types';
import { tabStyles } from './Navigation.style';

import {
	AdsManagementConfigBudgetScreen,
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
import { getActivitiesForIndicator } from '../enhancers/helpers';

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

const MainStackScreens = {
	CreateWallPostScreen: { screen: CreateWallPostScreen },
	PhotoScreen: { screen: PhotoScreen },
	MediaViewerScreen: { screen: MediaViewerScreen },
	CommentsScreen: { screen: CommentsScreen },
	UserProfileScreen: { screen: UserProfileScreen },
};

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
		tabBarOptions: tabStyles,
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
		NotificationsTab: NotificationsScreen,
		MyProfileTab: MyProfileStackNavigator,
	},
	{
		tabBarPosition: 'bottom',
		animationEnabled: true,
		swipeEnabled: false,
		tabBarComponent: (props: any) => (
			<NavigationTabBar
				notifications={props.screenProps.notifications}
				navigation={props.navigation}
				getText={props.screenProps.getText}
				setNavigationParams={props.screenProps.setNavigationParams}
				showDotsMenuModal={props.screenProps.showDotsMenuModal}
			/>
		),
	},
);

const MainScreenWithModal = createStackNavigator(
	{
		MainScreenTabNavigationWithModal: { screen: MainScreenTabNavigation },
		...MainStackScreens,
	},
	{
		mode: 'modal',
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
		AdsManagementConfigBudgetScreen: {
			screen: AdsManagementConfigBudgetScreen,
		},
		AdsManagementOverviewScreen: { screen: AdsManagementOverviewScreen },
		NewAdSetupPostScreen: { screen: NewAdSetupPostScreen },
		AdsManagementScreen: { screen: AdsManagementScreen },
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
		Main: { screen: MainScreenWithModal },
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
							{(overlayProps) => (
								<AppNavigation
									screenProps={{
										notifications,
										getText,
										setNavigationParams,
										showDotsMenuModal: (items: IDotsMenuItem[]) =>
											overlayProps.showOptionsMenu({ items }),
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
									{(overlayProps) => (
										<WithI18n>
											{(i18nProps) => (
												<React.Fragment>
													<OfflineOverlayModal
														visible={!!globals.offline}
														getText={i18nProps.getText}
													/>
													<ActivityIndicatorModal
														showActivityIndicator={getActivitiesForIndicator(
															activities,
														)}
														activityIndicatorTitle={
															globals.activity ? globals.activity.title : ''
														}
														activityIndicatorMessage={
															globals.activity ? globals.activity.message : ''
														}
													/>
													<ConfirmationModal
														title={
															overlayProps.confirmation &&
															overlayProps.confirmation.title
														}
														message={
															overlayProps.confirmation &&
															overlayProps.confirmation.message
														}
														confirmActive={!!overlayProps.confirmation}
														confirmHandler={() => {
															console.log('confirmed');
															overlayProps.hideConfirmation();
														}}
														declineHandler={() => {
															console.log('declined');
															overlayProps.hideConfirmation();
														}}
													/>
													<DotsMenuModal
														visible={!!overlayProps.optionsMenu}
														items={
															(overlayProps.optionsMenu &&
																overlayProps.optionsMenu.items) ||
															[]
														}
														onBackdropPress={overlayProps.hideOptionsMenu}
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
