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

export interface IModalConfirmationProps {
	title?: string;
	message?: string;
	confirmButton?: string;
	cancelButton?: string;
	confirmHandler?: () => void;
	declineHandler?: () => void;
}

export interface IConfirmActions {
	showConfirm: (confirmationOptions: IModalConfirmationProps) => void;
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
	type: string;
	url: string;
}

export interface ISimpleComment {
	id: string;
	text: string;
	likes: Array<{
		userId: string;
	}>;
	owner: {
		userId: string;
		username: string;
	};
}

/**
 * TODO list:
 * 1. @Serkan: find better structure to define shared types across components.
 * 2. safeRunAfterKeyboardHide should be handled different way!
 */
