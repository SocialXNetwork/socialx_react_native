import { IContext, TABLE_ENUMS, TABLES } from '../../types';

export const allProfiles = (context: IContext) =>
	context.gun.get(TABLES.PROFILES);

export const currentUserProfile = (context: IContext) => {
	const { account, gun } = context;
	return gun.get(TABLES.PROFILES).get(account.is.alias);
};

export const profileByUsername = (context: IContext, username: string) => {
	const { gun } = context;
	return gun.get(TABLES.PROFILES).get(username);
};

export const currentProfileFriends = (context: IContext) => {
	const { account, gun } = context;
	return gun
		.get(TABLES.PROFILES)
		.get(account.is.alias)
		.get(TABLE_ENUMS.FRIENDS);
};

export const profileFriendsByUsername = (
	context: IContext,
	username: string,
) => {
	const { gun } = context;
	return gun
		.get(TABLES.PROFILES)
		.get(username)
		.get(TABLE_ENUMS.FRIENDS);
};

export const currentProfileFriendship = (
	context: IContext,
	friendshipId: string,
) => {
	const { gun, account } = context;
	return gun
		.get(TABLES.PROFILES)
		.get(account.is.alias)
		.get(TABLE_ENUMS.FRIENDS)
		.get(friendshipId);
};

export const userProfileFriendship = (
	context: IContext,
	username: string,
	friendshipId: string,
) => {
	const { gun } = context;
	return gun
		.get(TABLES.PROFILES)
		.get(username)
		.get(TABLE_ENUMS.FRIENDS)
		.get(friendshipId);
};
