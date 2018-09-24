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

import {getPublicKeyByUsername} from '../profiles/getters';
import {createProfile} from '../profiles/setters';
import * as accountHandles from './handles';

interface IRecoverData<T> {
	recover: {
		question1: T;
		question2: T;
		reminder: string;
		encryptedReminder?: string;
	};
}

interface IRecoverAccountInput {
	username: string;
	question1: string;
	question2: string;
}

interface IChangePassword {
	oldPassword: string;
	newPassword: string;
}

interface ICreateAccountInput extends IRecoverData<string> {
	username: string;
	password: string;
	email: string;
	avatar: string;
}

// TODO: rollback
export const createAccount = (
	context: IContext,
	createAccountInput: ICreateAccountInput,
	callback: IGunCallback<null>,
) => {
	const {account, encrypt, work} = context;

	const {
		username,
		password,
		email,
		avatar,
		recover: {reminder, question1, question2},
	} = createAccountInput;

	// start the creation process here
	account.create(username, password, (createAccountCallback) => {
		if (createAccountCallback.wait) {
			// we wait? what do we do here
		} else if (createAccountCallback.err) {
			return callback(`could'nt create a new user => ` + createAccountCallback.err);
		} else {
			// we authenticate the user
			account.auth(username, password, async (authAck) => {
				if (authAck.err) {
					return callback('failed, error => ' + authAck.err);
				}
				// after the user is authenticate we create their recovery setting
				const encryptedReminder = await encrypt(reminder, await work(question1, question2));

				accountHandles.currentAccountRecover(context).put(
					{
						// recovery stuff here
						encryptedReminder,
						question1: question1.length,
						question2: question2.length,
					},
					(flags) => {
						if (flags.err) {
							return callback('failed, error => ' + flags.err);
						}

						createProfile(context, {username, email, avatar, pub: account.is.pub}, (err) => {
							if (err) {
								return callback(err);
							}

							return callback(null);
						});
					},
				);
			});
		}
	});
};

export const login = (context: IContext, {username, password}: any, callback: IGunCallback<null>) => {
	const {account} = context;
	account.auth(username, password, (authCallback) => {
		if (authCallback.err) {
			return callback('failed, error => ' + authCallback.err);
		}

		return callback(null);
	});
};

export const logout = async (context: IContext, callback: IGunCallback<null>) => {
	const {account} = context;
	try {
		await account.leave();
		return callback(null);
	} catch (e) {
		return callback(e.message);
	}
};

export const changePassword = (
	context: IContext,
	{oldPassword, newPassword}: IChangePassword,
	callback: IGunCallback<null>,
) => {
	const {account} = context;

	if (!account.is) {
		return callback('a user needs to be logged in in-order to proceed');
	}

	account.auth(
		account.is.alias,
		oldPassword,
		() => {
			return callback(null);
		},
		{change: newPassword},
	);
};

export const recoverAccount = (
	context: IContext,
	{username, question1, question2}: IRecoverAccountInput,
	callback: IGunCallback<{hint: string}>,
) => {
	const {decrypt, work} = context;

	getPublicKeyByUsername(context, {username}, (err, pub) => {
		if (!pub) {
			return callback('failed, no public key found');
		}
		accountHandles.accountByPub(context, pub).docLoad(async (recoverData: IRecoverData<string>) => {
			if (!recoverData) {
				return callback('user does not exist');
			}
			try {
				const {
					recover: {encryptedReminder},
				} = recoverData;
				if (!encryptedReminder) {
					return callback('failed, no encrypted reminder found');
				}
				const hint = await decrypt(encryptedReminder, await work(question1, question2));
				return callback(null, {hint});
			} catch (e) {
				return callback(`could'nt capture the user's recovery key => ` + e.message);
			}
		});
	});
};

// this function allows the 'governance' to function properly (if something is
// created privately the trusted user is able to see that)
export const trustAccount = async (context: IContext, callback: IGunCallback<null>) => {
	const {account} = context;

	if (!account.is) {
		return callback('a user needs to be logged in in-order to proceed');
	}

	// TODO: what to trust

	return callback(null);
};
