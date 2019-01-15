import { ILikesArray, ILikesMetasCallback } from '../../types';
import { ICommentsArray, ICommentsPostData } from '../comments';

export interface IMediaTypes {
	key: string;
	name: 'Video' | 'Photo';
	category: string;
}

export interface IMedia {
	hash: string;
	type: IMediaTypes;
	extension: string;
	size: number;
	dimensions: {
		width: number;
		height: number;
	};
}

export interface ILoadMorePostsInput {
	nextToken?: string;
	limit: number;
}

export interface IPostMetasCallback {
	owner: {
		alias: string;
		pub: string;
	};
	postPath: string;
	timestamp: number;
	privatePost: boolean;
}

export interface IPostUserMetasCallback {
	[postMetaId: string]: IPostMetasCallback;
}

export interface ICreatePostInput {
	postText: string;
	location?: string;
	taggedFriends?: Array<{ fullName: string }>;
	media?: IMedia[];
	privatePost: boolean;
}

export interface IPostCallbackData extends ICreatePostInput {
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
	likes: ILikesMetasCallback;
	comments: ICommentsPostData;
}

export interface IPostReturnData extends ICreatePostInput {
	postId: string;
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
	likes: ILikesArray;
	comments: ICommentsArray;
	media: IMedia[];
}

export type IPostArrayData = IPostReturnData[];

export interface IPostsCallbackData {
	[postId: string]: IPostCallbackData;
}
export interface IPostsDataCallback {
	[postId: string]: IPostCallbackData;
}

export interface IRemovePostInput {
	postId: string;
}

export interface IUnlikePostInput {
	postId: string;
}

export interface IGetPostByIdInput {
	postId: string;
}
