import { Action } from 'redux';
import { DeepReadonly } from 'utility-types';

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

export type IAction = ISetNavigationParamsAction;
