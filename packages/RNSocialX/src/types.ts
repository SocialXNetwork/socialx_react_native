import {Image as PickerImage} from 'react-native-image-crop-picker';

export interface FriendsSearchResult {
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
	// safeRunAfterKeyboardHide: (handler: () => void) => void;
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

export interface MediaTypes {
	key: string;
	name: string;
	category: string;
}

export const MediaTypeImage: MediaTypes = {
	key: 'image',
	name: 'Photo',
	category: 'Photography',
};

export const MediaTypeVideo: MediaTypes = {
	key: 'video',
	name: 'Video',
	category: 'Videos',
};

export interface GridMediaObject {
	url: string;
	type: MediaTypes;
	index: number;
}

// END Media types

export interface IMediaProps {
	url: string;
	hash: string;
	type: MediaTypes;
	extension: string;
	size: number;
	numberOfLikes: number;
	numberOfComments: number;
}

export interface ISimpleComment {
	id: string;
	text: string;
	likes: Array<{
		userId: string;
	}>;
	owner: {
		userId: string;
		userName: string;
	};
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
	likes: any[]; // IUserQuery[]; // @Alex TODO: fix typing after backend is ready
	likedByMe: boolean;
	replies: IWallPostComment[];
}

export enum CommentsSortingOptions {
	Likes = 'Likes',
	Recent = 'Recent',
}

export interface WallPostPhotoOptimized extends PickerImage {
	contentOptimizedPath?: string;
	type: string;
	pathx: string;
}

export interface IPostLike {
	userId: string;
	userName: string;
}

/**
 * TODO list:
 * 1. @Serkan: find better structure to define shared types across components.
 * 2. safeRunAfterKeyboardHide should be handled different way!
 */
