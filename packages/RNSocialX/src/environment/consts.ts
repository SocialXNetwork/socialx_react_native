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

export interface IKeyboardContextProps {
	marginBottom: number;
	safeRunAfterKeyboardHide: (handler: () => void) => void;
}

export const KeyboardContext: React.Context<
	IKeyboardContextProps
> = React.createContext({
	marginBottom: 0,
	safeRunAfterKeyboardHide: (handler: () => void) => {
		/**/
	},
});

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
}

export enum NAVIGATION {
	PreAuth = 'PreAuth',
	Intro = 'Intro',
	Main = 'Main',
	Maintenance = 'Maintenance',
}
