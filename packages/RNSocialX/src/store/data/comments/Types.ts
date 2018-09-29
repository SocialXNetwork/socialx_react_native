import {
	ICommentData,
	ICommentMetasCallback,
	ILikeData,
	ILikesMetasCallback,
	IRemoveCommentInput,
	IUnlikeCommentInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export interface ICommentsApiData extends ICommentData {
	likes: ILikesMetasCallback;
	commentId: string;
}

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
	CREATE_COMMENT = 'data/comments/CREATE_COMMENT',
	LIKE_COMMENT = 'data/comments/LIKE_COMMENT',
	REMOVE_COMMENT = 'data/comments/REMOVE_COMMENT',
	UNLIKE_COMMENT = 'data/comments/UNLIKE_COMMENT',
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
	| ICreateCommentAction
	| ILikeCommentAction
	| IRemoveCommentAction
	| IUnlikeCommentAction;
