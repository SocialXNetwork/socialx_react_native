import { NOTIFICATION_TYPES } from '../../../src/environment/consts';

import { FriendResponses, IFriendRequest, IFriendResponse } from '../../store/data/notifications';

export const mapRequestsToNotifications = (
	requests: IFriendRequest[],
	responses: IFriendResponse[],
) => {
	const reqs = requests.map((req) => ({
		id: req.id,
		userId: req.owner.alias,
		type: NOTIFICATION_TYPES.FRIEND_REQUEST,
		fullName: req.fullName,
		userName: req.owner.alias,
		avatar: req.avatar,
		timestamp: new Date(req.timestamp),
		read: req.read,
	}));

	const resps = responses.map((res) => ({
		id: res.id,
		userId: res.owner.alias,
		type:
			res.type === FriendResponses.Accepted
				? NOTIFICATION_TYPES.FRIEND_RESPONSE_ACCEPTED
				: NOTIFICATION_TYPES.FRIEND_RESPONSE_DECLINED,
		fullName: res.fullName,
		userName: res.owner.alias,
		avatar: res.avatar,
		timestamp: new Date(res.timestamp),
		read: res.read,
	}));

	return reqs.concat(resps).sort((x, y) => y.timestamp.getTime() - x.timestamp.getTime());
};

export const getUnreadNotifications = (
	requests: IFriendRequest[],
	responses: IFriendResponse[],
) => {
	return requests.concat(responses).reduce((acc, notification) => {
		if (!notification.read) {
			return acc + 1;
		}
		return acc;
	}, 0);
};
