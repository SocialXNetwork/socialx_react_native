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

/**
 * TODO list:
 * 1. @Serkan: find better structure to define shared types across components.
 * 2. safeRunAfterKeyboardHide should be handled different way!
 */
