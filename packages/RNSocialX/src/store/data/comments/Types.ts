import {
	ICommentMetasCallback,
	ILikesMetasCallback,
	IRemoveCommentInput,
	IUnlikeCommentInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types';

export interface ICommentData {
	id: string;
	text: string;
	owner: string;
	likes: ILikesMetasCallback[];
}

export type IState = DeepReadonly<{
	comments: ICommentData[] | null;
	commentMetaById: {
		[commentId: string]: ICommentMetasCallback;
	} | null;
}>;

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

export const enum ActionTypes {
	GET_POST_COMMENTS = 'data/comments/GET_POST_COMMENTS',
	GET_COMMENT_LIKES = 'data/comments/GET_COMMENT_LIKES',
	CREATE_COMMENT = 'data/comments/CREATE_COMMENT',
	LIKE_COMMENT = 'data/comments/LIKE_COMMENT',
	REMOVE_COMMENT = 'data/comments/REMOVE_COMMENT',
	UNLIKE_COMMENT = 'data/comments/UNLIKE_COMMENT',
}

export interface IGetPostCommentsAction extends Action {
	type: ActionTypes.GET_POST_COMMENTS;
	payload: IPostIdInput;
}

export interface IGetCommentLikesAction extends Action {
	type: ActionTypes.GET_COMMENT_LIKES;
	payload: ICommentIdInput;
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

export type IAction =
	| IGetPostCommentsAction
	| IGetCommentLikesAction
	| ICreateCommentAction
	| ILikeCommentAction
	| IRemoveCommentAction
	| IUnlikeCommentAction;
