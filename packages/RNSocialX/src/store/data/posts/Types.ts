import {
	ICreatePostInput,
	IPostArrayData,
	IPostReturnData,
	IRemoveCommentInput,
	IRemovePostInput,
	IUnlikeCommentInput,
	IUnlikePostInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';
import { ISetAuthAction } from '../../auth/gun/Types';

export type IState = DeepReadonly<{
	posts: IPostArrayData;
}>;

export interface IUsernameInput {
	username: string;
}

export interface IPostPathInput {
	postPath: string;
}

export interface IDateInput {
	date: Date;
}

export interface IPostIdInput {
	postId: string;
}

export interface IProfile {
	pub: string;
	email: string;
	avatar: string;
}

export const enum ActionTypes {
	GET_POSTS_BY_USER = 'data/posts/GET_POST_PATHS_BY_USER',
	SYNC_GET_POSTS_BY_USER = 'data/posts/SYNC_GET_POST_PATHS_BY_USER',
	GET_POST_BY_PATH = 'data/posts/GET_POST_BY_PATH',
	SYNC_GET_POST_BY_PATH = 'data/posts/SYNC_GET_POST_BY_PATH',
	GET_PUBLIC_POSTS_BY_DATE = 'data/posts/GET_PUBLIC_POSTS_BY_DATE',
	SYNC_GET_PUBLIC_POSTS_BY_DATE = 'data/posts/SYNC_GET_PUBLIC_POSTS_BY_DATE',
	GET_POST_BY_ID = 'data/posts/GET_POST_BY_ID',
	SYNC_GET_POST_BY_ID = 'data/posts/SYNC_GET_POST_BY_ID',
	LOAD_MORE_POSTS = 'data/posts/LOAD_MORE_POSTS',
	SYNC_LOAD_MORE_POSTS = 'data/posts/SYNC_LOAD_MORE_POSTS',
	CREATE_POST = 'data/posts/CREATE_POST',
	LIKE_POST = 'data/posts/LIKE_POST',
	REMOVE_POST = 'data/posts/REMOVE_POST',
	UNLIKE_POST = 'data/posts/UNLIKE_POST',
	RESET_POSTS = 'data/posts/RESET_POSTS',
	// <================= comments =================>
	CREATE_COMMENT = 'data/posts/CREATE_COMMENT',
	LIKE_COMMENT = 'data/posts/LIKE_COMMENT',
	REMOVE_COMMENT = 'data/posts/REMOVE_COMMENT',
	UNLIKE_COMMENT = 'data/posts/UNLIKE_COMMENT',
}

export interface IResetPostsAction extends Action {
	type: ActionTypes.RESET_POSTS;
}

export interface IGetPostsByUsernameAction extends Action {
	type: ActionTypes.GET_POSTS_BY_USER;
	payload: IUsernameInput;
}

export interface ISyncGetPostsByUserAction extends Action {
	type: ActionTypes.SYNC_GET_POSTS_BY_USER;
	payload: IPostArrayData;
}

export interface IGetPostByPathAction extends Action {
	type: ActionTypes.GET_POST_BY_PATH;
	payload: IPostPathInput;
}

export interface ISyncGetPostByPathAction extends Action {
	type: ActionTypes.SYNC_GET_POST_BY_PATH;
	payload: IPostReturnData;
}

export interface IGetPublicPostsByDateAction extends Action {
	type: ActionTypes.GET_PUBLIC_POSTS_BY_DATE;
	payload: IDateInput;
}

export interface ISyncGetPublicPostsByDateAction extends Action {
	type: ActionTypes.SYNC_GET_PUBLIC_POSTS_BY_DATE;
	payload: IPostArrayData;
}

export interface IGetPostByIdAction extends Action {
	type: ActionTypes.GET_POST_BY_ID;
	payload: IPostIdInput;
}

export interface ISyncGetPostByIdAction extends Action {
	type: ActionTypes.SYNC_GET_POST_BY_ID;
	payload: IPostReturnData;
}

export interface ILoadMorePostsAction extends Action {
	type: ActionTypes.LOAD_MORE_POSTS;
}

export interface ISyncLoadMorePostsAction extends Action {
	type: ActionTypes.SYNC_LOAD_MORE_POSTS;
	payload: IPostArrayData;
}

export interface ICreatePostAction extends Action {
	type: ActionTypes.CREATE_POST;
	payload: ICreatePostInput;
}

export interface ILikePostAction extends Action {
	type: ActionTypes.LIKE_POST;
	payload: IPostIdInput;
}

export interface IRemovePostAction extends Action {
	type: ActionTypes.REMOVE_POST;
	payload: IRemovePostInput;
}

export interface IUnlikePostAction extends Action {
	type: ActionTypes.UNLIKE_POST;
	payload: IUnlikePostInput;
}

// <================ comments ================>
export interface IPostIdInput {
	postId: string;
}

export interface ICommentIdInput {
	commentId: string;
}

export interface ICreateCommentInput {
	text: string;
	postId: string;
}

export interface ICreateCommentAction extends Action {
	type: ActionTypes.CREATE_COMMENT;
	payload: ICreateCommentInput;
}

export interface ILikeCommentAction extends Action {
	type: ActionTypes.LIKE_COMMENT;
	payload: ICommentIdInput;
}

export interface IRemoveCommentAction extends Action {
	type: ActionTypes.REMOVE_COMMENT;
	payload: IRemoveCommentInput;
}

export interface IUnlikeCommentAction extends Action {
	type: ActionTypes.UNLIKE_COMMENT;
	payload: IUnlikeCommentInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IResetStoreAction
	| IResetPostsAction
	// getters
	| IGetPostsByUsernameAction
	| ISyncGetPostsByUserAction
	| IGetPublicPostsByDateAction
	| ISyncGetPublicPostsByDateAction
	| IGetPostByPathAction
	| ISyncGetPostByPathAction
	| IGetPostByIdAction
	| ISyncGetPostByIdAction
	| ISyncLoadMorePostsAction
	| ILoadMorePostsAction
	// setters
	| ICreatePostAction
	| ILikePostAction
	| IRemovePostAction
	| IUnlikePostAction
	| ICreateCommentAction
	| ILikeCommentAction
	| IRemoveCommentAction
	| IUnlikeCommentAction;
