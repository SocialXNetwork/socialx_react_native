import { IContext, TABLE_ENUMS, TABLES } from '../../types';
import { IUserObject } from './types';

// User records

export const currentUserProfileData = (context: IContext) => {
	const { account } = context;
	return account.get(TABLES.PROFILE).get(account.is.alias);
};

export const currentUserProfile = (context: IContext) => {
	const { account } = context;
	return account.get(`${TABLES.PROFILE}`);
};

export const publicProfilesRecord = (context: IContext) => {
	const { gun } = context;
	return gun.get(TABLES.PROFILES);
};

export const publicProfileByUsername = (context: IContext, username: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.PROFILES}.${username}`);
};

export const privateUserProfileByUserObj = (context: IContext, userObject: IUserObject) => {
	const { gun } = context;
	const { alias, pub } = userObject;
	return gun
		.back(-1)
		.get(`~${pub}`)
		.get(TABLES.PROFILE)
		.get(alias);
};

export const privateUserFriendsRecordByPub = (context: IContext, pub: string) => {
	const { gun } = context;
	return gun
		.back(-1)
		.get(`~${pub}`)
		.get(TABLE_ENUMS.FRIENDS);
};

export const privateUserProfileByPub = (context: IContext, pub: string) => {
	const { gun } = context;
	return gun
		.back(-1)
		.get(`~${pub}`)
		.get(TABLES.PROFILE);
};

// User friendship records

export const privateUserFriendsRecord = (context: IContext) => {
	const { gun, account } = context;
	return gun
		.back(-1)
		.get(TABLE_ENUMS.FRIENDS)
		.get(account.is.alias);
};

export const privateUserFriendsByAlias = (context: IContext, alias: string) => {
	const { gun } = context;
	return gun
		.back(-1)
		.get(TABLE_ENUMS.FRIENDS)
		.get(alias);
};

export const privateMutualUserFriends = (context: IContext, user: string, target: string) => {
	const { gun } = context;
	return gun
		.back(-1)
		.get(TABLE_ENUMS.FRIENDS)
		.get(user)
		.get(target);
};

export const currentProfileFriendsRecord = (context: IContext) => {
	const { gun, account } = context;
	return gun
		.back(-1)
		.get(TABLE_ENUMS.FRIENDS)
		.get(account.is.alias);
};

export const currentProfileFriendByUsername = (context: IContext, username: string) => {
	const { gun, account } = context;
	return gun
		.back(-1)
		.get(TABLE_ENUMS.FRIENDS)
		.get(account.is.alias)
		.get(username);
};

export const currentUserOnPrivateProfilesFriends = (context: IContext, userObject: IUserObject) => {
	const { gun, account } = context;
	const { alias } = userObject;
	return gun
		.back(-1)
		.get(TABLE_ENUMS.FRIENDS)
		.get(alias)
		.get(account.is.alias);
};

// User Requests records

// friend requests records

export const publicFriendRequestToFrom = (context: IContext, to: string, from: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS}.${to}.${from}`);
};

export const publicUserFriendRequests = (context: IContext, username: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS}.${username}`);
};

export const publicCurrentFriendRequestFromUsername = (context: IContext, username: string) => {
	const { gun, account } = context;
	return gun.path(
		`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS}.${account.is.alias}.${username}`,
	);
};

export const publicCurrentFriendRequestToUsername = (context: IContext, username: string) => {
	const { gun, account } = context;
	return gun.path(
		`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS}.${username}.${account.is.alias}`,
	);
};

export const publicCurrentFriendRequests = (context: IContext) => {
	const { gun, account } = context;
	return gun.path(`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS}.${account.is.alias}`);
};

// friend requests responses records

export const publicFriendResponseToFrom = (context: IContext, to: string, from: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS_RESPONSE}.${to}.${from}`);
};

export const publicCurrentFriendResponse = (context: IContext) => {
	const { gun, account } = context;
	return gun.path(
		`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS_RESPONSE}.${account.is.alias}`,
	);
};

export const publicCurrentFriendResponseTo = (context: IContext, to: string) => {
	const { gun, account } = context;
	return gun.path(
		`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS_RESPONSE}.${to}.${account.is.alias}`,
	);
};

export const publicCurrentFriendResponseFrom = (context: IContext, from: string) => {
	const { gun, account } = context;
	return gun.path(
		`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS_RESPONSE}.${account.is.alias}.${from}`,
	);
};
