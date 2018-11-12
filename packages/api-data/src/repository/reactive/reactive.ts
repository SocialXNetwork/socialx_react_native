import { IContext } from '../../types';
import hooks from './hooks';
import { IFriendRequest, IFriendResponse, NotificationType } from './types';

// TODO: handle errors in an optimistic manner
export default (context: IContext) => ({
	hookFriendRequests: (callback: (friendRequests: IFriendRequest[]) => void) => {
		hooks.hookNotifications(context, { type: NotificationType.FriendRequests }, (err, res: any) => {
			if (Object.keys(res).length <= 0) {
				//
			} else {
				callback(res as IFriendRequest[]);
			}
		});
	},
	hookFriendResponses: (callback: (friendResponses: IFriendResponse[]) => void) => {
		hooks.hookNotifications(
			context,
			{ type: NotificationType.FriendRequestResponses },
			(err, res: any) => {
				if (Object.keys(res).length <= 0) {
					//
				} else {
					callback(res as IFriendResponse[]);
				}
			},
		);
	},
	unhookNotifications: () => hooks.unHookNotifications(context),
});
