export interface ICommentMetasCallback {
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
	postPath: string;
	commentId: string;
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
