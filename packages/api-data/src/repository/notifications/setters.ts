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

export const removeFriendRequest = async (context: IContext, username: string) => {
	return new Promise((res, rej) =>
		handles.friendRequests(context).erase(username, (ack) => {
			if (ack.err) {
				rej(ack.err);
			}
			res();
		}),
	);
};

export const saveFriendRequestResponse = async (
	context: IContext,
	username: string,
	accepted: boolean,
) => {
	return new Promise((res, rej) =>
		handles
			.friendRequestResponseByUsername(context, username)
			.put({ accepted, timestamp: new Date().valueOf() }, (recoverCallback) => {
				if (recoverCallback.err) {
					rej(new ApiError(`failed to create friend request response ${recoverCallback.err}`));
				}
				res();
			}),
	);
};

export default {
	createNotification,
	removeFriendRequest,
	saveFriendRequestResponse,
};
