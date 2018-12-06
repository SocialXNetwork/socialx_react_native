import { NOTIFICATION_TYPES } from '../../../src/environment/consts';

import { IFriendRequest, IFriendResponse } from '../../store/data/notifications';

export const mapRequestsToNotifications = (
	requests: IFriendRequest[],
	responses: IFriendResponse[],
) => {
	const reqs = requests.map((req) => ({
		notificationId: req.id,
		userId: req.owner.alias,
		type: NOTIFICATION_TYPES.FRIEND_REQUEST,
		fullName: req.fullName,
		userName: req.owner.alias,
		avatar: req.avatar,
		timestamp: new Date(req.timestamp),
		seen: false,
	}));

	const resps = responses.map((res) => ({
		notificationId: res.id,
		userId: res.owner.alias,
		type: NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE,
		fullName: res.fullName,
		userName: res.owner.alias,
		avatar: res.avatar,
		timestamp: new Date(res.timestamp),
		seen: false,
	}));

	return [...reqs, ...resps].sort((x, y) => y.timestamp.getTime() - x.timestamp.getTime());
};
