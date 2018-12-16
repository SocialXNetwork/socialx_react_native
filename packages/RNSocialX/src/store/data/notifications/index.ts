export { default as reducer } from './reducer';
export {
	IState,
	IAction,
	IFriendRequests,
	IFriendResponses,
	ActionTypes,
	IUnreadNotificationsInput,
} from './Types';

export {
	INotificationData,
	INotificationReturnData,
	IRemoveNotificationInput,
	ICreateNotification,
	IFriendRequest,
	IFriendResponse,
	FriendResponses,
	IClearFriendRequestInput,
	IClearFriendResponseInput,
} from '@socialx/api-data';

export {
	createNotification,
	getNotifications,
	hookNotifications,
	markNotificationsAsRead,
} from './actions';
