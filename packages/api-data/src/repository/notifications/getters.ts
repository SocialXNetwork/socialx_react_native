import { IContext, IGunCallback } from '../../types';
import * as handles from './handles';

import { ApiError } from '../../utils/errors';
import { convertGunSetToArrayWithKey } from '../../utils/helpers';
import { INotificationData, INotificationsReturnData } from './types';

export const getNotifications = (
	context: IContext,
	callback: IGunCallback<INotificationsReturnData[]>,
) => {
	handles
		.notifications(context)
		.docLoad((notifications: INotificationsReturnData) => {
			if (!notifications) {
				return callback(new ApiError('failed to find notification'));
			}
			const notifcationsReturnData = convertGunSetToArrayWithKey(
				notifications,
			).map(({ k, ...notification }: INotificationData & { k: string }) => ({
				notificationId: k,
				...notification,
			}));
			return callback(null, notifcationsReturnData);
		});
};

export default {
	getNotifications,
};
