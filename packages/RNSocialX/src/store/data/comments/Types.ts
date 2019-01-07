import { ICommentsReturnData, IPostArrayData } from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export interface IComment extends ICommentsReturnData {
	posting?: boolean;
}

export interface IComments {
	[commentId: string]: IComment;
}

export type IState = DeepReadonly<{
	comments: IComments;
}>;

export const enum ActionTypes {
	LOAD_COMMENTS = 'data/comments/LOAD_COMMENTS',
	CREATE_COMMENT = 'data/comments/CREATE_COMMENT',
	CREATE_COMMENT_ERROR = 'data/comments/CREATE_COMMENT_ERROR',
	SYNC_CREATE_COMMENT = 'data/comments/SYNC_CREATE_COMMENT',
	REMOVE_COMMENT = 'data/comments/REMOVE_COMMENT',
	SYNC_REMOVE_COMMENT = 'data/comments/SYNC_REMOVE_COMMENT',
	LIKE_COMMENT = 'data/comments/LIKE_COMMENT',
	LIKE_COMMENT_ERROR = 'data/comments/LIKE_COMMENT_ERROR',
	UNLIKE_COMMENT = 'data/comments/UNLIKE_COMMENT',
	UNLIKE_COMMENT_ERROR = 'data/comments/UNLIKE_COMMENT_ERROR',
}

export interface ICreateCommentInput {
	text: string;
	alias: string;
	pub: string;
	postId: string;
}

export interface IReplaceCommentInput {
	previousCommentId: string;
	commentId: string;
}

export interface IRemoveCommentInput {
	commentId: string;
	postId: string;
}

export interface ILikeCommentInput {
	alias: string;
	pub: string;
	commentId: string;
}

export interface ILoadCommentsAction extends Action {
	type: ActionTypes.LOAD_COMMENTS;
	payload: IPostArrayData;
}

export interface ICreateCommentAction extends Action {
	type: ActionTypes.CREATE_COMMENT;
	payload: IComment;
}
export interface ICreateCommentErrorAction extends Action {
	type: ActionTypes.CREATE_COMMENT_ERROR;
	payload: string;
}

export interface ISyncCreateCommentAction extends Action {
	type: ActionTypes.SYNC_CREATE_COMMENT;
	payload: IReplaceCommentInput;
}

export interface IRemoveCommentAction extends Action {
	type: ActionTypes.REMOVE_COMMENT;
	payload: string;
}

export interface ISyncRemoveCommentAction extends Action {
	type: ActionTypes.SYNC_REMOVE_COMMENT;
	payload: string;
}

export interface ILikeCommentAction extends Action {
	type: ActionTypes.LIKE_COMMENT;
	payload: ILikeCommentInput;
}

export interface ILikeCommentErrorAction extends Action {
	type: ActionTypes.LIKE_COMMENT_ERROR;
	payload: ILikeCommentInput;
}

export interface IUnlikeCommentAction extends Action {
	type: ActionTypes.UNLIKE_COMMENT;
	payload: ILikeCommentInput;
}

export interface IUnlikeCommentErrorAction extends Action {
	type: ActionTypes.UNLIKE_COMMENT_ERROR;
	payload: ILikeCommentInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}

export type IAction =
	| IResetStoreAction
	| ILoadCommentsAction
	| ICreateCommentAction
	| ICreateCommentErrorAction
	| ISyncCreateCommentAction
	| IRemoveCommentAction
	| ISyncRemoveCommentAction
	| ILikeCommentAction
	| ILikeCommentErrorAction
	| IUnlikeCommentAction
	| IUnlikeCommentErrorAction;
