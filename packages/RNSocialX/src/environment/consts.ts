/*
 *	TODO:
 *	1. Alex C: Replace icons from TransactionIcons with ones provided by @Dunja
 */

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
// DO NOT SHORTEN THIS IMPORT! For some reason, RN/Typescript cannot import the icons like that
import { Icons } from './theme/Icons';
import { Sizes } from './theme/Sizes';

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

export enum TransactionIcons {
	CONVERTED = Icons.socxCoinIcon,
	SENT = Icons.ethCoinIcon,
}

export enum TransactionSymbol {
	// If the Transaction is RECEIVED then the Transaction Icon will be taken from CoinIcons
	CONVERTED = 'CONVERTED',
	SENT = 'SENT',
}

export enum TransactionFromType {
	POOL = 'REWARD POOL',
	USER = 'USER',
}

export const Currencies = ['SOCX', 'BITCOIN', 'USD', 'EUR'];

export const AdsInitialBudgetValue = '458';

export interface IRewardsHistoryData {
	date: string;
	amount: number;
	currency: string;
}

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

export enum IRewardsDate {
	daily = 'daily',
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
	FRIEND_RESPONSE_ACCEPTED = 'FRIEND_RESPONSE_ACCEPTED',
	FRIEND_RESPONSE_DECLINED = 'FRIEND_RESPONSE_DECLINED',
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
	Comments = 'Comments',
	CreateWallPost = 'CreateWallPost',
	ForgotPassword = 'ForgotPassword',
	Intro = 'Intro',
	Launch = 'Launch',
	Login = 'Login',
	Maintenance = 'Maintenance',
	MyProfile = 'MyProfile',
	Notifications = 'Notifications',
	Photo = 'Photo',
	Referral = 'Referral',
	Register = 'Register',
	ResetPassword = 'ResetPassword',
	Settings = 'Settings',
	Nodes = 'Nodes',
	SocialXAccount = 'SocialXAccount',
	TermsAndConditions = 'TermsAndConditions',
	UserProfile = 'UserProfile',
	WalletActivity = 'WalletActivity',
	ProfileAnalytics = 'ProfileAnalytics',
	Search = 'Search',
	Trending = 'Trending',
	Feed = 'Feed',
	WalletAccount = 'WalletAccount',
	WalletKeys = 'WalletKeys',
	RewardsScreen = 'Rewards',
	AdsManagement = 'AdsManagement',
	Likes = 'Likes',
	ManageCountries = 'ManageCountries',
	Rewards = 'Rewards',
	RewardsTransactionHistory = 'TransactionHistory',
	FriendsList = 'FriendsList',
	Chat = 'Chat',
	AllMessages = 'AllMessages',
	ChatSearch = 'ChatSearch',
	Conversation = 'Conversation',
	AllBounties = 'AllBounties',
	Bounty = 'Bounty',
}

export enum NAVIGATION {
	PreAuth = 'PreAuth',
	Intro = 'Intro',
	Home = 'Home',
	Maintenance = 'Maintenance',
}

export enum TABS {
	Feed = 'FeedTab',
	Search = 'SearchTab',
	Photo = 'PhotoTab',
	Notifications = 'NotificationsTab',
	Profile = 'ProfileTab',
}

export enum IMAGE_PICKER_TYPES {
	Camera = 'Camera',
	Gallery = 'Gallery',
}

export enum ICON_TYPES {
	IO = 'ionicon',
	FA = 'font-awesome',
	OCT = 'octicon',
	ENT = 'entypo',
}

export const HEART_ANIMATION_TIME = 1000;
export const USER_AVATAR_PLACEHOLDER = 'QmZgsU2Syps515N6xYFcLoL6u9pyqcvzNdz5xUtZQM7oV9';
export const HEADER_HEIGHT = Sizes.smartVerticalScale(45);
export const STATUS_BAR_HEIGHT = getStatusBarHeight();
export const MINIMUM_SCROLL_DISTANCE = 200;
