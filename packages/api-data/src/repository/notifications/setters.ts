import { IContext, IGunCallback } from '../../types';
import * as handles from './handles';

import { ICreateNotification, IRemoveNotificationInput } from './types';

export const createNotification = (
	context: IContext,
	createNotificationInput: ICreateNotification,
	callback: IGunCallback<null>,
) => {
	const { to, ...notification } = createNotificationInput;
	handles
		.notificationsByUsername(context, to)
		.set(notification, (notificationCallback) => {
			if (!notificationCallback) {
				return callback('failed, couldnt create notification');
			}
			return callback(null);
		});
};

export const removeNotification = (
	context: IContext,
	removeNotificationInput: IRemoveNotificationInput,
	callback: IGunCallback<null>,
) => {
	handles
		.notificationById(context, removeNotificationInput.notificationId)
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
