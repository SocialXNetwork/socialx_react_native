import { IContext, TABLE_ENUMS, TABLES } from '../../types';

export const currentUserProfileData = (context: IContext) => {
	const { account } = context;
	return account.path(`${TABLES.PROFILE}.${account.is.alias}`);
};

export const currentUserProfile = (context: IContext) => {
	const { account } = context;
	return account.path(`${TABLES.PROFILE}`);
};

export const publicProfilesRecord = (context: IContext) => {
	const { gun } = context;
	return gun.path(`${TABLES.PROFILES}`);
};

export const publicProfileByUsername = (context: IContext, username: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.PROFILES}.${username}`);
};

export const currentProfileFriendsRecord = (context: IContext) => {
	const { account } = context;
	return account.path(`${TABLES.PROFILE}.${account.is.alias}.${TABLE_ENUMS.FRIENDS}`);
};

export const currentProfileFriendByUsername = (context: IContext, username: string) => {
	const { account } = context;
	return account.path(`${TABLES.PROFILE}.${account.is.alias}.${TABLE_ENUMS.FRIENDS}.${username}`);
};

export const profileFriendsByUsername = (context: IContext, username: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.PROFILES}.${username}.${TABLE_ENUMS.FRIENDS}`);
};

export const currentProfileFriendship = (context: IContext, friendshipId: string) => {
	const { account } = context;
	return account.path(`${TABLES.PROFILE}.${TABLE_ENUMS.FRIENDS}.${friendshipId}`);
};

export const userProfileFriendship = (
	context: IContext,
	username: string,
	friendshipId: string,
) => {
	const { gun } = context;
	return gun.path(`${TABLES.PROFILES}.${username}.${TABLE_ENUMS.FRIENDS}.${friendshipId}`);
};

export const publicFriendRequestsByUsers = (context: IContext, from: string, to: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS}.${to}.${from}`);
};

export const publicCurrentFriendRequestToUsername = (context: IContext, to: string) => {
	const { gun, account } = context;
	return gun.path(
		`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS}.${to}.${account.is.alias}`,
	);
};
export const publicCurrentFriendRequestFromUsername = (context: IContext, username: string) => {
	const { gun, account } = context;
	return gun.path(
		`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS}.${account.is.alias}.${username}`,
	);
};

export const publicCurrentFriendRequests = (context: IContext) => {
	const { gun, account } = context;
	return gun.path(`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS}.${account.is.alias}`);
};
