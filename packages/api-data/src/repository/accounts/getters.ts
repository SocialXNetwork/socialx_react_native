import { IContext, IGunCallback } from '../../types';

import { ApiError } from '../../utils/errors';
import { IAccountData, IGetAccountByPubInput } from './types';

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
		return callback(
			new ApiError('failed to get current account, user not logged in'),
		);
	}

	account.docLoad((data: IAccountData) => {
		if (!Object.keys(data).length) {
			return callback(
				new ApiError('failed to get current account, user document not found'),
			);
		}
		return callback(null, data);
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
				new ApiError(
					'failed to get account, no object for provided public key',
					{ initialRequestBody: publicKey },
				),
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
