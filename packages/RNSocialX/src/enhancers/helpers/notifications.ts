import { NOTIFICATION_TYPES } from '../../../src/environment/consts';

import { FriendResponses, IFriendRequests, IFriendResponses } from '../../store/data/notifications';

export const mapRequestsToNotifications = (
	requests: IFriendRequests,
	responses: IFriendResponses,
) => {
	const reqs = Object.keys(requests).map((key) => {
		const req = requests[key];

		return {
			id: req.id,
			type: NOTIFICATION_TYPES.FRIEND_REQUEST,
			fullName: req.fullName,
			alias: req.owner.alias,
			avatar: req.avatar,
			timestamp: new Date(req.timestamp),
			read: req.read,
		};
	});

	const resps = Object.keys(responses).map((key) => {
		const res = responses[key];

		return {
			id: res.id,
			type:
				res.type === FriendResponses.Accepted
					? NOTIFICATION_TYPES.FRIEND_RESPONSE_ACCEPTED
					: NOTIFICATION_TYPES.FRIEND_RESPONSE_DECLINED,
			fullName: res.fullName,
			alias: res.owner.alias,
			avatar: res.avatar,
			timestamp: new Date(res.timestamp),
			read: res.read,
		};
	});

	const unreadRequests = [];
	const unreadResponses = [];

	for (const req of reqs) {
		if (!req.read) {
			unreadRequests.push({ username: req.alias });
		}
	}

	for (const res of resps) {
		if (!res.read) {
			unreadResponses.push({ username: res.alias });
		}
	}

	return {
		all: reqs.concat(resps).sort((x, y) => y.timestamp.getTime() - x.timestamp.getTime()),
		unreadRequests,
		unreadResponses,
	};
};
