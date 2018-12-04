import * as React from 'react';
// DO NOT SHORTEN THIS IMPORT! For some reason, RN/Typescript cannot import the icons like that
import { Icons } from './theme/Icons';

export enum FormTypes {
	Input,
	AvatarPicker,
	Checkbox,
}

export enum DeviceOrientations {
	Portrait = 'PORTRAIT',
	Landscape = 'LANDSCAPE',
	Unknown = 'UNKNOWN',
	Upsidedown = 'PORTRAITUPSIDEDOWN',
}

export const OS_TYPES = {
	IOS: 'ios',
	Android: 'android',
};

export enum CoinSymbol {
	// here the values are in sync with CoinIcons & CoinFullName keys
	SOCX = 'SOCX',
	ETH = 'ETH',
}

export enum CoinIcons {
	SOCX = Icons.socxCoinIcon,
	ETH = Icons.ethCoinIcon,
}

export enum CoinFullName {
	SOCX = 'SOCX',
	ETH = 'Ethereum',
}

export const Currencies = ['SOCX', 'BITCOIN', 'USD', 'EUR'];

export const AdsInitialBudgetValue = '458';

export interface IWeeklyBarChartData {
	value: number;
	label: string;
}

export interface IMonthlyBarChartData {
	value: number;
	label: string;
}

export enum ISpentTillNow {
	weekly = 'weekly',
	monthly = 'monthly',
}

export const LOCAL_VIDEO_STREAM = {
	width: 1280,
	height: 960,
	frameRate: 30,
};

export const PROFILE_TAB_ICON_TYPES = {
	LIST: 'list',
	GRID: 'grid',
};

export enum NOTIFICATION_TYPES {
	RECENT_COMMENT = 'RECENT_COMMENT',
	FRIEND_REQUEST = 'FRIEND_REQUEST',
	FRIEND_REQUEST_RESPONSE = 'FRIEND_REQUEST_RESPONSE',
	GROUP_REQUEST = 'GROUP_REQUEST',
	SUPER_LIKED = 'SUPER_LIKED',
}

export const dateFormatMomentJS = {
	configBudgetScreen: 'DD/MM/YYYY',
	statisticsScreen: 'MMM DD, YYYY',
};

export enum FEED_TYPES {
	GLOBAL = 'global',
	FRIENDS = 'friends',
}

export enum SCREENS {
	Comments = 'CommentsScreen',
	CreateWallPost = 'CreateWallPostScreen',
	ForgotPassword = 'ForgotPasswordScreen',
	FriendsFeed = 'FriendsUserFeed',
	GlobalFeed = 'GlobalUserFeed',
	Intro = 'IntroScreen',
	Launch = 'LaunchScreen',
	Login = 'LoginScreen',
	Maintenance = 'MaintenanceScreen',
	MediaViewer = 'MediaViewerScreen',
	MyProfile = 'MyProfileScreen',
	Notifications = 'NotificationsScreen',
	Photo = 'PhotoScreen',
	Referral = 'ReferralScreen',
	Register = 'RegisterScreen',
	ResetPassword = 'ResetPasswordScreen',
	Settings = 'SettingsScreen',
	Nodes = 'NodesScreen',
	SocialXAccount = 'SocialXAccountScreen',
	TermsAndConditions = 'TermsAndConditionsScreen',
	UserProfile = 'UserProfileScreen',
	WalletActivity = 'WalletActivityScreen',
	ProfileAnalytics = 'ProfileAnalyticsScreen',
	TabbedSearch = 'TabbedSearchScreen',
	Trending = 'TrendingScreen',
	UserFeed = 'UserFeedTab',
	WalletAccount = 'WalletAccountScreen',
	WalletKeys = 'WalletKeysScreen',
	AdsManagement = 'AdsManagementScreen',
	Likes = 'LikesScreen',
	ManageCountries = 'ManageCountriesScreen',
}

export enum NAVIGATION {
	PreAuth = 'PreAuth',
	Intro = 'Intro',
	Main = 'Main',
	Maintenance = 'Maintenance',
}

export enum TABS {
	Feed = 'UserFeedTab',
	Search = 'SearchTab',
	Notifications = 'NotificationsTab',
	Profile = 'MyProfileTab',
}

export enum IMAGE_PICKER_TYPES {
	Camera = 'Camera',
	Gallery = 'Gallery',
}

export const HEART_ANIMATION_TIME = 1000;
