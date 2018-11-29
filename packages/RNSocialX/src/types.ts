/**
 * TODO list:
 * 1. Remove all type imports from components!
 */

import { Image as PickerImage } from 'react-native-image-crop-picker';
import { NavigationScreenConfig, NavigationScreenProp } from 'react-navigation';

import { IAccountCurrencyData } from './components';
import { CoinSymbol, NOTIFICATION_TYPES } from './environment/consts';
import { ISetNavigationParamsInput } from './store/app/navigationParams';

export interface IFriendsSearchResult {
	id: string;
	fullName: string;
	location: string;
	avatar: string;
}

export enum FRIEND_TYPES {
	PENDING = 'pending',
	MUTUAL = 'mutual',
	NOT_FRIEND = 'not_friend',
}

export enum SearchTabs {
	Top = 'TOP',
	People = 'PEOPLE',
	Tags = 'TAGS',
	Places = 'PLACES',
}

export interface IUserEntry {
	userId: string;
	fullName: string;
	userName: string;
	avatar: string;
	relationship: FRIEND_TYPES;
}

export type getTextSignature = (value: string, ...args: any[]) => string;

export interface ITranslatedProps {
	getText: getTextSignature;
}

export interface IGlobal {
	[name: string]: any;
}

export interface IError {
	uuid: string;
	type: string | null;
	error: {
		message: string;
		type: string;
	} | null;
	timeout?: number;
}

export interface IUploadFileInput {
	path: string;
}

export interface IFriendshipInput {
	username: string;
}

export interface INotificationData {
	notificationId: string;
	userId: string;
	type: NOTIFICATION_TYPES;
	fullName: string;
	avatar: string;
	userName?: string;
	timestamp?: Date;
	groupName?: string;
	seen: boolean;
}

export interface IOptionsMenuItem {
	label: string;
	icon: string;
	actionHandler: () => void;
}

export interface IHeaderProps {
	onGoBack: () => void;
}

export interface IOptionsMenuProps {
	showOptionsMenu: (items: IOptionsMenuItem[]) => void;
}

export interface INavigationParamsActions {
	setNavigationParams: (setNavigationParamsInput: ISetNavigationParamsInput) => void;
}

export interface IResizeProps {
	marginBottom: number;
}

export interface IConfirmationModalProps {
	title?: string;
	message?: string;
	confirmButton?: string;
	cancelButton?: string;
	confirmHandler?: () => void;
	declineHandler?: () => void;
}

export interface IConfirmActions {
	showConfirm: (confirmationOptions: IConfirmationModalProps) => void;
	hideConfirm: () => void;
}

export interface IMediaTypes {
	key: string;
	name: string;
	category: string;
}

export const MediaTypeImage: IMediaTypes = {
	key: 'image',
	name: 'Photo',
	category: 'Photography',
};

export const MediaTypeVideo: IMediaTypes = {
	key: 'video',
	name: 'Video',
	category: 'Videos',
};

export interface IGridMedia {
	hash: string;
	type: IMediaTypes;
	index: number;
}

export interface IMedia {
	hash: string;
	type: IMediaTypes;
	extension: string;
	size: number;
}

export interface IMedias {
	objects: IMedia[];
	postId: string;
}

export interface IPostOwner {
	userId: string;
	fullName: string;
	avatar: string;
}

export interface IComment {
	commentId: string;
	text: string;
	user: IPostOwner;
	timestamp: Date;
	likeIds: string[];
	likedByCurrentUser: boolean;
}

export interface IWallPostPhotoOptimized extends PickerImage {
	contentOptimizedPath?: string;
	type: string;
	pathx: string;
}

export interface IWallPost {
	postId: string;
	postText: string;
	location: string | undefined;
	taggedFriends: Array<{ fullName: string }> | undefined;
	timestamp: Date;
	owner: IPostOwner;
	likedByCurrentUser: boolean;
	removable: boolean;
	media: IMedias;
	likeIds: string[];
	commentIds: string[];
	topCommentIds: string[];
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
	suggested: IUserEntry[] | undefined;
	loading: boolean;
	offensiveContent: boolean;
}

export interface ICreateWallPostData {
	text: string;
	media: IWallPostPhotoOptimized[];
	taggedFriends?: Array<{
		fullName: string;
	}>;
	location?: string;
}

export enum TransactionType {
	Sold = 'Sold',
	Bought = 'Bought',
}

export enum TrendOptions {
	Up = 'UP',
	Down = 'DOWN',
}

export interface ITransactionData {
	id: string;
	type: TransactionType;
	firstAmount: number;
	firstCoin: CoinSymbol;
	secondAmount: number;
	secondCoin: CoinSymbol;
	date: Date;
}

export interface IWallet {
	coins: string;
	trendPercentage: string;
	trendArrow: TrendOptions;
	transactions: ITransactionData[];
	refreshing: boolean;
}

export interface ISearchTabResultsProps {
	navigation: NavigationScreenProp<any>;
	searchTermValue: string;
}

// =====================================================
// ENHANCER DATA TYPES
// =====================================================

export interface ICurrentUser {
	userId: string;
	avatar: string;
	email: string;
	pub: string;
	fullName: string;
	userName: string;
	description: string;
	numberOfLikes: number;
	numberOfPhotos: number;
	numberOfFriends: number;
	numberOfComments: number;
	media: IMedias;
	recentPosts: IWallPost[];
	miningEnabled: boolean;
	shareDataEnabled: boolean;
}

export interface IVisitedUser {
	userId: string;
	avatar: string;
	fullName: string;
	userName: string;
	description: string;
	numberOfLikes: number;
	numberOfPhotos: number;
	numberOfFriends: number;
	numberOfComments: number;
	media: IMedias;
	recentPosts: IWallPost[];
	relationship: FRIEND_TYPES;
}

export interface IProfile {
	pub: string;
	email: string;
	avatar: string;
	fullName: string;
	miningEnabled: boolean;
	aboutMeText: string;
	alias: string;
	status: FRIEND_TYPES;
	numberOfFriends: number;
}

export interface ICryptoStats {
	coins: number;
	contribution: number;
	returnPercentage: number;
	digitalCoins: IAccountCurrencyData[];
}

export interface INavigationProps<SP = any, SC = any> {
	navigation: NavigationScreenProp<SP>;
	navigationOptions?: NavigationScreenConfig<SC>;
}

export interface IStackDefaultConfig {
	headerMode: 'none' | 'float' | 'screen' | undefined;
	navigationOptions: {
		gesturesEnabled: boolean;
	};
}

export interface ITrendingCategoriesItem {
	id: string;
	name: string;
	url: string;
}

interface ITrendingContentImage {
	type: string;
	url: string;
	postId: string;
	middle?: boolean;
}

interface ITrendingContentImageWithVideo {
	type: string;
	url: string;
	postId: string;
}

export interface ITrendingContentItem {
	name: string;
	content: Array<ITrendingContentImage | ITrendingContentImageWithVideo[]>;
}

export interface IAdsAccountPerformanceValues {
	value: number;
	date: Date;
}

export interface IAd {
	name?: string;
	url: string;
	editable?: boolean;
	title: string;
	description: string;
	id: string;
	startDate?: string;
	endDate?: string;
	amount?: string;
	currency?: string;
	numberOfAds?: string;
}

export enum ICreateAdSteps {
	SetupPost = 'SetupPost',
	SetupAudience = 'SetupAudience',
	SetupBudget = 'SetupBudget',
}

export interface IAdSetupPostData {
	headline: string;
	description: string;
	media: IWallPostPhotoOptimized[];
}

export enum IGenderSelect {
	male = 'male',
	female = 'female',
	all = 'all',
}

export interface IAdSetupAudienceData {
	selectedGender: IGenderSelect;
	ageRange: number[];
}

export interface IAdSetupBudgetData {
	currency: string;
	budget: number;
	perDay: boolean;
	lifetime: boolean;
	runAdContinuously: boolean;
	start: string;
	stop: string;
}

/**
 * TODO list:
 * 1. @Serkan: find better structure to define shared types across components.
 */
