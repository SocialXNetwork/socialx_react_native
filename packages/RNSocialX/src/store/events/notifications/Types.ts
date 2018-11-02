import { IAllNotificationsData } from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export type IState = DeepReadonly<{
	notifications: {
		[alias: string]: IAllNotificationsData[];
	};
}>;
export interface IGetUserEventsInput extends Action {
	type: ActionTypes.GET_USER_EVENTS;
}

export const enum ActionTypes {
	GET_USER_EVENTS = 'app/data/profiles/GET_USER_EVENTS',
	SYNC_GET_USER_EVENTS = 'app/data/profiles/SYNC_GET_USER_EVENTS',
	RESET_USER_EVENTS = 'app/data/profiles/UPDATE_USER_EVENTS',
}

export interface IGetUserEventsAction extends Action {
	type: ActionTypes.GET_USER_EVENTS;
}

export interface ISyncGetUserEventsInput {
	notifications: IAllNotificationsData[];
	owner: string;
}

export interface ISyncGetUserEventsAction extends Action {
	type: ActionTypes.SYNC_GET_USER_EVENTS;
	payload: ISyncGetUserEventsInput;
}

export interface IGetUserEventsAction extends Action {
	type: ActionTypes.GET_USER_EVENTS;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}

export type IAction =
	| IResetStoreAction
	| IGetUserEventsAction
	| ISyncGetUserEventsAction
	| ISyncGetUserEventsInputs
	| IGetUserEventsInput;
