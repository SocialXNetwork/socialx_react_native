import {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from '@socialx/api-data';
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
	UPDATE_PROFILE = 'app/data/profiles/UPDATE_PROFILE',
	ADD_FRIEND = 'app/data/profiles/ADD_FRIEND',
	REMOVE_FRIEND = 'app/data/profiles/REMOVE_FRIEND',
	ACCEPT_FRIEND = 'app/data/profiles/ACCEPT_FRIEND',
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

export interface IUpdateProfileAction extends Action {
	type: ActionTypes.UPDATE_PROFILE;
	payload: IUpdateProfileInput;
}

export interface IAddFriendAction extends Action {
	type: ActionTypes.ADD_FRIEND;
	payload: IAddFriendInput;
}

export interface IRemoveFriendAction extends Action {
	type: ActionTypes.REMOVE_FRIEND;
	payload: IRemoveFriendInput;
}

export interface IAcceptFriendAction extends Action {
	type: ActionTypes.ACCEPT_FRIEND;
	payload: IAcceptFriendInput;
}

export type IAction =
	| ICreateProfileAction
	| IGetProfileByUsernameAction
	| IGetCurrentProfileAction
	| IGetPublicKeyByUsernameAction
	| IUpdateProfileAction
	| IAddFriendAction
	| IRemoveFriendAction
	| IAcceptFriendAction;
