export interface FriendsSearchResult {
	id: string;
	fullName: string;
	location: string;
	avatarURL?: string;
}

export interface ITranslatedProps {
	getText: (value: string, ...args: any[]) => string;
}

/**
 * TODO list: @Serkan: find better structure to define shared types across components.
 */
