import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export interface IAuthData {
	alias?: string;
	pub?: string;
	password?: string; // TEMP: should be removed, find a better way?
}

export type IState = DeepReadonly<{
	auth: IAuthData | null;
}>;

export const enum ActionTypes {
	SET_AUTH = 'app/auth/SET_AUTH',
	RESET_DATABASE_AND_STORE = 'app/auth/RESET_DATABASE_AND_STORE',
}

export interface ISetAuthAction extends Action {
	type: ActionTypes.SET_AUTH;
	payload: IAuthData | null;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction = IResetStoreAction | ISetAuthAction;
