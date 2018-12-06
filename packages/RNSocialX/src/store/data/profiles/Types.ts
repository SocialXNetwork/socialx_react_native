import {
	IAcceptFriendInput,
	IAddFriendInput,
	IClearFriendRequestInput,
	IClearFriendResponseInput,
	IFriendData,
	IPostArrayData,
	IRejectFriendInput,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export interface IProfile extends IFriendData {}

export interface IProfiles {
	[alias: string]: IProfile;
}

export interface IFriends {
	[alias: string]: string[];
}

export type IState = DeepReadonly<{
	profiles: IProfiles;
	friends: IFriends;
	results: string[];
}>;

export interface ISyncFriendsInput {
	alias: string;
	friends: IProfile[];
}

export interface IAddPostsToProfileInput {
	alias: string;
	postIds: string[];
}

export interface IRemovePostFromProfileInput {
	alias: string;
	postId: string;
}

export interface ISearchInput {
	term: string;
	limit: number;
}

export interface ISyncSearchInput {
	profiles: IProfile[];
	aliases: string[];
}

export interface IAliasInput {
	username: string;
}

export interface IFriendInput {
	currentUserAlias: string;
	alias: string;
}

export const enum ActionTypes {
	GET_PROFILE_BY_ALIAS = 'data/profiles/GET_PROFILE_BY_ALIAS',
	SYNC_GET_PROFILE_BY_ALIAS = 'data/profiles/SYNC_GET_PROFILE_BY_ALIAS',
	GET_PROFILE_BY_USERNAME = 'app/data/profiles/GET_PROFILE_BY_USERNAME',
	SYNC_GET_PROFILE_BY_USERNAME = 'app/data/profiles/SYNC_GET_PROFILE_BY_USERNAME',
	GET_PROFILES_BY_USERNAMES = 'app/data/profiles/GET_PROFILES_BY_USERNAMES',
	SYNC_GET_PROFILES_BY_USERNAMES = 'app/data/profiles/SYNC_GET_PROFILES_BY_USERNAMES',
	GET_CURRENT_PROFILE = 'app/data/profiles/GET_CURRENT_PROFILE',
	SYNC_GET_CURRENT_PROFILE = 'app/data/profiles/SYNC_GET_CURRENT_PROFILE',
	UPDATE_PROFILE = 'app/data/profiles/UPDATE_PROFILE',
	GET_PROFILES_BY_POSTS = 'app/data/profiles/GET_PROFILES_BY_POSTS',
	SYNC_GET_PROFILES_BY_POSTS = 'app/data/profiles/SYNC_GET_PROFILES_BY_POSTS',
	GET_CURRENT_FRIENDS = 'app/data/profiles/GET_CURRENT_FRIENDS',
	SYNC_GET_CURRENT_FRIENDS = 'app/data/profiles/SYNC_GET_CURRENT_FRIENDS',
	ADD_FRIEND = 'app/data/profiles/ADD_FRIEND',
	REMOVE_FRIEND = 'app/data/profiles/REMOVE_FRIEND',
	ACCEPT_FRIEND = 'app/data/profiles/ACCEPT_FRIEND',
	REJECT_FRIEND = 'app/data/profiles/REJECT_FRIEND',
	CLEAR_FRIEND_RESPONSE = 'app/data/profiles/CLEAR_FRIEND_RESPONSE',
	UNDO_REQUEST = 'app/data/profiles/UNDO_REQUEST',
	SYNC_UNDO_REQUEST = 'app/data/profiles/SYNC_UNDO_REQUEST',
	ADD_POSTS_TO_PROFILE = 'data/profiles/ADD_POSTS_TO_PROFILE',
	REMOVE_POST_FROM_PROFILE = 'data/profiles/REMOVE_POST_FROM_PROFILE',
	SEARCH_FOR_PROFILES = 'data/profiles/SEARCH_FOR_PROFILES',
	SYNC_SEARCH_FOR_PROFILES = 'data/profiles/SYNC_SEARCH_FOR_PROFILES',
}

export interface IGetProfilesByPostsAction extends Action {
	type: ActionTypes.GET_PROFILES_BY_POSTS;
	payload: IPostArrayData;
}

export interface ISyncGetProfilesByPostsAction extends Action {
	type: ActionTypes.SYNC_GET_PROFILES_BY_POSTS;
	payload: IProfile[];
}

export interface IGetProfileByAliasAction extends Action {
	type: ActionTypes.GET_PROFILE_BY_ALIAS;
	payload: string;
}

export interface ISyncGetProfileByAliasAction extends Action {
	type: ActionTypes.SYNC_GET_PROFILE_BY_ALIAS;
	payload: IProfile;
}

export interface IGetCurrentProfileAction extends Action {
	type: ActionTypes.GET_CURRENT_PROFILE;
}

export interface ISyncGetCurrentProfileAction extends Action {
	type: ActionTypes.SYNC_GET_CURRENT_PROFILE;
	payload: IFriendData;
}

export interface IGetCurrentFriendsAction extends Action {
	type: ActionTypes.GET_CURRENT_FRIENDS;
}

export interface ISyncGetCurrentFriendsAction extends Action {
	type: ActionTypes.SYNC_GET_CURRENT_FRIENDS;
	payload: ISyncFriendsInput;
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

export interface IAddPostsToProfileAction extends Action {
	type: ActionTypes.ADD_POSTS_TO_PROFILE;
	payload: IAddPostsToProfileInput;
}

export interface IRemovePostFromProfileAction extends Action {
	type: ActionTypes.REMOVE_POST_FROM_PROFILE;
	payload: IRemovePostFromProfileInput;
}

export interface ISearchForProfilesAction extends Action {
	type: ActionTypes.SEARCH_FOR_PROFILES;
	payload: string[];
}

export interface ISyncSearchForProfilesAction extends Action {
	type: ActionTypes.SYNC_SEARCH_FOR_PROFILES;
	payload: ISyncSearchInput;
}

export interface IUndoRequestAction extends Action {
	type: ActionTypes.UNDO_REQUEST;
	payload: IAliasInput;
}

export interface ISyncUndoRequestAction extends Action {
	type: ActionTypes.SYNC_UNDO_REQUEST;
	payload: IFriendInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}

export type IAction =
	| IResetStoreAction
	| IGetProfileByAliasAction
	| ISyncGetProfileByAliasAction
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
	| IUndoRequestAction
	| ISyncUndoRequestAction
	| IAddPostsToProfileAction
	| IRemovePostFromProfileAction
	| ISearchForProfilesAction
	| ISyncSearchForProfilesAction;
