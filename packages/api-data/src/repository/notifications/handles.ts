import { IContext, TABLES } from '../../types';
import { NOTIFICATION_TABLE_NAMES } from './types';
const { NOTIFICATIONS } = TABLES;
const { FRIEND_REQUEST, FRIEND_REQUEST_RESPONSE } = NOTIFICATION_TABLE_NAMES;

export const notificationsByUsername = (context: IContext, username: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.NOTIFICATIONS}.${username}`);
};

export const friendRequests = (context: IContext) => {
	const { gun, account } = context;
	const {
		is: { alias },
	} = account;
	return gun.path(`${NOTIFICATIONS}.${FRIEND_REQUEST}.${alias}`);
};

export const friendRequestResponseByUsername = (context: IContext, username: string) => {
	const { gun, account } = context;
	const {
		is: { alias },
	} = account;
	return gun.path(`${NOTIFICATIONS}.${FRIEND_REQUEST}.${username}.${alias}`);
};

export const friendRequestsResponses = (context: IContext) => {
	const { gun, account } = context;
	const {
		is: { alias },
	} = account;
	return gun.path(`${NOTIFICATIONS}.${FRIEND_REQUEST_RESPONSE}.${alias}`);
};
