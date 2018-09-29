import {
	INotificationData,
	INotificationReturnData,
	IRemoveNotificationInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export type IState = DeepReadonly<{
	notifications: INotificationReturnData[];
}>;

export const enum ActionTypes {
	CREATE_NOTIFICATION = 'data/notifications/CREATE_NOTIFICATION',
	REMOVE_NOTIFICATION = 'data/notifications/REMOVE_NOTIFICATION',
	SYNC_CURRENT_NOTIFICATIONS = 'data/notifications/SYNC_CURRENT_NOTIFICATIONS',
	GET_CURRENT_NOTIFICATIONS = 'data/notifications/GET_CURRENT_NOTIFICATIONS',
}

export interface ICreateNotificationAction extends Action {
	type: ActionTypes.CREATE_NOTIFICATION;
	payload: INotificationData;
}

export interface IRemoveNotificationAction extends Action {
	type: ActionTypes.REMOVE_NOTIFICATION;
	payload: IRemoveNotificationInput;
}

export interface IGetNotificationsAction extends Action {
	type: ActionTypes.GET_CURRENT_NOTIFICATIONS;
}

export interface ISyncNotificationsAction extends Action {
	type: ActionTypes.SYNC_CURRENT_NOTIFICATIONS;
	payload: INotificationReturnData[];
}

export type IAction =
	| ICreateNotificationAction
	| IRemoveNotificationAction
	| IGetNotificationsAction
	| ISyncNotificationsAction;
