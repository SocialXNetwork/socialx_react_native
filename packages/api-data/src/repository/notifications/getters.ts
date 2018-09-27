import { IContext, IGunCallback } from '../../types';
import * as handles from './handles';

import {
	INotificationByIdInput,
	INotificationData,
	INotificationsReturnData,
} from './types';

export const currentNotifications = (
	context: IContext,
	callback: IGunCallback<INotificationsReturnData>,
) => {
	handles
		.currentNotifications(context)
		.docLoad((notifications: INotificationsReturnData) => {
			if (!notifications) {
				return callback('failed, no notifications found');
			}
			return callback(null, notifications);
		});
};

export const notificationById = (
	context: IContext,
	notificationByIdInput: INotificationByIdInput,
	callback: IGunCallback<INotificationData>,
) => {
	handles
		.notificationById(context, notificationByIdInput.notificationId)
		.docLoad((notification: INotificationData) => {
			if (!notification) {
				return callback('failed, no notification found at this id');
			}
			return callback(null, notification);
		});
};

export default {
	currentNotifications,
	notificationById,
};
