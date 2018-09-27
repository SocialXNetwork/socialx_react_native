import { IContext, IGunCallback } from '../../types';

import { IAccountByPubInput, IAccountData } from './types';

export const getIsAccountLoggedIn = (
	context: IContext,
	callback: IGunCallback<{ loggedIn: boolean }>,
) => {
	const { account } = context;
	return callback(null, { loggedIn: !!account.is });
};

export const getCurrentAccount = (
	context: IContext,
	callback: IGunCallback<IAccountData>,
) => {
	const { account } = context;
	if (!account.is) {
		return callback('a user need to be logged in to proceed');
	}

	account.docLoad((data: IAccountData) => {
		if (data) {
			return callback('current user object not found');
		}
		return callback(null, data);
	});
};

export const getAccountByPub = (
	context: IContext,
	{ publicKey }: IAccountByPubInput,
	callback: IGunCallback<IAccountData>,
) => {
	const { gun } = context;
	const targetUser = gun.user(publicKey);
	targetUser.docLoad((data: IAccountData) => {
		if (!data) {
			return callback('failed, no user object found for this public key');
		}
		return callback(null, data);
	});
};

export default {
	getIsAccountLoggedIn,
	getCurrentAccount,
	getAccountByPub,
};
