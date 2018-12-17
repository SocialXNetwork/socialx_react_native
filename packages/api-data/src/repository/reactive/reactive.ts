import { IContext } from '../../types';
import hooks from './hooks';
import { IFriendRequestsCallback, IFriendResponsesCallback, NotificationType } from './types';

import { api as profilesApi, IFriendData } from '../profiles';

import { NOTIFICATION_TYPES } from '../notifications';

// TODO: handle errors in an optimistic manner
export default (context: IContext) => ({
	hookFriendRequests: (callback: (result: IFriendRequestsCallback) => void) => {
		hooks.hookNotifications(
			context,
			{ type: NotificationType.FriendRequests },
			async (err, res: any) => {
				if (Object.keys(res).length <= 0) {
					//
				} else {
					const profiles = await profilesApi(context).getProfilesByUsernames({
						usernames: Object.keys(res),
					});

					// tslint:disable-next-line
					for (const noti in res) {
						res[noti].type = NOTIFICATION_TYPES.FRIEND_REQUEST;
					}
					callback({ profiles, requests: res });
				}
			},
		);
	},
	hookFriendResponses: (callback: (result: IFriendResponsesCallback) => void) => {
		hooks.hookNotifications(
			context,
			{ type: NotificationType.FriendRequestResponses },
			async (err, res: any) => {
				if (Object.keys(res).length <= 0) {
					//
				} else {
					const profiles = await profilesApi(context).getProfilesByUsernames({
						usernames: Object.keys(res),
					});
					callback({ profiles, responses: res });
				}
			},
		);
	},
	unhookNotifications: () => undefined, // hooks.unHookNotifications(context),
});
