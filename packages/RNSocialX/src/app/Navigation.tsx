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
import { IStackDefaultConfig } from '../types';
import { tabStyles } from './Navigation.style';

import {
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
	NotificationsScreen,
	PhotoScreen,
	ReferralScreen,
	RegisterScreen,
	ResetPasswordScreen,
	SettingsScreen,
	SocialXAccountScreen,
	TermsAndConditionsScreen,
	UserProfileScreen,
	WalletActivityScreen,
} from '../screens';

import {
	PeopleTab,
	PlacesTab,
	TagsTab,
	TopTab,
	TrendingScreen,
} from '../screens/mainTabNav/SearchScreen';

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

const TabbedSearchNavigator = createMaterialTopTabNavigator(
	{
		Top: TopTab,
		People: PeopleTab,
		Tags: TagsTab,
		Places: PlacesTab,
	},
	{
		animationEnabled: true,
		swipeEnabled: true,
		tabBarOptions: tabStyles,
	},
);

const UserSearchStackNavigator = createStackNavigator(
	{
		Trending: {
			screen: TrendingScreen,
		},
		TabbedSearchScreen: {
			screen: TabbedSearchNavigator,
		},
	},
	{
		navigationOptions: {
			gesturesEnabled: false,
		},
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
		transitionConfig: slideFromLeftTransition,
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

const AppNavigation = createStackNavigator(
	{
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
						<AppNavigation
							screenProps={{ notifications, getText, setNavigationParams }}
						/>
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
														showActivityIndicator={activities.length > 0}
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
