/**
 * TODO
 * 0. add the remaining current user data on the creation? what is the remaining data?
 * 1. user data update
 * 2. adding other users as friends (this includes pending relations.. etc)
 * 3. relate user data on this (posts / comments) with the current user instance
 * 4. remove a trusted user? lol seems to be an issue since the soul is create on the other client
 * we cannot control it unless we change our keys but that will result in everyone trusted to be removed from the whitelist
 */

/**
 * user recovery concept
 * since the user creation is done by the client and only the client knows about the details (server only stores the public cryptographic keys technically)
 * we can ask the user 3 questions to finalize the sign in process
 * example
 * 1. teacher => what was the name of your first teach
 * 2. live => where were you raised/born
 * 3. reminder => what reminds you of your password
 * then we process the data like this
 * encrypt(reminder, work(teacher, live));
 *
 * the above is provided by gun.sea encryption
 * and what it does is that it pairs teacker + live and lock the reminder on them
 * so next time the user forgets his password, we ask these questions and they get back their reminder (notice here we are not going to return the actual password because of sec reasons / will change in the future)
 */

import { IContext, IGunCallback } from '../../types';
import { ApiError } from '../../utils/errors';
import { getPublicKeyByUsername } from '../profiles/getters';
import { createProfile } from '../profiles/setters';
import * as accountHandles from './handles';

import {
	IChangePasswordInput,
	ICreateAccountInput,
	ICredentials,
	IRecoverAccountInput,
	IRecoverData,
} from './types';

/**
 * create the user's profile
 */
const createAccountProfile = (context: IContext, createAccountInput: ICreateAccountInput) => {
	const { username, aboutMeText, miningEnabled, fullName, email, avatar } = createAccountInput;
	const pub = context.account.is.pub;
	return new Promise((res, rej) =>
		createProfile(
			context,
			{
				username,
				aboutMeText,
				miningEnabled,
				fullName,
				email,
				avatar,
				pub,
				friends: {},
			} as any,
			(err) => {
				if (err) {
					rej(new ApiError(`failed to set created account ${err}`));
				}
				res();
			},
		),
	);
};

/**
 * create the recovery object on the current user's private scope
 * @param recoveryData object the user's recovery information
 */
const createRecoveryOnAccount = (context: IContext, recoveryData: any) => {
	return new Promise((res, rej) =>
		accountHandles.currentAccountRecover(context).put(recoveryData, (recoverCallback) => {
			if (recoverCallback.err) {
				rej(new ApiError(`failed to create account recovery settings ${recoverCallback.err}`));
			}
			res();
		}),
	);
};

/**
 * decrypt hint from recovery data
 * @param recoveryData object the user's recovery information
 */
const decryptRecovery = async (
	context: IContext,
	recoverData: IRecoverData<string>,
	{ question1, question2 }: { question1: string; question2: string },
) => {
	if (!recoverData || !Object.keys(recoverData).length) {
		throw new ApiError(`account not found`);
	}
	const { decrypt, work } = context;
	try {
		const {
			recover: { encryptedReminder },
		} = recoverData;
		if (!encryptedReminder) {
			throw new ApiError('no encrypted reminder');
		}
		const hint = await decrypt(encryptedReminder, await work(question1, question2));
		return { hint };
	} catch (e) {
		throw new ApiError(`recovery key not captured ${e.message}`);
	}
};

/**
 * authenticate with the newly created account to have access to the private scope
 */
const authenticateWithUser = (context: IContext, createAccountInput: ICreateAccountInput) => {
	const { account, encrypt, work } = context;
	const {
		username,
		password,
		recover: { reminder, question1, question2 },
	} = createAccountInput;
	return new Promise((res, rej) =>
		account.auth(username, password, async (authAck: any) => {
			if (authAck.err) {
				rej(new ApiError(`failed authentication ${authAck.err}`));
			}

			const encryptedReminder = await encrypt(reminder, await work(question1, question2));
			res({
				encryptedReminder,
				question1: question1.length,
				question2: question2.length,
			});
		}),
	);
};

/**
 * create the user account
 */
const createAccountRecord = (context: IContext, createAccountInput: ICreateAccountInput) => {
	const { username, password } = createAccountInput;
	return new Promise((res, rej) =>
		context.account.create(username, password, (createAccountCallback) => {
			if (createAccountCallback.wait) {
				// we wait? what do we do here
			} else if (createAccountCallback.err) {
				rej(new ApiError(`${createAccountCallback.err}`));
			}
			res();
		}),
	);
};

export const createAccount = async (
	context: IContext,
	createAccountInput: ICreateAccountInput,
	callback: IGunCallback<null>,
) => {
	const { account, gun, encrypt, work } = context;
	if (account.is) {
		return callback(new ApiError('cannot create account while a user is logged in.'));
	}

	const {
		username,
		password,
		aboutMeText,
		miningEnabled,
		fullName,
		email,
		avatar,
		recover,
	} = createAccountInput;

	account.create(username, password, (createAccountCallback: any) => {
		if (!createAccountCallback.pub) {
			return callback(new ApiError('cannot create account.'));
		}

		account.auth(username, password, (authCallback: any) => {
			if (!authCallback.alias) {
				return callback(new ApiError('failed to authenticate with the new account.'));
			}

			account
				.get('profile')
				.get(username)
				.put(
					{
						alias: username,
						aboutMeText,
						miningEnabled,
						fullName,
						email,
						avatar,
						friends: null,
					},
					(createProfileCallback: any) => {
						if (createProfileCallback.err) {
							return callback(
								new ApiError(`failed to create the user profile. ${createProfileCallback.err}`),
							);
						}
						const ref = account.get('profile').get(username);

						gun.get('profiles').once(() => {
							gun
								.get('profiles')
								.get(username)
								.put(ref, (pubRecordCallback: any) => {
									if (pubRecordCallback.err) {
										return callback(
											new ApiError(
												`failed to create the user profile on the pub record. ${
													pubRecordCallback.err
												}`,
											),
										);
									}
									return callback(null);
								});
						});
					},
				);
		});
	});
};

export const login = (
	context: IContext,
	{ username, password }: ICredentials,
	callback: IGunCallback<null>,
) => {
	const { account, gun } = context;
	if (account.is) {
		return callback(null);
	}
	account.auth(username, password, (authCallback: any) => {
		if (!authCallback.alias) {
			return callback(
				new ApiError('failed to authenticate', {
					initialRequestBody: { username },
				}),
			);
		}

		return callback(null);
	});
};

export const logout = (context: IContext, callback: IGunCallback<null>) => {
	const { account } = context;
	if (!account.is) {
		return callback(null);
	}
	try {
		account.logout(context);
		return callback(null);
	} catch (e) {
		return callback(e.message);
	}
};

export const changePassword = (
	context: IContext,
	{ oldPassword, newPassword }: IChangePasswordInput,
	callback: IGunCallback<null>,
) => {
	const { account } = context;

	if (!account.is) {
		return callback(new ApiError('failed to change password, user not logged in'));
	}

	account.auth(
		account.is.alias,
		oldPassword,
		() => {
			return callback(null);
		},
		{ change: newPassword },
	);
};

export const recoverAccount = (
	context: IContext,
	{ username, question1, question2 }: IRecoverAccountInput,
	callback: IGunCallback<{ hint: string }>,
) => {
	const errPrefix = 'failed to recover account';
	getPublicKeyByUsername(context, { username }, (err, pub) => {
		if (!pub) {
			return callback(
				new ApiError(`${errPrefix}, public key not found ${err}`, {
					initialRequestBody: { username },
				}),
			);
		}
		try {
			accountHandles
				.accountByPub(context, pub)
				.docLoad(async (recoverData: IRecoverData<string>) => {
					const hint = await decryptRecovery(context, recoverData, {
						question1,
						question2,
					});
					callback(null, hint);
				});
		} catch (e) {
			callback(e);
		}
	});
};

// this function allows the 'governance' to function properly (if something is
// created privately the trusted user is able to see that)
export const trustAccount = async (context: IContext, callback: IGunCallback<null>) => {
	const { account } = context;

	if (!account.is) {
		return callback(new ApiError('user not logged in'));
	}

	// TODO: what to trust

	return callback(null);
};

export default {
	changePassword,
	createAccount,
	login,
	logout,
	recoverAccount,
	trustAccount,
};
