import {
	FriendResponses,
	IFriendRequest,
	IFriendResponse,
	INotificationData,
	INotificationReturnData,
	IRemoveNotificationInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export type IState = DeepReadonly<{
	friend_requests: IFriendRequest[];
	friend_responses: IFriendResponse[];
}>;

export const enum ActionTypes {
	CREATE_NOTIFICATION = 'data/notifications/CREATE_NOTIFICATION',
	REMOVE_NOTIFICATION = 'data/notifications/REMOVE_NOTIFICATION',
	SYNC_CURRENT_NOTIFICATIONS = 'data/notifications/SYNC_CURRENT_NOTIFICATIONS',
	GET_CURRENT_NOTIFICATIONS = 'data/notifications/GET_CURRENT_NOTIFICATIONS',
	// hooks
	HOOK_NOTIFICATIONS = 'data/notifications/HOOK_NOTIFICATIONS',
	SYNC_FRIEND_REQUESTS = 'data/notifications/SYNC_FRIEND_REQUESTS',
	SYNC_FRIEND_RESPONSES = 'data/notifications/SYNC_FRIEND_RESPONSES',
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

export interface IHookNotificationsAction extends Action {
	type: ActionTypes.HOOK_NOTIFICATIONS;
}

export interface ISyncFriendRequestsAction extends Action {
	type: ActionTypes.SYNC_FRIEND_REQUESTS;
	payload: IFriendRequest[];
}

export interface ISyncFriendResponsesAction extends Action {
	type: ActionTypes.SYNC_FRIEND_RESPONSES;
	payload: IFriendResponse[];
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
	| ISyncFriendRequestsAction
	| ISyncFriendResponsesAction;
