import {ICommentMetasCallback} from '@socialx/api-data';
import {Action} from 'redux';
import {DeepReadonly} from 'utility-types';

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

// export interface ICommentData {
// 	id: string;
// 	text: string;
// 	owner: string;
// }

export type IState = DeepReadonly<{
	// they both are almost the same thing?
	bestComments: ICommentMetasCallback[] | null;
	currentPostComments: ICommentMetasCallback[] | null;
}>;

export const enum ActionTypes {
	POST_COMMENTS = 'app/data/POST_COMMENTS',
	COMMENT_LIKES = 'app/data/COMMENT_LIKES',
	CREATE_COMMENT = 'app/data/CREATE_COMMENT',
	LIKE_COMMENT = 'app/data/LIKE_COMMENT',
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

export type IAction = IPostCommentsAction | ICommentLikesAction | ICreateCommentAction | ILikeCommentAction;
