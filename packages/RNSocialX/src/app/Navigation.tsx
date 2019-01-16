import { Root } from 'native-base';
import React from 'react';
import { Animated, Easing } from 'react-native';
import {
	createBottomTabNavigator,
	createMaterialTopTabNavigator,
	createStackNavigator,
	NavigationSceneRendererProps,
	NavigationScreenProps,
	TransitionConfig,
} from 'react-navigation';

import {
	ActivityIndicator,
	Alert,
	Confirmation,
	Header,
	IconButton,
	OfflineOverlay,
	OptionsMenu,
	TabIcon,
	TransparentOverlay,
} from '../components';
import { SCREENS, TABS } from '../environment/consts';
import { IOptionsMenuItem, IStackDefaultConfig } from '../types';

import styles from './Navigation.style';

import {
	AdsManagementEditAdScreen,
	AdsManagementOverviewScreen,
	AdsManagementScreen,
	AdsStatisticsScreen,
	ChatScreen,
	CommentsScreen,
	CreateWallPostScreen,
	ForgotPasswordScreen,
	FriendsFeed,
	FriendsListScreen,
	GlobalFeed,
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
	TransactionHistoryScreen,
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

const MyProfileStack = createStackNavigator(
	{
		MyProfile: { screen: MyProfileScreen },
		Settings: { screen: SettingsScreen },
		Nodes: { screen: NodesScreen },
		SocialXAccount: { screen: SocialXAccountScreen },
		Referral: { screen: ReferralScreen },
		WalletActivity: { screen: WalletActivityScreen },
		TransactionHistory: { screen: TransactionHistoryScreen },
	},
	defaultConfig,
);

const FeedTabs = createMaterialTopTabNavigator(
	{
		Global: GlobalFeed,
		Friends: FriendsFeed,
	},
	{
		animationEnabled: true,
		swipeEnabled: true,
		tabBarOptions: styles.feed,
	},
);

const FeedStack = createStackNavigator(
	{
		Feed: {
			screen: FeedTabs,
			navigationOptions: (props: NavigationScreenProps) => ({
				header: (
					<Header
						logo={true}
						// right={
						// 	<IconButton
						// 		source="ios-chatboxes"
						// 		type="io"
						// 		iconStyle={styles.chat}
						// 		onPress={() => props.navigation.navigate(SCREENS.Chat)}
						// 	/>
						// }
					/>
				),
			}),
		},
	},
	{
		navigationOptions: {
			gesturesEnabled: true,
		},
	},
);

const SearchStack = createStackNavigator(
	{
		// Trending: {
		// 	screen: TrendingScreen,
		// },
		Search: {
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

const HomeTabs = createBottomTabNavigator(
	{
		FeedTab: FeedStack,
		SearchTab: SearchStack,
		PhotoTab: () => null,
		NotificationsTab: NotificationsScreen,
		ProfileTab: MyProfileStack,
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
				style: styles.tabs,
			},
		}),
	},
);

const UserProfileStack = createStackNavigator(
	{
		UserProfile: { screen: UserProfileScreen },
		MediaViewer: { screen: MediaViewerScreen },
	},
	{
		headerMode: 'none',
		mode: 'modal',
	},
);

const FriendsListStack = createStackNavigator(
	{
		FriendsList: { screen: FriendsListScreen },
		UserProfile: UserProfileStack,
	},
	{
		headerMode: 'none',
	},
);

const HomeWithModalsStack = createStackNavigator(
	{
		HomeTabs: { screen: HomeTabs },
		CreateWallPost: { screen: CreateWallPostScreen },
		Photo: { screen: PhotoScreen },
		MediaViewer: { screen: MediaViewerScreen },
	},
	{
		headerMode: 'none',
		mode: 'modal',
	},
);

const HomeStack = createStackNavigator(
	{
		Home: {
			screen: HomeWithModalsStack,
		},
		UserProfile: UserProfileStack,
		Comments: { screen: CommentsScreen },
		Likes: { screen: LikesScreen },
		FriendsList: FriendsListStack,
		Chat: { screen: ChatScreen },
	},
	{
		headerMode: 'none',
	},
);

const PreAuthStack = createStackNavigator(
	{
		Launch: { screen: LaunchScreen },
		Login: { screen: LoginScreen },
		Register: { screen: RegisterScreen },
		ForgotPassword: { screen: ForgotPasswordScreen },
		ResetPassword: { screen: ResetPasswordScreen },
		TermsAndConditions: { screen: TermsAndConditionsScreen },
	},
	defaultConfig,
);

const HomelessNavigator = createStackNavigator(
	{
		Rewards: { screen: RewardsScreen },
		AdsStatistics: { screen: AdsStatisticsScreen },
		TransactionHistory: { screen: TransactionHistoryScreen },
		WalletActivity: { screen: WalletActivityScreen },
		NewAdSlider: { screen: NewAdSliderScreen },
		AdsManagementOverview: { screen: AdsManagementOverviewScreen },
		ManageCountries: { screen: ManageCountriesScreen },
		AdsManagement: { screen: AdsManagementScreen },
		AdsManagementEditAd: { screen: AdsManagementEditAdScreen },
	},
	{
		headerMode: 'none',
	},
);

const App = createStackNavigator(
	{
		// HomelessScreens: { screen: HomelessNavigator }, // TODO: enable only when adding new screens!
		PreAuth: { screen: PreAuthStack },
		Intro: { screen: IntroScreen },
		Home: { screen: HomeStack },
		Maintenance: { screen: MaintenanceScreen },
	},
	{
		headerMode: 'none',
	},
);

const Navigation = () => (
	<WithI18n>
		{({ getText, dictionary }) => (
			<Root>
				<WithNavigationParams>
					{({ setNavigationParams }) => (
						<WithOverlays>
							{({ showOptionsMenu }) => (
								<WithNotifications>
									{({ unread }) => (
										<App
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
											<Alert errors={errors} dictionary={dictionary} />
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
