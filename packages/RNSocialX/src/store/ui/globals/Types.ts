import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export interface IGlobal {
	[name: string]: any;
}

export type IState = DeepReadonly<IGlobal>;

export const enum ActionTypes {
	SET_GLOBAL = 'ui/globals/SET_GLOBAL',
}

export interface ISetGlobalAction extends Action {
	type: ActionTypes.SET_GLOBAL;
	payload: IGlobal;
}

export type IAction = ISetGlobalAction;
