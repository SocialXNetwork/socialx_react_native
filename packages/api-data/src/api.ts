import * as Gun from 'gun/gun';

import 'gun/nts';
import 'gun/sea';

// this should be extracted to its own library in order to make this
// more easily testable and also importable into the server for api reuse
import './extensions/asyncStorageAdapter';

import './extensions/docload';

import './extensions/encrypt';

import './extensions/erase';

import { api as accountsApi } from './repository/accounts';
import { api as commentsApi } from './repository/comments';
import { api as notificationsApi } from './repository/notifications';
import { api as postsApi } from './repository/posts';
import { api as profilesApi } from './repository/profiles';

import { IContext, IGunInstance } from './types';

export interface IApiOptions {
	peers: string[];
}

export const dataApiFactory = ({ peers }: IApiOptions) => {
	const time = () => new Date(Gun.state());

	const rootGun: IGunInstance = new Gun({
		peers: peers.reduce(
			(peersObject, peer) => ({
				...peersObject,
				[peer]: {},
			}),
			{},
		),
	});

	const gun = rootGun.get('db');

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

	return {
		accounts,
		comments,
		notifications,
		posts,
		profiles,
	};
};

export type IDataApiFactory = ReturnType<typeof dataApiFactory>;
