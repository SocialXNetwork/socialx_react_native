export interface IMediaTypes {
	key: string;
	name: 'Video' | 'Photo';
	category: string;
}

export interface IMedia {
	hash: string;
	optimized_hash: string;
	type: IMediaTypes;
	extension: string;
	size: number;
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

export interface ICreatePostInput {
	postText: string;
	location?: string;
	taggedFriends?: Array<{ fullName: string }>;
	media?: IMedia;
	governanceVersion: boolean;
	privatePost: boolean;
}

export interface IPostData extends ICreatePostInput {
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
}

export interface IDeletePostInput {
	postPath: string;
	postMetaId: string;
}

export interface IUnlikePostInput {
	postPath: string;
}
