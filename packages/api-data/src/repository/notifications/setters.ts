import { IContext, IGunCallback } from '../../types';
import * as handles from './handles';

import { IDiscardNotificationInput, INotificationData } from './types';

export const addNotification = (
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

export const discardNotification = (
	context: IContext,
	discardInput: IDiscardNotificationInput,
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
	addNotification,
	discardNotification,
};
