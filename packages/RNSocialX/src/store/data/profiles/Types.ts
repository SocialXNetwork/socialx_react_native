import { IFriendData, IPostArrayData, IUpdateProfileInput } from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export interface IProfile extends IFriendData {
	searched?: boolean;
}

export interface IProfiles {
	[alias: string]: IProfile;
}

export interface IFriends {
	[alias: string]: string[];
}

export type IState = DeepReadonly<{
	profiles: IProfiles;
	friends: IFriends;
	search: {
		results: string[];
		previousTerms: {
			[term: string]: boolean;
		};
	};
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

export interface ISearchWithAliasInput {
	term: string;
	alias: string;
}

export interface ISearchWithProfilesInput {
	term: string;
	profiles: IProfile[];
}

export interface IAliasInput {
	username: string;
}

export interface IFriendInput {
	currentUserAlias: string;
	alias: string;
}

export interface IUpdateProfileInput {
	description: string;
	fullName: string;
	email: string;
	miningEnabled: boolean;
	shareDataEnabled: boolean;
	avatar: string;
}

export const enum ActionTypes {
	GET_PROFILE_BY_ALIAS = 'data/profiles/GET_PROFILE_BY_ALIAS',
	SYNC_GET_PROFILE_BY_ALIAS = 'data/profiles/SYNC_GET_PROFILE_BY_ALIAS',
	GET_PROFILE_BY_USERNAME = 'data/profiles/GET_PROFILE_BY_USERNAME',
	SYNC_GET_PROFILE_BY_USERNAME = 'data/profiles/SYNC_GET_PROFILE_BY_USERNAME',
	GET_PROFILES_BY_USERNAMES = 'data/profiles/GET_PROFILES_BY_USERNAMES',
	SYNC_GET_PROFILES_BY_USERNAMES = 'data/profiles/SYNC_GET_PROFILES_BY_USERNAMES',
	GET_CURRENT_PROFILE = 'data/profiles/GET_CURRENT_PROFILE',
	SYNC_GET_CURRENT_PROFILE = 'data/profiles/SYNC_GET_CURRENT_PROFILE',
	UPDATE_PROFILE = 'data/profiles/UPDATE_PROFILE',
	GET_PROFILES_BY_POSTS = 'data/profiles/GET_PROFILES_BY_POSTS',
	SYNC_GET_PROFILES_BY_POSTS = 'data/profiles/SYNC_GET_PROFILES_BY_POSTS',
	GET_CURRENT_FRIENDS = 'data/profiles/GET_CURRENT_FRIENDS',
	SYNC_GET_CURRENT_FRIENDS = 'data/profiles/SYNC_GET_CURRENT_FRIENDS',
	ADD_FRIEND = 'data/profiles/ADD_FRIEND',
	SYNC_ADD_FRIEND = 'data/profiles/SYNC_ADD_FRIEND',
	REMOVE_FRIEND = 'data/profiles/REMOVE_FRIEND',
	SYNC_REMOVE_FRIEND = 'data/profiles/SYNC_REMOVE_FRIEND',
	ACCEPT_FRIEND = 'data/profiles/ACCEPT_FRIEND',
	SYNC_ACCEPT_FRIEND = 'data/profiles/SYNC_ACCEPT_FRIEND',
	REJECT_FRIEND = 'data/profiles/REJECT_FRIEND',
	SYNC_REJECT_FRIEND = 'data/profiles/SYNC_REJECT_FRIEND',
	CLEAR_FRIEND_RESPONSE = 'data/profiles/CLEAR_FRIEND_RESPONSE',
	UNDO_REQUEST = 'data/profiles/UNDO_REQUEST',
	SYNC_UNDO_REQUEST = 'data/profiles/SYNC_UNDO_REQUEST',
	ADD_POSTS_TO_PROFILE = 'data/profiles/ADD_POSTS_TO_PROFILE',
	REMOVE_POST_FROM_PROFILE = 'data/profiles/REMOVE_POST_FROM_PROFILE',
	SEARCH_FOR_PROFILES = 'data/profiles/SEARCH_FOR_PROFILES',
	SYNC_SEARCH_FOR_PROFILES = 'data/profiles/SYNC_SEARCH_FOR_PROFILES',
	SEARCH_FOR_PROFILES_LOCALLY = 'data/profiles/SEARCH_FOR_PROFILES_LOCALLY',
	CLEAR_SEARCH_RESULTS = 'data/profiles/CLEAR_SEARCH_RESULTS',
	SYNC_EXTERNAL_PROFILES = '/data/profiles/SYNC_EXTERNAL_PROFILES',
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
}

export interface ISyncAddFriendAction extends Action {
	type: ActionTypes.SYNC_ADD_FRIEND;
	payload: IFriendInput;
}

export interface IUndoRequestAction extends Action {
	type: ActionTypes.UNDO_REQUEST;
}

export interface ISyncUndoRequestAction extends Action {
	type: ActionTypes.SYNC_UNDO_REQUEST;
	payload: IFriendInput;
}

export interface IRemoveFriendAction extends Action {
	type: ActionTypes.REMOVE_FRIEND;
}

export interface ISyncRemoveFriendAction extends Action {
	type: ActionTypes.SYNC_REMOVE_FRIEND;
	payload: IFriendInput;
}

export interface IAcceptFriendAction extends Action {
	type: ActionTypes.ACCEPT_FRIEND;
}

export interface ISyncAcceptFriendAction extends Action {
	type: ActionTypes.SYNC_ACCEPT_FRIEND;
	payload: IFriendInput;
}

export interface IRejectFriendAction extends Action {
	type: ActionTypes.REJECT_FRIEND;
}

export interface ISyncRejectFriendAction extends Action {
	type: ActionTypes.SYNC_REJECT_FRIEND;
	payload: string;
}

export interface IClearFriendResponseAction extends Action {
	type: ActionTypes.CLEAR_FRIEND_RESPONSE;
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
}

export interface ISyncSearchForProfilesAction extends Action {
	type: ActionTypes.SYNC_SEARCH_FOR_PROFILES;
	payload: ISearchWithProfilesInput;
}

export interface ISearchForProfilesLocallyAction extends Action {
	type: ActionTypes.SEARCH_FOR_PROFILES_LOCALLY;
	payload: ISearchWithAliasInput;
}

export interface IClearSearchResultsAction extends Action {
	type: ActionTypes.CLEAR_SEARCH_RESULTS;
}

export interface ISyncExternalProfilesAction extends Action {
	type: ActionTypes.SYNC_EXTERNAL_PROFILES;
	payload: IProfile[];
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
	| IGetProfilesByPostsAction
	| ISyncGetProfilesByPostsAction
	| IUpdateProfileAction
	| IAddFriendAction
	| ISyncAddFriendAction
	| IRemoveFriendAction
	| ISyncRemoveFriendAction
	| IAcceptFriendAction
	| ISyncAcceptFriendAction
	| IRejectFriendAction
	| ISyncRejectFriendAction
	| IClearFriendResponseAction
	| IUndoRequestAction
	| ISyncUndoRequestAction
	| IAddPostsToProfileAction
	| IRemovePostFromProfileAction
	| ISearchForProfilesAction
	| ISyncSearchForProfilesAction
	| ISearchForProfilesLocallyAction
	| IClearSearchResultsAction
	| ISyncExternalProfilesAction;
