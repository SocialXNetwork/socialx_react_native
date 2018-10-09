import Gun from 'gun/gun';

import 'gun/lib/path';

import 'gun/nts';
import 'gun/sea';

import './extensions/docload';

import './extensions/encrypt';

import './extensions/erase';

import { api as accountsApi } from './repository/accounts';
import { api as commentsApi } from './repository/comments';
import { api as notificationsApi } from './repository/notifications';
import { api as postsApi } from './repository/posts';
import { api as profilesApi } from './repository/profiles';

import { IContext, IGunInstance } from './types';

// this should be extracted to its own library in order to make this
// more easily testable and also importable into the server for api reuse
import adapter from './extensions/asyncStorageAdapter';

Gun.on('opt', (context: any) => {
	// Allows other plugins to respond concurrently.
	const pluginInterop = (middleware: any) =>
		function(ctx: any) {
			// @ts-ignore
			this.to.next(ctx);
			return middleware(ctx);
		};

	// Register the adapter
	Gun.on('get', pluginInterop(adapter.read));
	Gun.on('put', pluginInterop(adapter.write));
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

	const account = rootGun.user();

	const { encrypt, decrypt, work } = Gun.SEA;

	const context: IContext = {
		account,
		decrypt,
		encrypt,
		gun,
		time,
		work,
	};

	const accounts = accountsApi(context);
	const comments = commentsApi(context);
	const notifications = notificationsApi(context);
	const posts = postsApi(context);
	const profiles = profilesApi(context);

	const resetDatabase = adapter.reset;

	return {
		accounts,
		comments,
		notifications,
		posts,
		profiles,
		resetDatabase,
	};
};

export type IDataApiFactory = ReturnType<typeof dataApiFactory>;
