// tslint:disable-next-line no-submodule-imports
import * as Gun from 'gun/gun';

// temp and should be removed (just for offline testing on node)
// import 'gun/lib/store';

// tslint:disable-next-line no-submodule-imports
import 'gun/nts';
// tslint:disable-next-line no-submodule-imports
import 'gun/sea';

import './extensions/asyncStorageAdapter';
import './extensions/docload';
import './extensions/encrypt';

import { api as accountsApi } from './repository/accounts';
import { api as commentsApi } from './repository/comments';
import { api as postsApi } from './repository/posts';
import { api as profilesApi } from './repository/profiles';

import { IContext, IGunInstance } from './types';

export interface IApiOptions {
	peers: string[];
}

export const dataApiFactory = ({ peers }: IApiOptions) => {
	const time = () => new Date(Gun.state());

	const gun: IGunInstance = new Gun({
		peers,
	});

	const account = gun.user();

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
	const posts = postsApi(context);
	const profiles = profilesApi(context);

	return {
		accounts,
		comments,
		posts,
		profiles,
	};
};

export type IDataApiFactory = ReturnType<typeof dataApiFactory>;
