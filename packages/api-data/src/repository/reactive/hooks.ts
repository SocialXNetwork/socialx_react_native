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
	callback: IGunCallback<IFriendRequests | IFriendResponses>,
) => {
	switch (hookRequested.type) {
		case NotificationType.FriendRequests: {
			currentFriendRequests(context).open(
				(friendRequests: IFriendRequests) => {
					if (Object.keys(friendRequests).length === 0) {
						callback(null);
					} else {
						// removed requests
						Object.keys(friendRequests).forEach((key: string) => {
							if (friendRequests[key] === null || Object.keys(friendRequests[key]).length === 0) {
								delete friendRequests[key];
							}
						});
						callback(null, friendRequests);
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
						Object.keys(friendResponses).forEach((key: string) => {
							if (friendResponses[key] === null || Object.keys(friendResponses[key]).length === 0) {
								delete friendResponses[key];
							}
						});
						callback(null, friendResponses);
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
	// currentFriendRequests(context).off();
	// currentFriendReqResponse(context).off();
};

export default {
	hookNotifications,
	unHookNotifications,
};
