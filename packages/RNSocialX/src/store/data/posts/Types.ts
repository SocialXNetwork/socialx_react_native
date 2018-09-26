import { Action } from 'redux';
import { DeepReadonly } from 'utility-types';

export interface IPostData {
	title: string;
	text?: string;
	location?: string;
	image_hash?: string;
	optimized_image_hash?: string;
	privatePost: boolean;
}

export type IState = DeepReadonly<{
	posts: IPostData[];
	postMetaById: IPostData[];
	postMetasByUser: IPostData[];
}>;

export interface IUsernameArgument {
	username: string;
}

export interface IPostPathArgument {
	postPath: string;
}

export interface IDateArgument {
	date: Date;
}

export interface IPostIdArgument {
	postId: string;
}

export interface IProfile {
	pub: string;
	email: string;
	avatar: string;
}

export const enum ActionTypes {
	GET_POST_PATHS_BY_USER = 'data/posts/GET_POST_PATHS_BY_USER',
	GET_POST_BY_PATH = 'data/posts/GET_POST_BY_PATH',
	GET_PUBLIC_POSTS_BY_DATE = 'data/posts/GET_PUBLIC_POSTS_BY_DATE',
	GET_POST_LIKES = 'data/posts/GET_POST_LIKES',
	CREATE_POST = 'data/posts/CREATE_POST',
	LIKE_POST = 'data/posts/LIKE_POST',
}

export interface IGetPostPathsByUserAction extends Action {
	type: ActionTypes.GET_POST_PATHS_BY_USER;
	payload: IUsernameArgument;
}

export interface IGetPostByPathAction extends Action {
	type: ActionTypes.GET_POST_BY_PATH;
	payload: IPostPathArgument;
}

export interface IGetPublicPostsByDateAction extends Action {
	type: ActionTypes.GET_PUBLIC_POSTS_BY_DATE;
	payload: IDateArgument;
}

export interface IGetPostLikesAction extends Action {
	type: ActionTypes.GET_POST_LIKES;
	payload: IPostIdArgument;
}

export interface ICreatePostAction extends Action {
	type: ActionTypes.CREATE_POST;
	payload: IPostData;
}

export interface ILikePostAction extends Action {
	type: ActionTypes.LIKE_POST;
	payload: IPostIdArgument;
}

export type IAction =
	| IGetPostPathsByUserAction
	| IGetPublicPostsByDateAction
	| IGetPostLikesAction
	| ICreatePostAction
	| ILikePostAction
	| IGetPostByPathAction;
