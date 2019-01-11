import {
	IFriendRequest,
	IFriendResponse,
	INotificationData,
	IRemoveNotificationInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export interface INotifications {
	[alias: string]: IFriendRequest | IFriendResponse;
}

export type IState = DeepReadonly<{
	all: INotifications;
	ids: string[];
	unread: string[];
}>;

export const enum ActionTypes {
	CREATE_NOTIFICATION = 'data/notifications/CREATE_NOTIFICATION',
	REMOVE_NOTIFICATION = 'data/notifications/REMOVE_NOTIFICATION',
	SYNC_NOTIFICATIONS = 'data/notifications/SYNC_NOTIFICATIONS',
	GET_NOTIFICATIONS = 'data/notifications/GET_NOTIFICATIONS',
	MARK_NOTIFICATIONS_AS_READ = 'data/notifications/MARK_NOTIFICATIONS_AS_READ',
	HOOK_NOTIFICATIONS = 'data/notifications/HOOK_NOTIFICATIONS',
	DELETE_NOTIFICATION = 'data/notifications/DELETE_NOTIFICATION',
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
	type: ActionTypes.GET_NOTIFICATIONS;
}

export interface ISyncNotificationsAction extends Action {
	type: ActionTypes.SYNC_NOTIFICATIONS;
	payload: INotifications;
}

export interface IHookNotificationsAction extends Action {
	type: ActionTypes.HOOK_NOTIFICATIONS;
}

export interface IMarkNotificationsAsReadAction extends Action {
	type: ActionTypes.MARK_NOTIFICATIONS_AS_READ;
}

export interface IDeleteNotificationAction extends Action {
	type: ActionTypes.DELETE_NOTIFICATION;
	payload: {
		id: string;
	};
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IResetStoreAction
	| ICreateNotificationAction
	| IRemoveNotificationAction
	| IGetNotificationsAction
	| ISyncNotificationsAction
	| IHookNotificationsAction
	| IMarkNotificationsAsReadAction
	| IDeleteNotificationAction;
