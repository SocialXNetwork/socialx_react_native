import {
	INotificationData,
	INotificationReturnData,
	IRemoveNotificationInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { beginActivity, endActivity } from '../../ui/activities';
import {
	ActionTypes,
	ICreateNotificationAction,
	IGetNotificationsAction,
	IRemoveNotificationAction,
	ISyncNotificationsAction,
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
		// TODO: this should not be exposed to redux
		// const { dataApi } = context;
		// await dataApi.notifications.createNotification(createNotificationInput);
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

export const getNotificationsAction: ActionCreator<
	IGetNotificationsAction
> = () => ({
	type: ActionTypes.GET_CURRENT_NOTIFICATIONS,
});

export const syncNotificationsAction: ActionCreator<
	ISyncNotificationsAction
> = (notifications: INotificationReturnData[]) => ({
	type: ActionTypes.SYNC_CURRENT_NOTIFICATIONS,
	payload: notifications,
});

export const getNotifications = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	try {
		dispatch(getNotificationsAction());
		dispatch(
			beginActivity({
				uuid: activityId,
				type: ActionTypes.GET_CURRENT_NOTIFICATIONS,
			}),
		);
		const { dataApi } = context;
		const notifications = await dataApi.notifications.getNotifications();
		dispatch(syncNotificationsAction(notifications));
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};
