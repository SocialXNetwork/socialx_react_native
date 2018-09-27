import { IContext, IGunCallback } from '../../types';
import * as handles from './handles';

import { INotificationData, IRemoveNotificationInput } from './types';

export const createNotification = (
	context: IContext,
	createNotificationInput: INotificationData,
	callback: IGunCallback<null>,
) => {
	handles
		.currentNotifications(context)
		.set(createNotificationInput, (notificationCallback) => {
			if (!notificationCallback) {
				return callback('failed, couldnt create notification');
			}
			return callback(null);
		});
};

export const removeNotification = (
	context: IContext,
	discardInput: IRemoveNotificationInput,
	callback: IGunCallback<null>,
) => {
	handles
		.notificationById(context, discardInput.notificationId)
		.put(null, (discardCallback) => {
			if (!discardCallback) {
				return callback('failed, couldnt discard notification');
			}
			return callback(null);
		});
};

export default {
	createNotification,
	removeNotification,
};
