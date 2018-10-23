import {
	IAcceptFriendInput,
	IAddFriendInput,
	IFindFriendsSuggestionsInput,
	IPostArrayData,
	IProfileData,
	IRemoveFriendInput,
	ISearchProfilesByFullNameInput,
	IUpdateProfileInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

interface IFriendSuggestionData extends IProfileData {
	commonFriends?: number;
}

export type IState = DeepReadonly<{
	profiles: IProfileData[];
	friendsSuggestions?: IFriendSuggestionData[];
}>;

export interface IUsernameInput {
	username: string;
}

export interface ISearchProfilesByFullNameInput {
	term: string;
	maxResults: number;
}

export const enum ActionTypes {
	GET_PROFILE_BY_USERNAME = 'app/data/profiles/GET_PROFILE_BY_USERNAME',
	SYNC_GET_PROFILE_BY_USERNAME = 'app/data/profiles/SYNC_GET_PROFILE_BY_USERNAME',
	SEARCH_PROFILES_BY_FULLNAME = 'app/data/profiles/SEARCH_PROFILES_BY_FULLNAME',
	SYNC_SEARCH_PROFILES_BY_FULLNAME = 'app/data/profiles/SYNC_SEARCH_PROFILES_BY_FULLNAME',
	FIND_FRIENDS_SUGGESTIONS = 'app/data/profiles/FIND_FRIENDS_SUGGESTIONS',
	SYNC_FIND_FRIENDS_SUGGESTIONS = 'app/data/profiles/SYNC_FIND_FRIENDS_SUGGESTIONS',
	GET_CURRENT_PROFILE = 'app/data/profiles/GET_CURRENT_PROFILE',
	SYNC_GET_CURRENT_PROFILE = 'app/data/profiles/SYNC_GET_CURRENT_PROFILE',
	GET_PROFILES_BY_POSTS = 'app/data/profiles/GET_PROFILES_BY_POSTS',
	SYNC_GET_PROFILES_BY_POSTS = 'app/data/profiles/SYNC_GET_PROFILES_BY_POSTS',
	UPDATE_PROFILE = 'app/data/profiles/UPDATE_PROFILE',
	ADD_FRIEND = 'app/data/profiles/ADD_FRIEND',
	REMOVE_FRIEND = 'app/data/profiles/REMOVE_FRIEND',
	ACCEPT_FRIEND = 'app/data/profiles/ACCEPT_FRIEND',
}

export interface IGetProfilesByPostsAction extends Action {
	type: ActionTypes.GET_PROFILES_BY_POSTS;
	payload: IPostArrayData;
}

export interface ISyncGetProfilesByPostsAction extends Action {
	type: ActionTypes.SYNC_GET_PROFILES_BY_POSTS;
	payload: IProfileData[];
}

export interface IGetProfileByUsernameAction extends Action {
	type: ActionTypes.GET_PROFILE_BY_USERNAME;
	payload: IUsernameInput;
}

export interface ISearchProfilesByFullNameAction extends Action {
	type: ActionTypes.SEARCH_PROFILES_BY_FULLNAME;
	payload: ISearchProfilesByFullNameInput;
}

export interface ISyncSearchProfilesByFullNameAction extends Action {
	type: ActionTypes.SYNC_SEARCH_PROFILES_BY_FULLNAME;
	payload: IProfileData[];
}

export interface IFindFriendsSuggestionsAction extends Action {
	type: ActionTypes.FIND_FRIENDS_SUGGESTIONS;
	payload: IFindFriendsSuggestionsInput;
}

export interface ISyncFindFriendsSuggestionsAction extends Action {
	type: ActionTypes.SYNC_FIND_FRIENDS_SUGGESTIONS;
	payload: IProfileData[];
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

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IResetStoreAction
	| IGetProfileByUsernameAction
	| ISyncGetProfileByUsernameAction
	| IGetCurrentProfileAction
	| ISyncGetCurrentProfileAction
	| IFindFriendsSuggestionsAction
	| ISyncFindFriendsSuggestionsAction
	| IUpdateProfileAction
	| IAddFriendAction
	| IRemoveFriendAction
	| IGetProfilesByPostsAction
	| ISyncGetProfilesByPostsAction
	| ISyncSearchProfilesByFullNameAction
	| ISearchProfilesByFullNameAction
	| IAcceptFriendAction;
