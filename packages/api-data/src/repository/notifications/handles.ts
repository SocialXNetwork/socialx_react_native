import { IContext, TABLES } from '../../types';
import { NOTIFICATION_TABLE_NAMES } from './types';

export const notificationsByUsername = (
	context: IContext,
	username: string,
) => {
	const { gun } = context;
	return gun.path(`${TABLES.NOTIFICATIONS}.${username}`);
};

export const notifications = (context: IContext) => {
	const { gun, account } = context;
	return gun.path(`${TABLES.NOTIFICATIONS}.${account.is.alias}`);
};

export const notificationById = (context: IContext, notificationId: string) => {
	return notifications(context).path(notificationId);
};

export const friendRequests = (context: IContext) => {
	const { gun, account } = context;
	return gun.path(
		`${TABLES.NOTIFICATIONS}.${NOTIFICATION_TABLE_NAMES.FRIEND_REQUEST}.${
			account.is.alias
		}`,
	);
};

export const friendRequestsResponses = (context: IContext) => {
	const { gun, account } = context;
	return gun.path(
		`${TABLES.NOTIFICATIONS}.${
			NOTIFICATION_TABLE_NAMES.FRIEND_REQUEST_RESPONSE
		}.${account.is.alias}`,
	);
};
