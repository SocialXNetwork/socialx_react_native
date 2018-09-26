import { ICommentMetasCallback, ILikesMetasCallback } from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types';

export interface ICommentData {
	id: string;
	text: string;
	owner: string;
	likes: ILikesMetasCallback[];
}

export type IState = DeepReadonly<{
	comments: ICommentData[];
	commentMetaById: ICommentMetasCallback[];
}>;

export interface IPostIdArgument {
	postId: string;
}

export interface ICommentIdArgument {
	commentId: string;
}

export interface ICreateCommentInput {
	text: string;
	postId: string;
}

export const enum ActionTypes {
	GET_POST_COMMENTS = 'data/comments/GET_POST_COMMENTS',
	GET_COMMENT_LIKES = 'data/comments/GET_COMMENT_LIKES',
	CREATE_COMMENT = 'data/comments/CREATE_COMMENT',
	LIKE_COMMENT = 'data/comments/LIKE_COMMENT',
}

export interface IGetPostCommentsAction extends Action {
	type: ActionTypes.GET_POST_COMMENTS;
	payload: IPostIdArgument;
}

export interface IGetCommentLikesAction extends Action {
	type: ActionTypes.GET_COMMENT_LIKES;
	payload: ICommentIdArgument;
}

export interface ICreateCommentAction extends Action {
	type: ActionTypes.CREATE_COMMENT;
	payload: ICreateCommentInput;
}

export interface ILikeCommentAction extends Action {
	type: ActionTypes.LIKE_COMMENT;
	payload: ICommentIdArgument;
}

export type IAction =
	| IGetPostCommentsAction
	| IGetCommentLikesAction
	| ICreateCommentAction
	| ILikeCommentAction;
