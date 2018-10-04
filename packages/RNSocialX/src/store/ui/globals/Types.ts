import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';
import { ISetAuthAction } from '../../app/auth/Types';

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

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction = IResetStoreAction | ISetGlobalAction;
