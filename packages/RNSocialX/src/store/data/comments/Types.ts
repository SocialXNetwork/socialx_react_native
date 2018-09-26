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
	POST_COMMENTS = 'data/comments/POST_COMMENTS',
	COMMENT_LIKES = 'data/comments/COMMENT_LIKES',
	CREATE_COMMENT = 'data/comments/CREATE_COMMENT',
	LIKE_COMMENT = 'data/comments/LIKE_COMMENT',
}

export interface IPostCommentsAction extends Action {
	type: ActionTypes.POST_COMMENTS;
	payload: IPostIdArgument;
}

export interface ICommentLikesAction extends Action {
	type: ActionTypes.COMMENT_LIKES;
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
	| IPostCommentsAction
	| ICommentLikesAction
	| ICreateCommentAction
	| ILikeCommentAction;
