export interface IGetPublicKeyInput {
	username: string;
}

export interface IProfile {
	pub: string;
	email: string;
	avatar: string;
	fullName: string;
	miningEnabled: boolean;
	aboutMeText: string;
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

export interface IFriendsReturnData {
	[key: string]: IFriendData;
}
