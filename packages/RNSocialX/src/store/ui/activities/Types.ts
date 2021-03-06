import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export interface IActivity {
	uuid: string;
	type: string | null;
	payload?: string;
}

export interface IError extends IActivity {
	error: {
		message: string;
		type: string;
	} | null;
	timeout?: number;
}

export type IState = DeepReadonly<{
	activities: IActivity[];
	errors: IError[];
}>;

export const enum ActionTypes {
	ACTIVITY = 'ui/activities/ACTIVITY',
	ERROR = 'ui/activities/ERROR',
}

export interface IActivityAction extends Action {
	type: ActionTypes.ACTIVITY;
	payload: IActivity;
}

export interface IErrorAction extends Action {
	type: ActionTypes.ERROR;
	payload: IError;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction = IResetStoreAction | IActivityAction | IErrorAction;
