// todo @jake

import {
	INotificationByIdInput,
	INotificationData,
	INotificationsReturnData,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types';

export type IState = DeepReadonly<{
	notifications: Array<{}>;
}>;

export const enum ActionTypes {
	CREATE_NOTIFICATION = 'data/notifications/CREATE_NOTIFICATION',
}

export interface ICreateNotificationAction extends Action {
	type: ActionTypes.CREATE_NOTIFICATION;
}

export type IAction = ICreateNotificationAction;
