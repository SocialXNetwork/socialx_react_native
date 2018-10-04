import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export interface IAuthData {
	alias: string;
	pub: string;
}

export type IState = DeepReadonly<{
	auth: IAuthData | null;
}>;

export const enum ActionTypes {
	SET_AUTH = 'app/auth/SET_AUTH',
}

export interface ISetAuthAction extends Action {
	type: ActionTypes.SET_AUTH;
	payload: IAuthData | null;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction = IResetStoreAction | ISetAuthAction;
