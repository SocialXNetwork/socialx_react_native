import {
	INotificationByIdInput,
	INotificationData,
	INotificationsReturnData,
	IRemoveNotificationInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	ICreateNotificationAction,
	ICurrentNotificationsAction,
	INotificationByIdAction,
	IRemoveNotificationAction,
} from './Types';

const createNotificationAction: ActionCreator<ICreateNotificationAction> = (
	createNotificationInput: INotificationData,
) => ({
	type: ActionTypes.CREATE_NOTIFICATION,
	payload: createNotificationInput,
});

export const createNotification = (
	createNotificationInput: INotificationData,
): IThunk => async (dispatch, getState, context) => {
	try {
		const { dataApi } = context;
		await dataApi.notifications.createNotification(createNotificationInput);
		dispatch(createNotificationAction(createNotificationInput));
	} catch (e) {
		/**/
	}
};

const removeNotificationAction: ActionCreator<IRemoveNotificationAction> = (
	removeNotificationInput: IRemoveNotificationInput,
) => ({
	type: ActionTypes.REMOVE_NOTIFICATION,
	payload: removeNotificationInput,
});

export const removeNotification = (
	removeNotificationInput: IRemoveNotificationInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		const { dataApi } = context;
		await dataApi.notifications.removeNotification(removeNotificationInput);
		dispatch(removeNotificationAction(removeNotificationInput));
	} catch (e) {
		/**/
	}
};

export const currentNotificationAction: ActionCreator<
	ICurrentNotificationsAction
> = (currentNotificationsData: INotificationsReturnData) => ({
	type: ActionTypes.CURRENT_NOTIFICATION,
	payload: currentNotificationsData,
});

export const currentNotification = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		const { dataApi } = context;
		const notifications = await dataApi.notifications.getCurrentNotifications();
		dispatch(currentNotificationAction(notifications));
	} catch (e) {
		/**/
	}
};

const notificationByIdAction: ActionCreator<INotificationByIdAction> = (
	notificationByIdData: INotificationByIdInput & {
		notification: INotificationData;
	},
) => ({
	type: ActionTypes.NOTIFICATION_BY_ID,
	payload: notificationByIdData,
});

export const notificationById = (
	notificationByIdInput: INotificationByIdInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		const { dataApi } = context;
		const notification = await dataApi.notifications.getNotificationById(
			notificationByIdInput,
		);
		dispatch(
			notificationByIdAction({
				...notificationByIdInput,
				notification,
			}),
		);
	} catch (e) {
		/**/
	}
};
