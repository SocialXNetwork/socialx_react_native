import { ICreatePostInput, IMedia, IPostReturnData } from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export interface IPost {
	postId: string;
	postText: string;
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
	likes: {
		ids: string[];
		byId: {
			[alias: string]: number;
		};
	};
	comments: string[];
	media: IMedia[];
	privatePost: boolean;
	location?: string;
	taggedFriends?: Array<{
		fullName: string;
	}>;
}

export type IState = DeepReadonly<{
	all: {
		[postId: string]: IPost;
	};
	global: {
		posts: string[];
		canLoadMore: boolean;
		nextToken?: string;
	};
	friends: {
		posts: string[];
		canLoadMore: boolean;
		nextToken?: string;
	};
}>;

export interface IPostPathInput {
	postPath: string;
}

export interface IPostIdInput {
	postId: string;
}

export interface IPostLikeInput {
	alias: string;
	postId: string;
}

export interface IProfile {
	pub: string;
	email: string;
	avatar: string;
}

export interface ISyncCommentInput {
	commentId: string;
	postId: string;
	error?: boolean;
}

export interface ISyncLoadMoreInput {
	posts: IPostReturnData[];
	nextToken: string;
	canLoadMore: boolean;
}

export const enum ActionTypes {
	GET_POST_BY_PATH = 'data/posts/GET_POST_BY_PATH',
	SYNC_GET_POST_BY_PATH = 'data/posts/SYNC_GET_POST_BY_PATH',
	GET_PUBLIC_POSTS_BY_DATE = 'data/posts/GET_PUBLIC_POSTS_BY_DATE',
	SYNC_GET_PUBLIC_POSTS_BY_DATE = 'data/posts/SYNC_GET_PUBLIC_POSTS_BY_DATE',
	GET_POST_BY_ID = 'data/posts/GET_POST_BY_ID',
	SYNC_GET_POST_BY_ID = 'data/posts/SYNC_GET_POST_BY_ID',
	GET_USER_POSTS = 'data/posts/GET_USER_POSTS',
	SYNC_GET_USER_POSTS = 'data/posts/SYNC_GET_USER_POSTS',
	LOAD_MORE_POSTS = 'data/posts/LOAD_MORE_POSTS',
	SYNC_LOAD_MORE_POSTS = 'data/posts/SYNC_LOAD_MORE_POSTS',
	LOAD_MORE_FRIENDS_POSTS = 'data/posts/LOAD_MORE_FRIENDS_POSTS',
	SYNC_LOAD_MORE_FRIENDS_POSTS = 'data/posts/SYNC_LOAD_MORE_FRIENDS_POSTS',
	CREATE_POST = 'data/posts/CREATE_POST',
	REMOVE_POST = 'data/posts/REMOVE_POST',
	SYNC_REMOVE_POST = 'data/posts/SYNC_REMOVE_POST',
	LIKE_POST = 'data/posts/LIKE_POST',
	LIKE_POST_ERROR = 'data/comments/LIKE_POST_ERROR',
	UNLIKE_POST = 'data/posts/UNLIKE_POST',
	UNLIKE_POST_ERROR = 'data/comments/UNLIKE_POST_ERROR',
	SYNC_ADD_COMMENT = 'data/posts/SYNC_ADD_COMMENT',
	SYNC_REMOVE_COMMENT = 'data/posts/SYNC_REMOVE_COMMENT',
	RESET_POSTS = 'data/posts/RESET_POSTS',
	REFRESH_GLOBAL_POSTS = 'data/posts/REFRESH_GLOBAL_POSTS',
	SYNC_REFRESH_GLOBAL_POSTS = 'data/posts/SYNC_REFRESH_GLOBAL_POSTS',
	REFRESH_FRIENDS_POSTS = 'data/posts/REFRESH_FRIENDS_POSTS',
	SYNC_REFRESH_FRIENDS_POSTS = 'data/posts/SYNC_REFRESH_FRIENDS_POSTS',
}

export interface IRefreshGlobalPostsAction extends Action {
	type: ActionTypes.REFRESH_GLOBAL_POSTS;
}

export interface ISyncRefreshGlobalPostsAction extends Action {
	type: ActionTypes.SYNC_REFRESH_GLOBAL_POSTS;
	payload: ISyncLoadMoreInput;
}

export interface IRefreshFriendsPostsAction extends Action {
	type: ActionTypes.REFRESH_FRIENDS_POSTS;
}

export interface ISyncRefreshFriendsPostsAction extends Action {
	type: ActionTypes.SYNC_REFRESH_FRIENDS_POSTS;
	payload: ISyncLoadMoreInput;
}

export interface IGetPostByPathAction extends Action {
	type: ActionTypes.GET_POST_BY_PATH;
	payload: IPostPathInput;
}

export interface ISyncGetPostByPathAction extends Action {
	type: ActionTypes.SYNC_GET_POST_BY_PATH;
	payload: IPostReturnData;
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
	payload: ISyncLoadMoreInput;
}

export interface ILoadMoreFriendsPostsAction extends Action {
	type: ActionTypes.LOAD_MORE_FRIENDS_POSTS;
}

export interface ISyncLoadMoreFriendsPostsAction extends Action {
	type: ActionTypes.SYNC_LOAD_MORE_FRIENDS_POSTS;
	payload: ISyncLoadMoreInput;
}

export interface IGetUserPostsAction extends Action {
	type: ActionTypes.GET_USER_POSTS;
	payload: string;
}

export interface ISyncGetUserPostsAction extends Action {
	type: ActionTypes.SYNC_GET_USER_POSTS;
	payload: IPostReturnData[];
}

export interface ICreatePostAction extends Action {
	type: ActionTypes.CREATE_POST;
	payload: ICreatePostInput;
}

export interface IRemovePostAction extends Action {
	type: ActionTypes.REMOVE_POST;
	payload: string;
}

export interface ISyncRemovePostAction extends Action {
	type: ActionTypes.SYNC_REMOVE_POST;
	payload: string;
}

export interface ILikePostAction extends Action {
	type: ActionTypes.LIKE_POST;
	payload: IPostLikeInput;
}

export interface ILikePostErrorAction extends Action {
	type: ActionTypes.LIKE_POST_ERROR;
	payload: IPostLikeInput;
}

export interface IUnlikePostAction extends Action {
	type: ActionTypes.UNLIKE_POST;
	payload: IPostLikeInput;
}

export interface IUnlikePostErrorAction extends Action {
	type: ActionTypes.UNLIKE_POST_ERROR;
	payload: IPostLikeInput;
}

export interface ISyncAddCommentAction extends Action {
	type: ActionTypes.SYNC_ADD_COMMENT;
	payload: ISyncCommentInput;
}

export interface ISyncRemoveCommentAction extends Action {
	type: ActionTypes.SYNC_REMOVE_COMMENT;
	payload: ISyncCommentInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IResetStoreAction
	| IRefreshGlobalPostsAction
	| ISyncRefreshGlobalPostsAction
	| IRefreshFriendsPostsAction
	| ISyncRefreshFriendsPostsAction
	// getters
	| IGetPostByPathAction
	| ISyncGetPostByPathAction
	| IGetPostByIdAction
	| ISyncGetPostByIdAction
	| ISyncLoadMorePostsAction
	| ILoadMorePostsAction
	| ISyncLoadMoreFriendsPostsAction
	| ILoadMoreFriendsPostsAction
	| IGetUserPostsAction
	| ISyncGetUserPostsAction
	// setters
	| ICreatePostAction
	| IRemovePostAction
	| ISyncRemovePostAction
	| ILikePostAction
	| ILikePostErrorAction
	| IUnlikePostAction
	| IUnlikePostErrorAction
	| ISyncAddCommentAction
	| ISyncRemoveCommentAction;
