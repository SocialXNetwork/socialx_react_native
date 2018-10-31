import { IContext, IGunCallback } from '../../types';
import * as handles from './handles';

import { ApiError } from '../../utils/errors';
import { convertGunSetToArrayWithKey } from '../../utils/helpers';
import { IAllNotificationsData, INotificationData, INotificationsReturnData } from './types';

export const getFriendRequests = (context: IContext) => {
	return new Promise((res, rej) =>
		handles.friendRequests(context).docLoad((notifications: INotificationsReturnData) => {
			if (!notifications || !Object.keys(notifications).length) {
				return res([]);
			}
			const notifcationsReturnData = convertGunSetToArrayWithKey(notifications)
				.filter((o: any) => o && Object.keys(o).length)
				.map(({ k, ...notification }: INotificationData & { k: string }) => ({
					notificationId: k,
					...notification,
				}))
				.filter((o: any) => o.notificationId);
			res(notifcationsReturnData);
		}),
	);
};

export const getFriendRequestsResponses = (context: IContext) => {
	return new Promise((res, rej) =>
		handles.friendRequestsResponses(context).docLoad((notifications: INotificationsReturnData) => {
			if (!notifications || !Object.keys(notifications).length) {
				return res([]);
			}
			const notifcationsReturnData = convertGunSetToArrayWithKey(notifications)
				.filter((o: any) => o && Object.keys(o).length)
				.map(({ k, ...notification }: INotificationData & { k: string }) => ({
					notificationId: k,
					...notification,
				}))
				.filter((o: any) => o.notificationId);
			res(notifcationsReturnData);
		}),
	);
};

export const getNotifications = async (
	context: IContext,
	callback: IGunCallback<IAllNotificationsData>,
) => {
	const friendRequestsNotifications = await getFriendRequests(context);
	const friendRequestsResponsesNotifications = await getFriendRequestsResponses(context);
	return callback(null, {
		friend_requests: friendRequestsNotifications,
		friend_requests_responses: friendRequestsResponsesNotifications,
	});
};

export default {
	getNotifications,
};
