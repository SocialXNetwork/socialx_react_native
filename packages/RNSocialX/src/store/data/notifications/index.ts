export { default as reducer } from './reducer';
export { IState, IAction } from './Types';

export {
	INotificationData,
	INotificationReturnData,
	IRemoveNotificationInput,
	ICreateNotification,
	IFriendRequest,
	IFriendResponse,
	FriendResponses,
} from '@socialx/api-data';

export { createNotification, getNotifications, hookNotifications } from './actions';
