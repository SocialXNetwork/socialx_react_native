import { IContext, TABLES } from '../../types';

export const currentUserProfile = (context: IContext) => {
	const { account, gun } = context;
	return gun.get(TABLES.PROFILES).get(account.is.alias);
};

export const profileByUsername = (context: IContext, username: string) => {
	const { gun } = context;
	return gun.get(TABLES.PROFILES).get(username);
};
