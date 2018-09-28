import { Action } from 'redux';
import { DeepReadonly } from 'utility-types';

export interface IActivity {
	uuid: string;
	type: string | null;
}

export type IState = DeepReadonly<{
	activities: IActivity[];
}>;

export const enum ActionTypes {
	ACTIVITY = 'ui/activities/ACTIVITY',
}

export interface IActivityAction extends Action {
	type: ActionTypes.ACTIVITY;
	payload: IActivity;
}

export type IAction = IActivityAction;
