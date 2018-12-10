// tslint:disable
import Gun from 'gun/gun';

import 'gun/nts';
import './extensions/sea';

import 'gun/lib/path';
import 'gun/lib/open';


import './extensions/docload';
import './extensions/docsubscribe';
import './extensions/find';
import './extensions/logout';

import './extensions/encrypt';

import './extensions/erase';

import { api as accountsApi } from './repository/accounts';
import { api as commentsApi } from './repository/comments';
import { api as notificationsApi } from './repository/notifications';
import { api as postsApi } from './repository/posts';
import { api as profilesApi } from './repository/profiles';
import { hooks as reactiveHooks } from './repository/reactive';

import { IContext, IGunInstance, TABLES } from './types';

// this should be extracted to its own library in order to make this
// more easily testable and also importable into the server for api reuse
import adapter from './extensions/asyncStorageAdapter';

Gun.on('create', function(db: any) {
	// @ts-ignore
	this.to.next(db);
	// Allows other plugins to respond concurrently.
	const pluginInterop = function(middleware: any) {
		return function(request: any) {
			// @ts-ignore
			this.to.next(request);
			return middleware(request, db);
		};
	}

	// Register the adapter
	db.on('get', pluginInterop(adapter.read));
	db.on('put', pluginInterop(adapter.write));
});

export interface IApiOptions {
	peers: string[];
	rootdb: string;
}

export const dataApiFactory = (config: IApiOptions) => {
	const { peers, rootdb } = config;

	const time = () => new Date(Gun.state());

	const rootGun: IGunInstance = new Gun({
		peers,
	});

	const gun = rootGun.get(rootdb);

	let account = rootGun.user();

	const { encrypt, decrypt, work } = Gun.SEA;

	// testing purposes
	// @ts-ignore
	window.gun = gun;
	// @ts-ignore
	window.user = account;
	
	const context: IContext = {
		account,
		decrypt,
		encrypt,
		gun,
		time,
		work,
		config
	};
	
	const accounts = accountsApi(context);
	const comments = commentsApi(context);
	const notifications = notificationsApi(context);
	const posts = postsApi(context);
	const profiles = profilesApi(context);
	const hooks = reactiveHooks(context);
	
	const resetDatabase = adapter.reset;
	
	// testing purposes
	// @ts-ignore
	window.accounts = accounts;
	// @ts-ignore
	window.comments = comments;
	// @ts-ignore
	window.notifications = notifications;
	// @ts-ignore
	window.posts = posts;
	// @ts-ignore
	window.profiles = profiles;

	return {
		accounts,
		comments,
		notifications,
		posts,
		profiles,
		hooks,
		resetDatabase,
	};
};

export type IDataApiFactory = ReturnType<typeof dataApiFactory>;
