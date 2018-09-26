import { ICreateProfileInput } from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types';

export interface IUsernameArgument {
	username: string;
}

export interface IProfile {
	pub: string;
	email: string;
	avatar: string;
}

export type IState = DeepReadonly<{
	profiles: IProfile[];
}>;

export const enum ActionTypes {
	CREATE_PROFILE = 'app/data/profiles/CREATE_PROFILE',
	GET_PROFILE_BY_USERNAME = 'app/data/profiles/GET_PROFILE_BY_USERNAME',
	GET_CURRENT_PROFILE = 'app/data/profiles/GET_CURRENT_PROFILE',
	GET_PUBLIC_KEY_BY_USERNAME = 'app/data/profiles/GET_PUBLIC_KEY_BY_USERNAME',
}

export interface ICreateProfileAction extends Action {
	type: ActionTypes.CREATE_PROFILE;
	payload: ICreateProfileInput;
}

export interface IGetProfileByUsernameAction extends Action {
	type: ActionTypes.GET_PROFILE_BY_USERNAME;
	payload: IUsernameArgument;
}

export interface IGetCurrentProfileAction extends Action {
	type: ActionTypes.GET_CURRENT_PROFILE;
}

export interface IGetPublicKeyByUsernameAction extends Action {
	type: ActionTypes.GET_PUBLIC_KEY_BY_USERNAME;
	payload: IUsernameArgument;
}

export type IAction =
	| ICreateProfileAction
	| IGetProfileByUsernameAction
	| IGetCurrentProfileAction
	| IGetPublicKeyByUsernameAction;
