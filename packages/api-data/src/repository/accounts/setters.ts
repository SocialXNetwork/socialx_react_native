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

// TODO: rollback
export const createAccount = (
	context: IContext,
	createAccountInput: ICreateAccountInput,
	callback: IGunCallback<null>,
) => {
	const { account, encrypt, work } = context;
	if (account.is) {
		return callback(
			new ApiError('cannot create account while a user is logged in.'),
		);
	}

	const {
		username,
		password,
		fullName,
		email,
		avatar,
		aboutMeText,
		miningEnabled,
		recover: { reminder, question1, question2 },
	} = createAccountInput;
	const errPrefix = 'failed to create a new account';
	// start the creation process here
	account.create(username, password, (createAccountCallback) => {
		if (createAccountCallback.wait) {
			// we wait? what do we do here
		} else if (createAccountCallback.err) {
			return callback(
				new ApiError(`${errPrefix} ${createAccountCallback.err}`, {
					initialRequestBody: createAccountInput,
				}),
			);
		} else {
			// we authenticate the user
			account.auth(username, password, async (authAck) => {
				if (authAck.err) {
					return callback(
						new ApiError(`${errPrefix}, failed authentication ${authAck.err}`, {
							initialRequestBody: createAccountInput,
						}),
					);
				}
				// after the user is authenticate we create their recovery setting
				const encryptedReminder = await encrypt(
					reminder,
					await work(question1, question2),
				);

				accountHandles.currentAccountRecover(context).put(
					{
						// recovery stuff here
						encryptedReminder,
						question1: question1.length,
						question2: question2.length,
					},
					(recoverCallback) => {
						if (recoverCallback.err) {
							return callback(
								new ApiError(
									`${errPrefix}, failed to create account recovery settings ${
										recoverCallback.err
									}`,
									{
										initialRequestBody: createAccountInput,
									},
								),
							);
						}

						createProfile(
							context,
							{
								username,
								aboutMeText,
								miningEnabled,
								fullName,
								email,
								avatar,
								pub: account.is.pub,
							},
							(err) => {
								if (err) {
									return callback(
										new ApiError(
											`${errPrefix}, failed to set created account ${err}`,
											{ initialRequestBody: createAccountInput },
										),
									);
								}

								return callback(null);
							},
						);
					},
				);
			});
		}
	});
};

export const login = (
	context: IContext,
	{ username, password }: ICredentials,
	callback: IGunCallback<null>,
) => {
	const { account } = context;
	if (account.is) {
		return callback(null);
	}
	account.auth(username, password, (authCallback) => {
		if (authCallback.err) {
			return callback(
				new ApiError('failed to authenticate', {
					initialRequestBody: { username },
				}),
			);
		}

		return callback(null);
	});
};

export const logout = async (
	context: IContext,
	callback: IGunCallback<null>,
) => {
	const { account } = context;
	if (!account.is) {
		return callback(null);
	}
	try {
		await account.leave();
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
		return callback(
			new ApiError('failed to change password, user not logged in'),
		);
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
	const { decrypt, work } = context;
	const errPrefix = 'failed to recover account';
	getPublicKeyByUsername(context, { username }, (err, pub) => {
		if (!pub) {
			return callback(
				new ApiError(`${errPrefix}, public key not found ${err}`, {
					initialRequestBody: { username },
				}),
			);
		}
		accountHandles
			.accountByPub(context, pub)
			.docLoad(async (recoverData: IRecoverData<string>) => {
				if (!Object.keys(recoverData).length) {
					return callback(
						new ApiError(`${errPrefix}, account not found`, {
							initialRequestBody: { username },
						}),
					);
				}
				try {
					const {
						recover: { encryptedReminder },
					} = recoverData;
					if (!encryptedReminder) {
						return callback(
							new ApiError(`${errPrefix}, no encrypted reminder`, {
								initialRequestBody: { username },
							}),
						);
					}
					const hint = await decrypt(
						encryptedReminder,
						await work(question1, question2),
					);
					return callback(null, { hint });
				} catch (e) {
					return callback(
						new ApiError(
							`${errPrefix}, recovery key not captured ${e.message}`,
							{
								initialRequestBody: { username },
							},
						),
					);
				}
			});
	});
};

// this function allows the 'governance' to function properly (if something is
// created privately the trusted user is able to see that)
export const trustAccount = async (
	context: IContext,
	callback: IGunCallback<null>,
) => {
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
