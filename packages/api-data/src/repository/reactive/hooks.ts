import { IContext, IGunCallback } from '../../types';
import { convertGunSetToArray } from '../../utils/helpers';
import {
	IFriendRequest,
	IFriendRequests,
	IFriendResponse,
	IFriendResponses,
	INotificationHookArgs,
	NotificationType,
} from './types';

import { currentFriendReqResponse, currentFriendRequests } from './handles';

export const hookNotifications = (
	context: IContext,
	hookRequested: INotificationHookArgs,
	callback: IGunCallback<IFriendRequest[] | IFriendResponse[]>,
) => {
	switch (hookRequested.type) {
		case NotificationType.FriendRequests: {
			currentFriendRequests(context).open(
				(friendRequests: IFriendRequests) => {
					if (Object.keys(friendRequests).length === 0) {
						callback(null);
					} else {
						// removed requests
						const sanitizedRequests = convertGunSetToArray(friendRequests).filter(
							(req) => req !== null,
						);
						callback(null, sanitizedRequests);
					}
				},
				{ wait: 200 },
			);
			break;
		}

		case NotificationType.FriendRequestResponses: {
			currentFriendReqResponse(context).open(
				(friendResponses: IFriendResponses) => {
					if (Object.keys(friendResponses).length === 0) {
						callback(null);
					} else {
						// removed responses
						const sanitizedResponses = convertGunSetToArray(friendResponses).filter(
							(res) => res !== null,
						);
						callback(null, sanitizedResponses);
					}
				},
				{ wait: 200 },
			);
			break;
		}

		default: {
			callback(null);
			break;
		}
	}
};

export const unHookNotifications = (context: IContext) => {
	currentFriendRequests(context).off();
	currentFriendReqResponse(context).off();
};

export default {
	hookNotifications,
	unHookNotifications,
};
