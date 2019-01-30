import React from 'react';
import { Animated, Easing } from 'react-native';
import {
	createAppContainer,
	createBottomTabNavigator,
	createMaterialTopTabNavigator,
	createStackNavigator,
	NavigationContainerComponent,
	NavigationSceneRendererProps,
	NavigationScreenProps,
	TransitionConfig,
} from 'react-navigation';

import {
	ActivityIndicator,
	Alert,
	Header,
	IconButton,
	MediaOverlay,
	OfflineOverlay,
	OptionsMenu,
	TabIcon,
	TransparentOverlay,
} from '../components';
import { SCREENS, TABS } from '../environment/consts';
import { IStackDefaultConfig } from '../types';

import styles from './Navigation.style';

import {
	AdsManagementEditAdScreen,
	AdsManagementOverviewScreen,
	AdsManagementScreen,
	AdsStatisticsScreen,
	AllMessagesScreen,
	ChatSearchScreen,
	CommentsScreen,
	ConversationScreen,
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
	defaultNavigationOptions: {
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
	screenInterpolator: (props: NavigationSceneRendererProps) => {
		const { layout, position, scene } = props;

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
	screenInterpolator: (props: NavigationSceneRendererProps) => {
		const { position, scene } = props;

		const sceneIndex = scene.index;

		const opacity = position.interpolate({
			inputRange: [sceneIndex - 1, sceneIndex],
			outputRange: [0, 1],
		});

		return { opacity };
	},
});

const commonScreens = {
	UserProfile: { screen: UserProfileScreen },
	Comments: { screen: CommentsScreen },
	Likes: { screen: LikesScreen },
	FriendsList: { screen: FriendsListScreen },
};

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
						right={
							<IconButton
								source="ios-chatboxes"
								type="io"
								iconStyle={styles.chat}
								onPress={() => props.navigation.navigate(SCREENS.Chat)}
							/>
						}
					/>
				),
			}),
		},
	},
	{
		defaultNavigationOptions: {
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
		defaultNavigationOptions: {
			gesturesEnabled: false,
		},
		headerMode: 'none',
		transitionConfig: fadeIn,
	},
);

const ChatStack = createStackNavigator(
	{
		AllMessages: { screen: AllMessagesScreen },
		Conversation: { screen: ConversationScreen },
		...commonScreens,
	},
	{
		headerMode: 'none',
		defaultNavigationOptions: {
			gesturesEnabled: false,
		},
	},
);

const ChatSearchStack = createStackNavigator(
	{
		ChatSearch: { screen: ChatSearchScreen },
		Conversation: { screen: ConversationScreen },
	},
	{
		headerMode: 'none',
		defaultNavigationOptions: {
			gesturesEnabled: false,
		},
	},
);

const ChatWithSearch = createStackNavigator(
	{
		ChatStack,
		ChatSearchStack,
	},
	{
		headerMode: 'none',
		defaultNavigationOptions: {
			gesturesEnabled: false,
		},
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
		defaultNavigationOptions: (props) => ({
			tabBarIcon: ({ focused }) => {
				return (
					<TabIcon
						focused={focused}
						navigation={props.navigation}
						notifications={props.screenProps.notifications}
						setNavigationParams={props.screenProps.setNavigationParams}
						showOptionsMenu={props.screenProps.showOptionsMenu}
						dictionary={props.screenProps.dictionary}
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

const HomeWithModalsStack = createStackNavigator(
	{
		HomeTabs: { screen: HomeTabs },
		CreateWallPost: { screen: CreateWallPostScreen },
		Photo: { screen: PhotoScreen },
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
		Chat: ChatWithSearch,
		...commonScreens,
	},
	{
		headerMode: 'none',
	},
);

const PreAuthStack = createStackNavigator(
	{
		// ChatWithSearch,
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

const Root = createAppContainer(App);
export let navigator: NavigationContainerComponent | null;

const Navigation = () => (
	<WithI18n>
		{({ dictionary }) => (
			<React.Fragment>
				<WithNavigationParams>
					{({ setNavigationParams }) => (
						<WithOverlays>
							{({ showOptionsMenu }) => (
								<WithNotifications>
									{({ unread }) => (
										<Root
											ref={(nav) => (navigator = nav)}
											screenProps={{
												notifications: unread.length,
												dictionary,
												showOptionsMenu,
												setNavigationParams,
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
							{({ optionsMenuItems, hideOptionsMenu }) => (
								<WithActivities>
									{({ errors }) => (
										<React.Fragment>
											<Alert errors={errors} dictionary={dictionary} />
											<TransparentOverlay
												visible={globals.transparentOverlay.visible}
												alpha={globals.transparentOverlay.alpha}
												loader={globals.transparentOverlay.loader}
											/>
											<OfflineOverlay visible={!!globals.offline} dictionary={dictionary} />
											<ActivityIndicator
												visible={globals.activity.visible}
												title={globals.activity.title}
												message={globals.activity.message}
												dictionary={dictionary}
											/>
											<OptionsMenu
												visible={optionsMenuItems.length > 0}
												items={optionsMenuItems}
												onBackdropPress={hideOptionsMenu}
											/>
											<MediaOverlay />
										</React.Fragment>
									)}
								</WithActivities>
							)}
						</WithOverlays>
					)}
				</WithGlobals>
			</React.Fragment>
		)}
	</WithI18n>
);

export default Navigation;
