import { ILikesMetasCallback } from '../../types';

export interface ICommentMetasCallback {
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
	postPath: string;
	commentId: string;
}

export interface ICommentData {
	text: string;
	timestamp: number;
	owner: {
		alias: string;
		pub: string;
	};
}

export interface ICommentDataCallback extends ICommentData {
	commentId: string;
	likes: ILikesMetasCallback | null;
}

export interface ICommentsData {
	[key: string]: ICommentData;
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
