import { ILikesArray, ILikesMetasCallback } from '../../types';

export interface ICommentMetasCallback {
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
	postPath: string;
	commentId: string;
}

export interface ICommentCallbackData {
	text: string;
	timestamp: number;
	owner: {
		alias: string;
		pub: string;
	};
	likes: ILikesMetasCallback;
}

export interface ICommentsPostData {
	[commentId: string]: ICommentCallbackData;
}

export type ICommentsArray = ICommentCallbackData[];

export interface ICommentData {
	text: string;
	timestamp: number;
	owner: {
		alias: string;
		pub: string;
	};
	likes: ILikesArray;
}

export interface ICommentsCallbackData {
	[key: string]: ICommentCallbackData;
}

export interface ICreateCommentInput {
	text: string;
	postId: string;
}

export interface IRemoveCommentInput {
	postPath: string;
	commentId: string;
}

export interface IUnlikeCommentInput {
	postPath: string;
	commentId: string;
}
