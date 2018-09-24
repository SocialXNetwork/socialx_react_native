import {Image as PickerImage} from 'react-native-image-crop-picker';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';
import {IAccountCurrencyData} from './components';

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
	Group = 'group',
}

export type getTextSignature = (value: string, ...args: any[]) => string;

export interface ITranslatedProps {
	getText: getTextSignature;
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
	avatarURL: string;
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

export interface ISuggestionCardItem {
	userId: string;
	fullName: string;
	userName: string;
	avatarURL: string;
	relationship: SearchResultKind;
}

export interface IWallPostCardData extends IResizeProps {
	id: string;
	postText: false | string;
	location: false | string;
	taggedFriends: Array<{fullName: string}>;
	timestamp: Date;
	owner: IPostOwner;
	currentUserAvatarURL?: string;
	governanceVersion: boolean;
	numberOfSuperLikes: number;
	numberOfComments: number;
	numberOfWalletCoins: number;
	likedByMe: boolean;
	canDelete: boolean;
	media: IMediaProps[];
	likes: ILike[];
	bestComments: ISimpleComment[];
	listLoading: boolean;
	suggested: undefined | ISuggestionCardItem[];
	noInput: boolean;
}

export interface IWallPostCardActions extends ITranslatedProps {
	onImagePress: (index: number, media: any) => void;
	onLikeButtonPress: (likedByMe: boolean, postId: string) => boolean;
	// onDeletePress: (postId: string) => void; // TODO: this is not implemented in WallPostCard!
	onUserPress: (userId: string) => void;
	onCommentPress: (postId: string) => void; // this actually navigates to comments screen!
	onAddComment: (height: number) => void;
	onSubmitComment: (commentText: string, postId: string) => void;
}

export type IWallPostCardProps = IWallPostCardData & IWallPostCardActions;

// =====================================================
// ENHANCER DATA TYPES
// =====================================================

export interface ICurrentUser {
	userId: string;
	avatarURL?: string;
	email: string;
	fullName: string;
	userName: string;
	aboutMeText: string;
	numberOfLikes: number;
	numberOfPhotos: number;
	numberOfFriends: number;
	numberOfViews: number;
	mediaObjects: IMediaProps[];
	recentPosts: IWallPostCardData[];
	miningEnabled: boolean;
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
	numberOfViews: number;
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

/**
 * TODO list:
 * 1. @Serkan: find better structure to define shared types across components.
 */
