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

export enum SearchResultKind {
	Friend = 'FRIEND',
	NotFriend = 'NOT_FRIEND',
	FriendRequestSent = 'FRIEND_REQUEST_SENT',
	Group = 'GROUP',
}

export enum SearchTabs {
	Top = 'TOP',
	People = 'PEOPLE',
	Tags = 'TAGS',
	Places = 'PLACES',
}

export interface ISearchResultPeople {
	userId: string;
	fullName: string;
	userName: string;
	location: string;
	avatar: string;
}

export interface ISearchResultGroups {
	userId: string;
	relationship: SearchResultKind;
	fullName: string;
	userName: string;
	location: string;
	avatar: string;
}

export type ISearchResultData = ISearchResultPeople | ISearchResultGroups;

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
	friendshipId?: string;
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

// Media types

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

export interface IGridMediaObject {
	url: string;
	type: IMediaTypes;
	index: number;
}

// END Media types

export interface IMediaProps {
	url: string;
	hash: string;
	type: IMediaTypes;
	extension: string;
	size: number;
	numberOfLikes: number;
	numberOfComments: number;
	likedByCurrentUser: boolean;
	postId: string;
}

export interface ISimpleComment {
	commentId: string;
	text: string;
	likes: ILike[];
	owner: {
		userId: string;
		userName: string;
	};
}

export interface IPostOwner {
	userId: string;
	fullName: string;
	avatar: string;
}

export interface IWallPostComment {
	commentId: string;
	text: string;
	user: {
		fullName: string;
		avatar: string;
		userId: string;
	};
	timestamp: Date;
	likes: ILike[];
	likedByCurrentUser: boolean;
}

export interface IWallPostPhotoOptimized extends PickerImage {
	contentOptimizedPath: string;
	type: string;
	pathx: string;
}

export interface ILike {
	userId: string;
	userName: string;
}

export interface IWallPostData {
	postId: string;
	postText: string;
	location: string | undefined;
	taggedFriends: Array<{ fullName: string }> | undefined;
	timestamp: Date;
	owner: IPostOwner;
	likedByCurrentUser: boolean;
	removable: boolean;
	media: IMediaProps[];
	likes: ILike[];
	topComments: ISimpleComment[];
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
	suggested: ISearchResultData[] | undefined;
	loading: boolean;
	currentUserAvatar: string;
	currentUserName: string;
	offensiveContent: boolean;
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
	fullName: string;
	userName: string;
	description: string;
	numberOfLikes: number;
	numberOfPhotos: number;
	numberOfFriends: number;
	numberOfComments: number;
	mediaObjects: IMediaProps[];
	recentPosts: IWallPostData[];
	miningEnabled: boolean;
	shareDataEnabled: boolean;
	pub: string;
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
	mediaObjects: IMediaProps[];
	recentPosts: IWallPostData[];
	relationship: SearchResultKind;
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
	mediaObjects: IWallPostPhotoOptimized[];
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
