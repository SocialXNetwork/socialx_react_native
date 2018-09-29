import { IContext, TABLES } from '../../types';

export const notificationsByUsername = (
	context: IContext,
	username: string,
) => {
	const { gun } = context;
	return gun.get(TABLES.NOTIFICATIONS).get(username);
};

export const notifications = (context: IContext) => {
	const { gun, account } = context;
	return gun.get(TABLES.NOTIFICATIONS).get(account.is.alias);
};

export const notificationById = (context: IContext, notificationId: string) => {
	return notifications(context).get(notificationId);
};
