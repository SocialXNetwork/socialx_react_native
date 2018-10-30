import { IContext, IGunCallback } from '../../types';

import * as profileHandles from '../profiles/handles';

import { ApiError } from '../../utils/errors';
import { IAccountData, IGetAccountByPubInput } from './types';

const preLoadProfile = (user: any, cb: any) => {
	user.get('profile').once(() => {
		cb();
	});
};

export const getIsAccountLoggedIn = (
	context: IContext,
	callback: IGunCallback<{ loggedIn: boolean }>,
) => {
	const { account } = context;
	return callback(null, { loggedIn: !!account.is });
};

export const getCurrentAccount = (context: IContext, callback: IGunCallback<IAccountData>) => {
	const { account, gun } = context;
	if (!account.is) {
		return callback(new ApiError('failed to get current account, user not logged in'));
	}

	preLoadProfile(account, () => {
		account.open(
			(userProfileCallback: IAccountData) => {
				if (!Object.keys(userProfileCallback).length) {
					return callback(new ApiError('failed to get current account profile.'));
				}

				return callback(null, userProfileCallback);
			},
			{ off: 1, wait: 500 },
		);
	});
};

export const getAccountByPub = (
	context: IContext,
	{ publicKey }: IGetAccountByPubInput,
	callback: IGunCallback<IAccountData>,
) => {
	const { gun } = context;
	const targetUser = gun.user(publicKey);
	targetUser.docLoad((data: IAccountData) => {
		if (!Object.keys(data).length) {
			return callback(
				new ApiError('failed to get account, no object for provided public key', {
					initialRequestBody: publicKey,
				}),
			);
		}
		return callback(null, data);
	});
};

export default {
	getIsAccountLoggedIn,
	getCurrentAccount,
	getAccountByPub,
};
