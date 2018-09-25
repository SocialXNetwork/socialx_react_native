import {Action} from 'redux';
import {DeepReadonly} from 'utility-types';

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

export interface IPostData {
	title: string;
	text?: string;
	location?: string;
	image_hash?: string;
	optimized_image_hash?: string;
	privatePost: boolean;
}

export interface IProfile {
	pub: string;
	email: string;
	avatar: string;
}

export type IState = DeepReadonly<{
	publicPosts: IPostData[] | null;
	privatePosts: IPostData[] | null;
	currentAccountPosts: IPostData[] | null;
}>;

export const enum ActionTypes {
	POST_PATHS_BY_USER = 'app/data/posts/POST_PATHS_BY_USER',
	POST_BY_PATH = 'app/data/posts/POST_BY_PATH',
	PUBLIC_POSTS_BY_DATE = 'app/data/posts/PUBLIC_POSTS_BY_DATE',
	POST_LIKES = 'app/data/posts/POST_LIKES',
	CREATE_POST = 'app/data/posts/CREATE_POST',
	LIKE_POST = 'app/data/posts/LIKE_POST',
}

export interface IPostPathsByUserAction extends Action {
	type: ActionTypes.POST_PATHS_BY_USER;
	payload: IUsernameArgument;
}

export interface IPostByPathAction extends Action {
	type: ActionTypes.POST_BY_PATH;
	payload: IPostPathArgument;
}

export interface IPublicPostsByDateAction extends Action {
	type: ActionTypes.PUBLIC_POSTS_BY_DATE;
	payload: IDateArgument;
}

export interface IPostLikesAction extends Action {
	type: ActionTypes.POST_LIKES;
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
	| IPostPathsByUserAction
	| IPublicPostsByDateAction
	| IPostLikesAction
	| ICreatePostAction
	| ILikePostAction
	| IPostByPathAction;
