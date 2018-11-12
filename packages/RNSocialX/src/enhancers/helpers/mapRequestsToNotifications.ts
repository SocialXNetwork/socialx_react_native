import { NOTIFICATION_TYPES } from '../../../src/environment/consts';

import { IFriendRequest, IFriendResponse } from '../../store/data/notifications';

export const mapRequestsToNotifications = (
	requests: IFriendRequest[],
	responses: IFriendResponse[],
	url: string,
) => {
	const reqs = requests.map((req) => {
		return {
			notificationId: req.id,
			userId: req.owner.alias,
			type: NOTIFICATION_TYPES.FRIEND_REQUEST,
			fullName: req!.fullName,
			userName: req.owner.alias,
			avatar: url + req!.avatar,
			timestamp: new Date(req.timestamp),
		};
	});

	const resps = responses.map((res) => {
		return {
			notificationId: res.id,
			userId: res.owner.alias,
			type: NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE,
			fullName: res!.fullName,
			userName: res.owner.alias,
			avatar: url + res!.avatar,
			timestamp: new Date(res.timestamp),
		};
	});

	return [...reqs, ...resps].sort((x, y) => x.timestamp.getTime() - y.timestamp.getTime());
};
