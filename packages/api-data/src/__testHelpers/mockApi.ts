import Gun from 'gun/gun';
import 'gun/sea';

import '../extensions/docload';

import '../extensions/encrypt';

import { api as accountsApi } from '../repository/accounts';
import { api as commentsApi } from '../repository/comments';
import { api as notificationsApi } from '../repository/notifications';
import { api as postsApi } from '../repository/posts';
import { api as profilesApi } from '../repository/profiles';

import { IContext, IGunAccountInstance, IGunInstance } from '../types';

interface IAccountMock {
	is: {
		pub: string;
		alias: string;
	};
}

export const dataApiFactory = (accountMock: IAccountMock) => {
	const time = () => new Date(Gun.state());

	const gun: IGunInstance = new Gun({
		localStorage: false,
		radix: true,
	});

	// const account = gun.user();
	const account: IGunAccountInstance = {
		create(
			username: string,
			password: string,
			callback?: (
				data: { wait?: boolean; err?: string; ok?: number; pub: string },
			) => void,
		) {
			return this;
		},
		auth(
			username: string,
			passphrase: string,
			callback?: (
				data: { wait?: boolean; err?: string; ok?: number; pub: string },
			) => void,
			opts?: { newpass?: string; pin?: string; change?: string },
		) {
			return this;
		},
		leave() {
			return Promise.resolve(this);
		},
		delete(username: string, password: string) {
			return Promise.resolve(this);
		},
		recall(back?: number, opts?: { hook?: (props: object) => any }) {
			return Promise.resolve(this);
		},
		alive() {
			return Promise.resolve(this);
		},
		trust(user: IGunInstance) {
			return Promise.resolve(null);
		},
		grant(user: IGunInstance) {
			return Promise.resolve(null);
		},
		pair() {
			return {
				pub: '',
				priv: '',
				epub: '',
				epriv: '',
			};
		},
		...accountMock,
		...gun,
	};

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
