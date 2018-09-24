export type GunDataNode = object | string | boolean | number | null;

export enum TABLES {
	POSTS = 'posts',
	POST_META_BY_ID = 'postMetaById',
	POST_METAS_BY_USER = 'postMetasByUser',
	COMMENTS = 'comments',
	COMMENT_META_BY_ID = 'commentMetaById',
	LIKES = 'likes',
	PROFILES = 'profiles',
}

export enum TABLE_ENUMS {
	PRIVATE = 'private',
	PUBLIC = 'public',
	RECOVER = 'recover',
}

export interface IPostMetasCallback {
	postPath: string;
	privatePost: boolean;
	owner: string;
}

export interface ICommentMetasCallback {
	owner: string;
	timestamp: number;
	postPath: string;
}

export interface ILikesMetasCallback {
	[key: string]: {
		owner: string;
		timestamp: number;
	};
}

export interface IMetasCallback {
	[key: string]: IPostMetasCallback | ICommentMetasCallback | ILikesMetasCallback;
}

export interface IContext {
	account: GunAccountInstance;
	gun: GunInstance;
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
	user?: GunAccountInstance;
}

export type IGunCallback<T> = (err: string | null, result?: T) => void;

export interface GunInstance {
	// core api
	put: (data: GunDataNode, callback?: (data: IGunSetterCallback) => void) => GunInstance;
	get: (path: string) => GunInstance;
	opt: (opts: object) => GunInstance;
	back: (amount?: number) => GunInstance;

	// main api
	on: (callback?: any, options?: object) => GunInstance;
	once: (callback?: any, options?: object) => GunInstance;
	set: (data: GunInstance | object, callback?: (data: IGunSetterCallback) => void) => void;
	map: (callback?: any) => GunInstance;

	// extended api
	unset: (node: GunInstance) => GunInstance;
	docLoad: <T>(callback: (data: T, key: string) => void) => GunInstance;
	encrypt: (data: GunInstance | object, callback?: (data: IGunSetterCallback) => void) => void;

	// subInstance api
	user: (pub?: string) => GunAccountInstance;
}

export interface GunAccountInstance extends GunInstance {
	// core api

	/**
	 * creates a user
	 * @param username a string containing the username
	 * @param passphrase a string containing the password/passphrase
	 * @return returns a GunAccountInstance
	 */
	create: (
		username: string,
		passphrase: string,
		callback?: (data: {wait?: boolean; err?: string; ok?: number; pub: string}) => void,
	) => GunAccountInstance;

	/**
	 * authenticate the user in
	 * @param username a string containing the username
	 * @param passphrase a string containing the password/passphrase
	 * @param callback a function to be invoked after the user creation
	 * @param opts an optional object containing optional parameters that extends the functions functionality
	 * @return a GunAccountInstance
	 */
	auth: (
		username: string,
		passphrase: string,
		callback?: (data: {wait?: boolean; err?: string; ok?: number; pub: string}) => void,
		opts?: {newpass?: string; pin?: string; change?: string},
	) => GunAccountInstance;

	/**
	 * log the user out
	 * @return a promise to be resolved into a GunAccountInstance object
	 */
	leave: () => Promise<GunAccountInstance | Error>;

	/**
	 * remove the actual user
	 * @param username a string containing the username
	 * @param passphrase a string containing the password/passphrase
	 * @return a promise to be resolved into a GunAccountInstance object
	 */
	delete: (username: string, passphrase: string) => Promise<GunAccountInstance>;

	/**
	 * go back
	 * @param back a number indicates how much to return from the current index (optional)
	 * @param opts an object containing properties that extend the functionality of this function
	 */
	recall: (back?: number, opts?: {hook?: (props: object) => any}) => Promise<GunAccountInstance>;

	/**
	 * this function returns back to the user root document (with user.back(-1)) and internally calls reAuth on the current user
	 * @return a promise to be resolved into a GunAccountInstance object
	 */
	alive: () => Promise<GunAccountInstance>;

	/**
	 * trust another user with a specific current user data
	 * example: user.get('private').get('age').trust(bob)
	 * @param user a user GunInstance object
	 * @return this function returns an extended GunInstance with extra properties that are useless
	 */
	trust: (user: GunInstance) => Promise<null>;

	grant: (user: GunInstance) => Promise<null>;

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
