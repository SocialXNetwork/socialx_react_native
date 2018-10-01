import Gun from 'gun/gun';
import 'gun/sea';

import '../extensions/docload';

import '../extensions/encrypt';

import { api as accountsApi } from '../repository/accounts';
import { api as commentsApi } from '../repository/comments';
import { api as notificationsApi } from '../repository/notifications';
import { api as postsApi } from '../repository/posts';
import { api as profilesApi } from '../repository/profiles';

import { IContext, IGunInstance } from '../types';

export const dataApiFactory = () => {
	const time = () => new Date(Gun.state());

	const gun: IGunInstance = new Gun({
		localStorage: false,
		radix: true,
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
