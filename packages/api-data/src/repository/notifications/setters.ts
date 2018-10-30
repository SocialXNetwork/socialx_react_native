import { IContext, IGunCallback } from '../../types';
import * as handles from './handles';

import { ApiError } from '../../utils/errors';
import { ICreateNotification, IRemoveNotificationInput } from './types';

export const createNotification = (
	context: IContext,
	createNotificationInput: ICreateNotification,
	callback: IGunCallback<null>,
) => {
	const { to, ...notification } = createNotificationInput;
	handles.notificationsByUsername(context, to).set(notification, (notificationCallback) => {
		if (!notificationCallback) {
			return callback(
				new ApiError('failed to set a notification', {
					initialRequestBody: createNotificationInput,
				}),
			);
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
				return callback(
					new ApiError('failed to remove a notification', {
						initialRequestBody: removeNotificationInput,
					}),
				);
			}
			return callback(null);
		});
};

export default {
	createNotification,
	removeNotification,
};
