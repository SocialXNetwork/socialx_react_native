export { default as reducer } from './reducer';
export { IState, IAction, ActionTypes, INotifications } from './Types';

export {
	INotificationData,
	INotificationReturnData,
	IRemoveNotificationInput,
	ICreateNotification,
	FriendResponses,
	IFriendRequest,
	IFriendResponse,
} from '@socialx/api-data';

export {
	createNotification,
	getNotifications,
	hookNotifications,
	markNotificationsAsRead,
} from './actions';
