import {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IProfileData,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export type IState = DeepReadonly<{
	profiles: IProfileData[];
}>;

export interface IUsernameInput {
	username: string;
}

export const enum ActionTypes {
	CREATE_PROFILE = 'app/data/profiles/CREATE_PROFILE',
	GET_PROFILE_BY_USERNAME = 'app/data/profiles/GET_PROFILE_BY_USERNAME',
	SYNC_GET_PROFILE_BY_USERNAME = 'app/data/profiles/SYNC_GET_PROFILE_BY_USERNAME',
	GET_CURRENT_PROFILE = 'app/data/profiles/GET_CURRENT_PROFILE',
	SYNC_GET_CURRENT_PROFILE = 'app/data/profiles/SYNC_GET_CURRENT_PROFILE',
	GET_PUBLIC_KEY_BY_USERNAME = 'app/data/profiles/GET_PUBLIC_KEY_BY_USERNAME',
	SYNC_GET_PUBLIC_KEY_BY_USERNAME = 'app/data/profiles/SYNC_GET_PUBLIC_KEY_BY_USERNAME',
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
	payload: IUsernameInput;
}

export interface ISyncGetProfileByUsernameAction extends Action {
	type: ActionTypes.SYNC_GET_PROFILE_BY_USERNAME;
	payload: IProfileData;
}

export interface IGetCurrentProfileAction extends Action {
	type: ActionTypes.GET_CURRENT_PROFILE;
}

export interface ISyncGetCurrentProfileAction extends Action {
	type: ActionTypes.SYNC_GET_CURRENT_PROFILE;
	payload: IProfileData;
}

export interface IGetPublicKeyByUsernameAction extends Action {
	type: ActionTypes.GET_PUBLIC_KEY_BY_USERNAME;
	payload: IUsernameInput;
}

export interface ISyncGetPublicKeyByUsernameAction extends Action {
	type: ActionTypes.SYNC_GET_PUBLIC_KEY_BY_USERNAME;
	payload: string;
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
	| ISyncGetProfileByUsernameAction
	| IGetCurrentProfileAction
	| ISyncGetCurrentProfileAction
	| IGetPublicKeyByUsernameAction
	| ISyncGetPublicKeyByUsernameAction
	| IUpdateProfileAction
	| IAddFriendAction
	| IRemoveFriendAction
	| IAcceptFriendAction;
