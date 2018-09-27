import { IContext } from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters from './setters';
import {
	IAccountData,
	IChangePasswordInput,
	ICreateAccountInput,
	ICredentials,
	IRecoverAccountInput,
} from './types';

import { resolveCallback } from '../../utils/helpers';

export default (context: IContext) => ({
	changePassword: (changePasswordInput: IChangePasswordInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.changePassword.validate(
					changePasswordInput,
					{
						stripUnknown: true,
					},
				);
				setters.changePassword(
					context,
					validatedInput as IChangePasswordInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	createAccount: (createAccountInput: ICreateAccountInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.createAccountInput.validate(
					createAccountInput,
					{
						stripUnknown: true,
					},
				);
				setters.createAccount(
					context,
					validatedInput as ICreateAccountInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getIsAccountLoggedIn: (): Promise<{ loggedIn: boolean }> =>
		new Promise((resolve, reject) => {
			getters.getIsAccountLoggedIn(context, resolveCallback(resolve, reject));
		}),
	login: (credentials: ICredentials): Promise<null> =>
		new Promise((resolve, reject) => {
			setters.login(context, credentials, resolveCallback(resolve, reject));
		}),
	logout: (): Promise<null> =>
		new Promise((resolve, reject) => {
			setters.logout(context, resolveCallback(resolve, reject));
		}),
	recoverAccount: (
		recoverAccountInput: IRecoverAccountInput,
	): Promise<{ hint: string }> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedInput = await schemas.changePassword.validate(
					recoverAccountInput,
					{
						stripUnknown: true,
					},
				);
				setters.recoverAccount(
					context,
					validatedInput as IRecoverAccountInput,
					resolveCallback(resolve, reject),
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	trustAccount: (): Promise<null> =>
		new Promise((resolve, reject) => {
			setters.logout(context, resolveCallback(resolve, reject));
		}),
	getCurrentAccount: (): Promise<IAccountData> =>
		new Promise((resolve, reject) => {
			getters.getCurrentAccount(context, resolveCallback(resolve, reject));
		}),
	getAccountByPub: ({
		publicKey,
	}: {
		publicKey: string;
	}): Promise<IAccountData> =>
		new Promise((resolve, reject) => {
			getters.getAccountByPub(
				context,
				{ publicKey },
				resolveCallback(resolve, reject),
			);
		}),
});
