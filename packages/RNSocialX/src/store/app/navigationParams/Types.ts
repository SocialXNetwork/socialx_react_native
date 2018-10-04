import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';
import { ISetAuthAction } from '../auth/Types';

export interface INavigationParams {
	[paramName: string]: any;
}

export type IState = DeepReadonly<{
	[screenName: string]: INavigationParams;
}>;

export const enum ActionTypes {
	SET_NAVIGATION_PARAMS = 'app/navigationParams/SET_NAVIGATION_PARAMS',
}

export interface ISetNavigationParamsInput {
	screenName: string;
	params: INavigationParams;
}

export interface ISetNavigationParamsAction extends Action {
	type: ActionTypes.SET_NAVIGATION_PARAMS;
	payload: ISetNavigationParamsInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction = IResetStoreAction | ISetNavigationParamsAction;
