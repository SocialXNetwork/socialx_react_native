/**
 * TODO list:
 * 1. Remove all type imports from components!
 */

import { Image as PickerImage } from 'react-native-image-crop-picker';
import { NavigationScreenConfig, NavigationScreenProp } from 'react-navigation';

import { IAccountCurrencyData } from './components';
import { CoinSymbol, TransactionFromType, TransactionSymbol } from './environment/consts';
import { ILocaleDictionary } from './store/app/i18n/Types';
import { ISetNavigationParamsInput } from './store/app/navigationParams';
import { IFriendRequest, IFriendResponse } from './store/data/notifications';

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
	alias: string;
	fullName: string;
	avatar: string;
	relationship: FRIEND_TYPES;
}

export type getTextSignature = (value: string, ...args: any[]) => string;

export interface IDictionary {
	dictionary: ILocaleDictionary;
}

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

export type INotification = IFriendRequest | IFriendResponse;

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
	name: 'Video' | 'Photo';
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

export interface IOnMove {
	type: string;
	positionX: number;
	positionY: number;
	scale: number;
	zoomCurrentDistance: number;
}

export interface IMedia {
	hash: string;
	type: IMediaTypes;
	extension: string;
	size: number;
	postId?: string;
}

export interface IOptimizedMedia extends PickerImage {
	type: string;
	optimizedImagePath?: string;
	sourceURL?: string;
}

export interface IGridMedia {
	hash: string;
	type: IMediaTypes;
}

export interface IPostOwner {
	alias: string;
	fullName: string;
	avatar: string;
}

export interface IComment {
	commentId: string;
	text: string;
	owner: IPostOwner;
	timestamp: Date;
	likeIds: string[];
	likedByCurrentUser: boolean;
	posting: boolean;
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
	media: IMedia[];
	likeIds: string[];
	commentIds: string[];
	topCommentIds: string[];
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
	suggested: IUserEntry[] | undefined;
	offensiveContent: boolean;
	creating?: boolean;
}

export interface ICreatePost {
	postId: string;
	postText: string;
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
	likes: {
		ids: string[];
		byId: {
			[alias: string]: number;
		};
	};
	comments: string[];
	media: IOptimizedMedia[];
	privatePost: boolean;
	creating: boolean;
}

export enum TransactionType {
	Sold = 'Sold',
	Bought = 'Bought',
	Received = 'Received',
	Sent = 'Sent',
	Converted = 'Converted',
}

export enum TrendOptions {
	Up = 'UP',
	Down = 'DOWN',
}

export interface ITransactionData {
	id: string;
	type: TransactionType;
	firstAmount: number;
	transactionIcon?: TransactionSymbol;
	firstCoin: CoinSymbol;
	secondAmount?: number;
	secondCoin?: CoinSymbol;
	fromType?: TransactionFromType;
	from?: string;
	date: Date;
	onViewUserProfile?: (username: string) => void;
}

export interface IWallet {
	coins: string;
	trendPercentage: string;
	trendArrow: TrendOptions;
	transactions: ITransactionData[];
	refreshing: boolean;
}

export interface IRewardsTransactionHistory {
	coins: string;
	rewardsTransactions: ITransactionData[];
	isRefreshing: boolean;
}

export interface ISearchTabResultsProps {
	navigation: NavigationScreenProp<any>;
	searchTermValue: string;
}

// =====================================================
// ENHANCER DATA TYPES
// =====================================================

export interface ICurrentUser {
	alias: string;
	pub: string;
	avatar: string;
	email: string;
	fullName: string;
	description: string;
	numberOfLikes: number;
	numberOfPhotos: number;
	numberOfFriends: number;
	numberOfComments: number;
	media: IMedia[];
	postIds: string[];
	miningEnabled: boolean;
	shareDataEnabled: boolean;
}

export interface IVisitedUser {
	alias: string;
	avatar: string;
	fullName: string;
	description: string;
	numberOfLikes: number;
	numberOfPhotos: number;
	numberOfFriends: number;
	numberOfComments: number;
	media: IMedia[];
	postIds: string[];
	status: FRIEND_TYPES;
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
	media: IMedia[];
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
