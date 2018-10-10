/**
 * TODO list:
 * 1. Remove all type imports from components!
 */

import { Image as PickerImage } from 'react-native-image-crop-picker';
import { NavigationScreenConfig, NavigationScreenProp } from 'react-navigation';

import { IAccountCurrencyData } from './components';
import { CoinSymbol } from './environment/consts';
import { ISetNavigationParamsInput } from './store/app/navigationParams';

export interface IFriendsSearchResult {
	id: string;
	fullName: string;
	location: string;
	avatarURL: string;
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
	relationship: SearchResultKind;
	fullName: string;
	userName: string;
	location: string;
	avatarURL: string;
}

export interface ISearchResultGroups {
	userId: string;
	relationship: SearchResultKind;
	fullName: string;
	userName: string;
	location: string;
	avatarURL: string;
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

export interface IHeaderProps {
	onGoBack: () => void;
}

export interface INavigationParamsActions {
	setNavigationParams: (
		setNavigationParamsInput: ISetNavigationParamsInput,
	) => void;
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
}

export interface ISimpleComment {
	id: string;
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
	avatarURL: string | undefined;
}

export interface IWallPostComment {
	id: string;
	text: string;
	user: {
		fullName: string;
		avatarURL?: string;
		id: string;
	};
	timestamp: Date;
	numberOfLikes: number;
	likes: ILike[];
	likedByMe: boolean;
	replies: IWallPostComment[];
}

export enum CommentsSortingOptions {
	Likes = 'Likes',
	Recent = 'Recent',
}

export interface IWallPostPhotoOptimized extends PickerImage {
	contentOptimizedPath?: string;
	type: string;
	pathx: string;
}

export interface ILike {
	userId: string;
	userName: string;
}

export interface IWallPostCardData extends IResizeProps {
	id: string;
	postText: string | undefined;
	location: string | undefined;
	taggedFriends: Array<{ fullName: string }> | undefined;
	timestamp: Date;
	owner: IPostOwner;
	currentUserAvatarURL?: string;
	governanceVersion: boolean;
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
	likedByMe: boolean;
	canDelete: boolean;
	media: IMediaProps[] | undefined;
	likes: ILike[];
	bestComments: ISimpleComment[];
	listLoading: boolean;
	suggested: undefined | ISearchResultData[];
	noInput: boolean;
	contentOffensive: boolean;
}

export interface IWallPostCardActions extends ITranslatedProps {
	onImagePress: (
		index: number,
		mediaObjects: IMediaProps[],
		postId: string,
	) => void;
	onLikeButtonPress: (likedByMe: boolean, postId: string) => boolean;
	onDeletePress: (postId: string) => void;
	onUserPress: (userId: string) => void;
	onCommentPress: (postId: string, startComment: boolean) => void; // this actually navigates to comments screen!
	onAddComment: (index: number, cardHeight: number) => void;
	onSubmitComment: (commentText: string, postId: string) => void;
	onBlockUser: (userId: string) => void;
	onReportProblem: (reason: string, description: string) => void;
}

export type IWallPostCardProps = IWallPostCardData & IWallPostCardActions;

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
	avatarURL: string;
	email: string;
	fullName: string;
	userName: string;
	aboutMeText: string;
	numberOfLikes: number;
	numberOfPhotos: number;
	numberOfFriends: number;
	numberOfComments: number;
	mediaObjects: IMediaProps[];
	recentPosts: IWallPostCardData[];
	miningEnabled: boolean;
	pub: string;
}

export interface IVisitedUser {
	userId: string;
	avatarURL: string;
	fullName: string;
	userName: string;
	aboutMeText: string;
	numberOfLikes: number;
	numberOfPhotos: number;
	numberOfFriends: number;
	numberOfComments: number;
	mediaObjects: IMediaProps[];
	recentPosts: IWallPostCardData[];
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
/**
 * TODO list:
 * 1. @Serkan: find better structure to define shared types across components.
 */
