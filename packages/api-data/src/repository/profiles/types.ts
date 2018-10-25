export interface IGetPublicKeyInput {
	username: string;
}

export interface IProfileCallbackData {
	pub: string;
	email: string;
	avatar: string;
	fullName: string;
	miningEnabled: boolean;
	aboutMeText: string;
	username: string;
	alias: string;
	friends: IFriendsCallbackData;
}

export interface IFriendReturnData extends IFriendData {
	friendId: string;
}

export interface IProfileData {
	pub: string;
	email: string;
	avatar: string;
	fullName: string;
	miningEnabled: boolean;
	aboutMeText: string;
	friends: IFriendReturnData[];
	alias: string;
}

export interface ISearchProfilesByFullNameInput {
	textSearch: string;
	maxResults?: number;
}

export interface IFindFriendsSuggestionsInput {
	maxResults?: number;
}

export interface ICreateProfileInput {
	username: string;
	aboutMeText: string;
	miningEnabled: boolean;
	fullName: string;
	email: string;
	avatar: string;
	pub: string;
}

export interface IUpdateProfileInput {
	aboutMeText?: string;
	fullName?: string;
	email?: string;
	avatar?: string;
}

export interface IAddFriendInput {
	username: string;
}

export interface IRemoveFriendInput {
	friendshipId: string;
	username: string;
}

export interface IAcceptFriendInput {
	friendshipId: string;
	username: string;
}

export enum FRIEND_TYPES {
	PENDING = 'pending',
	MUTUAL = 'mutual',
}

export interface IFriendData {
	username: string;
	timestamp: number;
	relation: FRIEND_TYPES;
}

export interface IFriendsCallbackData {
	[key: string]: IFriendData;
}
