import {
	INotificationByIdInput,
	INotificationData,
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
		dispatch(removeNotificationAction(removeNotificationInput));
	} catch (e) {
		/**/
	}
};

export const currentNotificationAction: ActionCreator<
	ICurrentNotificationsAction
> = () => ({
	type: ActionTypes.CURRENT_NOTIFICATION,
});

export const currentNotification = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(currentNotificationAction());
	} catch (e) {
		/**/
	}
};

const notificationByIdAction: ActionCreator<INotificationByIdAction> = (
	notificationByIdInput: INotificationByIdInput,
) => ({
	type: ActionTypes.NOTIFICATION_BY_ID,
	payload: notificationByIdInput,
});

export const notificationById = (
	notificationByIdInput: INotificationByIdInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(notificationByIdAction(notificationByIdInput));
	} catch (e) {
		/**/
	}
};
