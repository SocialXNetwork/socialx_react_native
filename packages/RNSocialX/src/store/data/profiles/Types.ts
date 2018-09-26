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
	PROFILE_BY_USERNAME = 'app/data/profiles/PROFILE_BY_USERNAME',
	CURRENT_PROFILE = 'app/data/profiles/CURRENT_PROFILE',
	PUBLIC_KEY_BY_USERNAME = 'app/data/profiles/PUBLIC_KEY_BY_USERNAME',
}

export interface ICreateProfileAction extends Action {
	type: ActionTypes.CREATE_PROFILE;
	payload: ICreateProfileInput;
}

export interface IProfileByUsernameAction extends Action {
	type: ActionTypes.PROFILE_BY_USERNAME;
	payload: IUsernameArgument;
}

export interface ICurrentProfileAction extends Action {
	type: ActionTypes.CURRENT_PROFILE;
}

export interface IPublicKeyByUsernameAction extends Action {
	type: ActionTypes.PUBLIC_KEY_BY_USERNAME;
	payload: IUsernameArgument;
}

export type IAction =
	| ICreateProfileAction
	| IProfileByUsernameAction
	| ICurrentProfileAction
	| IPublicKeyByUsernameAction;
