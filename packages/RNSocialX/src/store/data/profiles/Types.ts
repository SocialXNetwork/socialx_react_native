import {
	IAcceptFriendInput,
	IAddFriendInput,
	IClearFriendRequestInput,
	IClearFriendResponseInput,
	IFriendData,
	IPostArrayData,
	IProfileData,
	IRejectFriendInput,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export type IState = DeepReadonly<{
	profiles: IFriendData[];
	friends: {
		[username: string]: IFriendData[];
	};
}>;

export interface IUsernameInput {
	username: string;
}

export interface IUsernamesInput {
	usernames: string[];
}

export const enum ActionTypes {
	GET_PROFILE_BY_USERNAME = 'app/data/profiles/GET_PROFILE_BY_USERNAME',
	SYNC_GET_PROFILE_BY_USERNAME = 'app/data/profiles/SYNC_GET_PROFILE_BY_USERNAME',
	GET_PROFILES_BY_USERNAMES = 'app/data/profiles/GET_PROFILES_BY_USERNAMES',
	SYNC_GET_PROFILES_BY_USERNAMES = 'app/data/profiles/SYNC_GET_PROFILES_BY_USERNAMES',
	GET_CURRENT_PROFILE = 'app/data/profiles/GET_CURRENT_PROFILE',
	SYNC_GET_CURRENT_PROFILE = 'app/data/profiles/SYNC_GET_CURRENT_PROFILE',
	GET_PROFILES_BY_POSTS = 'app/data/profiles/GET_PROFILES_BY_POSTS',
	SYNC_GET_PROFILES_BY_POSTS = 'app/data/profiles/SYNC_GET_PROFILES_BY_POSTS',
	GET_CURRENT_FRIENDS = 'app/data/profiles/GET_CURRENT_FRIENDS',
	SYNC_GET_CURRENT_FRIENDS = 'app/data/profiles/SYNC_GET_CURRENT_FRIENDS',
	UPDATE_PROFILE = 'app/data/profiles/UPDATE_PROFILE',
	ADD_FRIEND = 'app/data/profiles/ADD_FRIEND',
	REMOVE_FRIEND = 'app/data/profiles/REMOVE_FRIEND',
	ACCEPT_FRIEND = 'app/data/profiles/ACCEPT_FRIEND',
	REJECT_FRIEND = 'app/data/profiles/REJECT_FRIEND',
	CLEAR_FRIEND_RESPONSE = 'app/data/profiles/CLEAR_FRIEND_RESPONSE',
	CLEAR_FRIEND_REQUEST = 'app/data/profiles/CLEAR_FRIEND_REQUEST',
}

export interface IGetProfilesByPostsAction extends Action {
	type: ActionTypes.GET_PROFILES_BY_POSTS;
	payload: IPostArrayData;
}

export interface ISyncGetProfilesByPostsAction extends Action {
	type: ActionTypes.SYNC_GET_PROFILES_BY_POSTS;
	payload: IFriendData[];
}

export interface IGetProfileByUsernameAction extends Action {
	type: ActionTypes.GET_PROFILE_BY_USERNAME;
	payload: IUsernameInput;
}

export interface ISyncGetProfileByUsernameAction extends Action {
	type: ActionTypes.SYNC_GET_PROFILE_BY_USERNAME;
	payload: IFriendData;
}

export interface IGetProfilesByUsernamesAction extends Action {
	type: ActionTypes.GET_PROFILES_BY_USERNAMES;
	payload: IUsernamesInput;
}

export interface ISyncGetProfilesByUsernamesAction extends Action {
	type: ActionTypes.SYNC_GET_PROFILES_BY_USERNAMES;
	payload: IFriendData[];
}

export interface IGetCurrentProfileAction extends Action {
	type: ActionTypes.GET_CURRENT_PROFILE;
}

export interface ISyncGetCurrentProfileAction extends Action {
	type: ActionTypes.SYNC_GET_CURRENT_PROFILE;
	payload: IProfileData;
}

export interface IGetCurrentFriendsAction extends Action {
	type: ActionTypes.GET_CURRENT_FRIENDS;
}

export interface ISyncGetCurrentFriendsAction extends Action {
	type: ActionTypes.SYNC_GET_CURRENT_FRIENDS;
	payload: { username: string; friends: IFriendData[] };
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

export interface IRejectFriendAction extends Action {
	type: ActionTypes.REJECT_FRIEND;
	payload: IRejectFriendInput;
}

export interface IClearFriendResponseAction extends Action {
	type: ActionTypes.CLEAR_FRIEND_RESPONSE;
	payload: IClearFriendResponseInput;
}

export interface IClearFriendRequestAction extends Action {
	type: ActionTypes.CLEAR_FRIEND_REQUEST;
	payload: IClearFriendRequestInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IResetStoreAction
	| IGetProfileByUsernameAction
	| ISyncGetProfileByUsernameAction
	| IGetProfilesByUsernamesAction
	| ISyncGetProfilesByUsernamesAction
	| IGetCurrentProfileAction
	| ISyncGetCurrentProfileAction
	| IGetCurrentFriendsAction
	| ISyncGetCurrentFriendsAction
	| IUpdateProfileAction
	| IAddFriendAction
	| IRemoveFriendAction
	| IGetProfilesByPostsAction
	| ISyncGetProfilesByPostsAction
	| IAcceptFriendAction
	| IRejectFriendAction
	| IClearFriendResponseAction
	| IClearFriendRequestAction;
