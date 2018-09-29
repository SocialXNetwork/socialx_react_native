import { ICommentMetasCallback } from './repository/comments';
import { IPostMetasCallback } from './repository/posts';

export enum TABLES {
	POSTS = 'posts',
	POST_META_BY_ID = 'postMetaById',
	POST_METAS_BY_USER = 'postMetasByUser',
	COMMENT_META_BY_ID = 'commentMetaById',
	PROFILES = 'profiles',
	NOTIFICATIONS = 'notifications',
}

export enum TABLE_ENUMS {
	PRIVATE = 'private',
	PUBLIC = 'public',
	RECOVER = 'recover',
	FRIENDS = 'friends',
	COMMENTS = 'comments',
	LIKES = 'likes',
}

export interface ILikeData {
	owner: {
		alias: string;
		pub: string;
	};
	timestamp: number;
	likeId: string;
}

export type ILikesArray = ILikeData[];

export interface ILikesMetasCallback {
	[key: string]: {
		owner: {
			alias: string;
			pub: string;
		};
		timestamp: number;
	};
}

export interface IMetasCallback {
	[key: string]:
		| IPostMetasCallback
		| ICommentMetasCallback
		| ILikesMetasCallback;
}

export interface IMetasTypeCallback<T> {
	[key: string]: T;
}

export type IGunDataNode = object | string | boolean | number | null;

export interface IContext {
	account: IGunAccountInstance;
	gun: IGunInstance;
	time: () => Date;
	encrypt: (target: string, salt: string) => Promise<string>;
	work: (pairsalt1: string, pairsalt2: string) => Promise<string>;
	decrypt: (target: string, salt: string) => Promise<string>;
}

export interface IGunSetterCallback {
	'#': string;
	ok: boolean;
	err?: string;
	out?: object;
	user?: IGunAccountInstance;
}

export type IGunCallback<T> = (err: string | null, result?: T) => void;

export interface IGunInstance {
	// core api
	put: (
		data: IGunDataNode,
		callback?: (data: IGunSetterCallback) => void,
	) => IGunInstance;
	get: (path: string) => IGunInstance;
	opt: (opts: object) => IGunInstance;
	back: (amount?: number) => IGunInstance;

	// main api
	on: (callback?: any, options?: object) => IGunInstance;
	once: (callback?: any, options?: object) => IGunInstance;
	set: (
		data: IGunInstance | object,
		callback?: (data: IGunSetterCallback) => void,
	) => void;
	map: (callback?: any) => IGunInstance;

	// extended api
	unset: (node: IGunInstance) => IGunInstance;
	docLoad: <T>(callback: (data: T, key: string) => void) => IGunInstance;
	encrypt: (
		data: IGunInstance | object,
		callback?: (data: IGunSetterCallback) => void,
	) => void;

	// subInstance api
	user: (pub?: string) => IGunAccountInstance;
}

export interface IGunAccountInstance extends IGunInstance {
	// core api

	/**
	 * creates a user
	 * @param username a string containing the username
	 * @param passphrase a string containing the password/passphrase
	 * @return returns a IGunAccountInstance
	 */
	create: (
		username: string,
		passphrase: string,
		callback?: (
			data: { wait?: boolean; err?: string; ok?: number; pub: string },
		) => void,
	) => IGunAccountInstance;

	/**
	 * authenticate the user in
	 * @param username a string containing the username
	 * @param passphrase a string containing the password/passphrase
	 * @param callback a function to be invoked after the user creation
	 * @param opts an optional object containing optional parameters that extends the functions functionality
	 * @return a IGunAccountInstance
	 */
	auth: (
		username: string,
		passphrase: string,
		callback?: (
			data: { wait?: boolean; err?: string; ok?: number; pub: string },
		) => void,
		opts?: { newpass?: string; pin?: string; change?: string },
	) => IGunAccountInstance;

	/**
	 * log the user out
	 * @return a promise to be resolved into a IGunAccountInstance object
	 */
	leave: () => Promise<IGunAccountInstance | Error>;

	/**
	 * remove the actual user
	 * @param username a string containing the username
	 * @param passphrase a string containing the password/passphrase
	 * @return a promise to be resolved into a IGunAccountInstance object
	 */
	delete: (
		username: string,
		passphrase: string,
	) => Promise<IGunAccountInstance>;

	/**
	 * go back
	 * @param back a number indicates how much to return from the current index (optional)
	 * @param opts an object containing properties that extend the functionality of this function
	 */
	recall: (
		back?: number,
		opts?: { hook?: (props: object) => any },
	) => Promise<IGunAccountInstance>;

	/**
	 * this function returns back to the user root document (with user.back(-1)) and internally calls reAuth on the current user
	 * @return a promise to be resolved into a IGunAccountInstance object
	 */
	alive: () => Promise<IGunAccountInstance>;

	/**
	 * trust another user with a specific current user data
	 * example: user.get('private').get('age').trust(bob)
	 * @param user a user IGunInstance object
	 * @return this function returns an extended IGunInstance with extra properties that are useless
	 */
	trust: (user: IGunInstance) => Promise<null>;

	grant: (user: IGunInstance) => Promise<null>;

	/**
	 * this function returns the pair keys (private/public) keys of the current users encryption (rsa)
	 * @return an object containing critical cryptographical keys
	 */
	pair: () => {
		pub: string;
		priv: string;
		epub: string;
		epriv: string;
	};

	/**
	 * an object that contains some sensitive user information that gets filled once the user logged in
	 * internally being used by
	 * anyUser.on('auth', setIsProperty)
	 */
	is: {
		alias: string;
		pub: string;
	};
}
