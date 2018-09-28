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
	NavigationTabBar,
	OfflineOverlayModal,
} from '../components';
import { WithNavigation } from '../enhancers/navigation/WithNavigation';
import { IStackDefaultConfig } from '../types';
import { tabStyles } from './Navigation.style';

import {
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
		},
	},
	defaultConfig,
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
		SignUpScreen: { screen: RegisterScreen },
		ForgotPasswordScreen: { screen: ForgotPasswordScreen },
		ResetPasswordScreen: { screen: ResetPasswordScreen },
		TermsAndConditionsScreen: { screen: TermsAndConditionsScreen },
	},
	defaultConfig,
);

const AppNavigation = createStackNavigator(
	{
		PreAuthScreen: { screen: PreAuthNavigator },
		IntroScreen: { screen: IntroScreen },
		MainScreen: { screen: MainScreenWithModal },
		Maintenance: { screen: MaintenanceScreen },
	},
	{
		headerMode: 'none',
	},
);

const Navigation = () => (
	<WithNavigation>
		{({ notifications, getText }) => (
			<Root>
				<AppNavigation screenProps={{ notifications, getText }} />
				<WithGlobals>
					{(globalsProps) => (
						<WithActivities>
							{(activitiesProps) => (
								<WithOverlays>
									{(overlayProps) => (
										<WithI18n>
											{(i18nProps) => (
												<React.Fragment>
													<OfflineOverlayModal
														visible={!!globalsProps.globals.offline}
														getText={i18nProps.getText}
													/>
													<ActivityIndicatorModal
														showActivityIndicator={
															activitiesProps.activities.length > 0
														}
														activityIndicatorTitle={
															activitiesProps.activities.length > 0
																? activitiesProps.activities[0].uuid
																: ''
														}
														activityIndicatorMessage={
															activitiesProps.activities.length > 0
																? activitiesProps.activities[0].type
																: ''
														}
													/>
													<ConfirmationModal
														getText={i18nProps.getText}
														title={
															overlayProps.confirmation &&
															overlayProps.confirmation.title
														}
														message={
															overlayProps.confirmation &&
															overlayProps.confirmation.message
														}
														confirmActive={!!overlayProps.confirmation}
														confirmHandler={overlayProps.hideConfirmation}
														declineHandler={overlayProps.hideConfirmation}
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
