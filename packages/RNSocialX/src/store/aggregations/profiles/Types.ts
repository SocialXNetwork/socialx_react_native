import {
	IFindFriendsSuggestionsInput,
	IPostArrayData,
	IProfileData,
	ISearchProfilesByFullNameInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export interface IFriendSuggestionData extends IProfileData {
	commonFriends: number;
}

export type IState = DeepReadonly<{
	friendsSuggestions: IFriendSuggestionData[];
	searchResults: IProfileData[];
}>;

export interface ISearchProfilesByFullNameInput {
	term: string;
	maxResults: number;
}

export const enum ActionTypes {
	SEARCH_PROFILES_BY_FULLNAME = 'app/data/profiles/SEARCH_PROFILES_BY_FULLNAME',
	SYNC_SEARCH_PROFILES_BY_FULLNAME = 'app/data/profiles/SYNC_SEARCH_PROFILES_BY_FULLNAME',
	FIND_FRIENDS_SUGGESTIONS = 'app/data/profiles/FIND_FRIENDS_SUGGESTIONS',
	SYNC_FIND_FRIENDS_SUGGESTIONS = 'app/data/profiles/SYNC_FIND_FRIENDS_SUGGESTIONS',
	RESET_SEARCH_PROFILES_BY_FULLNAME = 'app/data/profiles/RESET_SEARCH_PROFILES_BY_FULLNAME',
	SYNC_RESET_SEARCH_PROFILES_BY_FULLNAME = 'app/data/profiles/SYNC_RESET_SEARCH_PROFILES_BY_FULLNAME',
	RESET_FIND_FRIENDS_SUGGESTIONS = 'app/data/profiles/RESET_FIND_FRIENDS_SUGGESTIONS',
	SYNC_RESET_FIND_FRIENDS_SUGGESTIONS = 'app/data/profiles/SYNC_RESET_FIND_FRIENDS_SUGGESTIONS',
}

export interface IResetSearchProfilesByFullNameAction extends Action {
	type: ActionTypes.RESET_SEARCH_PROFILES_BY_FULLNAME;
}

export interface ISyncResetSearchProfilesByFullNameAction extends Action {
	type: ActionTypes.SYNC_RESET_SEARCH_PROFILES_BY_FULLNAME;
}

export interface IResetFriendsSuggestionsAction extends Action {
	type: ActionTypes.RESET_FIND_FRIENDS_SUGGESTIONS;
}

export interface ISyncResetFindFriendsSuggestionsAction extends Action {
	type: ActionTypes.SYNC_RESET_FIND_FRIENDS_SUGGESTIONS;
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
	payload: IFriendSuggestionData[];
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IResetSearchProfilesByFullNameAction
	| ISyncSearchProfilesByFullNameAction
	| IResetFindFriendsSuggestionsAction
	| ISyncResetFindFriendsSuggestionsAction
	| IResetStoreAction
	| IFindFriendsSuggestionsAction
	| ISyncFindFriendsSuggestionsAction
	| ISyncSearchProfilesByFullNameAction
	| ISearchProfilesByFullNameAction;
