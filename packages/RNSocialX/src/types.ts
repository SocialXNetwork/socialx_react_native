export interface FriendsSearchResult {
	id: string;
	fullName: string;
	location: string;
	avatarURL: string;
}

export interface ITranslatedProps {
	getText: (value: string, ...args: any[]) => string;
}

export interface IResizeProps {
	marginBottom: number;
	// safeRunAfterKeyboardHide: (handler: () => void) => void;
}

/**
 * TODO list:
 * 1. @Serkan: find better structure to define shared types across components.
 * 2. safeRunAfterKeyboardHide should be handled different way!
 */
