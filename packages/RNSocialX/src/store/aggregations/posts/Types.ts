import { IPostReturnData } from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export type IState = DeepReadonly<{
	userPosts: {
		[alias: string]: IPostReturnData[];
	};
}>;

export interface IGetUserPostsInput {
	username: string;
}

export interface IUpdateUserPosts {
	username: string;
	postId: string;
	post?: IPostReturnData;
}

export const enum ActionTypes {
	GET_USER_POSTS = 'app/data/profiles/GET_USER_POSTS',
	SYNC_GET_USER_POSTS = 'app/data/profiles/SYNC_GET_USER_POSTS',
	UPDATE_USER_POSTS = 'app/data/profiles/UPDATE_USER_POSTS',
}

export interface IGetUserPostsAction extends Action {
	type: ActionTypes.GET_USER_POSTS;
	payload: IGetUserPostsInput;
}

export interface ISyncGetUserPostsAction extends Action {
	type: ActionTypes.SYNC_GET_USER_POSTS;
	payload: {
		posts: IPostReturnData[];
		owner: string;
	};
}

export interface IGetUserPostsAction extends Action {
	type: ActionTypes.GET_USER_POSTS;
	payload: IGetUserPostsInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}

export type IAction =
	| IResetStoreAction
	| IGetUserPostsAction
	| ISyncGetUserPostsAction;
