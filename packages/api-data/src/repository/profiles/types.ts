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

export interface IProfileData {
	pub: string;
	email: string;
	avatar: string;
	fullName: string;
	miningEnabled: boolean;
	aboutMeText: string;
	alias: string;
	posts: any[];
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

export interface IUserObject {
	alias: string;
	pub: string;
}

export interface IAddFriendInput {
	username: string;
}

export interface IRejectFriendInput {
	username: string;
}

export interface IRemoveFriendInput {
	username: string;
}

export interface IAcceptFriendInput {
	username: string;
}

export interface IClearFriendResponseInput {
	username: string;
}

export enum FRIEND_TYPES {
	PENDING = 'pending',
	MUTUAL = 'mutual',
	NOT_FRIEND = 'not_friend',
}

export interface IFriendData extends IProfileData {
	status: FRIEND_TYPES;
	numberOfFriends: number;
}

export interface IFriendsCallbackData {
	[alias: string]: IFriendData;
}

export enum FriendResponses {
	Accepted = 'accepted',
	Rejected = 'rejected',
}
