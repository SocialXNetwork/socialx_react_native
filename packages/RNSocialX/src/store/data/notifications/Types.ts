import {
	INotificationByIdInput,
	INotificationData,
	INotificationsReturnData,
	IRemoveNotificationInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types';

export type IState = DeepReadonly<{
	notifications: INotificationsReturnData | null;
	notification: INotificationData | null;
}>;

export const enum ActionTypes {
	CREATE_NOTIFICATION = 'data/notifications/CREATE_NOTIFICATION',
	REMOVE_NOTIFICATION = 'data/notifications/REMOVE_NOTIFICATION',
	CURRENT_NOTIFICATION = 'data/notifications/CURRENT_NOTIFICATION',
	NOTIFICATION_BY_ID = 'data/notifications/NOTIFICATION_BY_ID',
}

export interface ICreateNotificationAction extends Action {
	type: ActionTypes.CREATE_NOTIFICATION;
	payload: INotificationData;
}

export interface IRemoveNotificationAction extends Action {
	type: ActionTypes.REMOVE_NOTIFICATION;
	payload: IRemoveNotificationInput;
}

export interface ICurrentNotificationsAction extends Action {
	type: ActionTypes.CURRENT_NOTIFICATION;
	payload: INotificationsReturnData;
}

export interface INotificationByIdAction extends Action {
	type: ActionTypes.NOTIFICATION_BY_ID;
	payload: INotificationByIdInput & { notification: INotificationData };
}

export type IAction =
	| ICreateNotificationAction
	| IRemoveNotificationAction
	| ICurrentNotificationsAction
	| INotificationByIdAction;
