export { default as reducer } from './reducer';
export { IState, IAction } from './Types';

export {
	INotificationData,
	INotificationReturnData,
	IRemoveNotificationInput,
	ICreateNotification,
} from '@socialx/api-data';

export {
	createNotification,
	getNotifications,
	removeNotification,
} from './actions';
