import { IContext } from '../../types';
import { ValidationError } from '../../utils/errors';
import { resolveCallback } from '../../utils/helpers';
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

export default (context: IContext) => ({
	changePassword: async (
		changePasswordInput: IChangePasswordInput,
	): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.changePassword.validate(
				changePasswordInput,
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw new ValidationError(
				typeof e.errors === 'string' ? e.errors : e.errors.join(),
				{ validationInput: changePasswordInput },
			);
		}

		return new Promise<null>((resolve, reject) => {
			setters.changePassword(
				context,
				validatedInput as IChangePasswordInput,
				resolveCallback(resolve, reject),
			);
		});
	},
	createAccount: async (
		createAccountInput: ICreateAccountInput,
	): Promise<null> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.createAccountInput.validate(
				createAccountInput,
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw new ValidationError(
				typeof e.errors === 'string' ? e.errors : e.errors.join(),
				{ validationInput: createAccountInput },
			);
		}

		return new Promise<null>((resolve, reject) => {
			setters.createAccount(
				context,
				validatedInput as ICreateAccountInput,
				resolveCallback(resolve, reject),
			);
		});
	},
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
	recoverAccount: async (
		recoverAccountInput: IRecoverAccountInput,
	): Promise<{ hint: string }> => {
		let validatedInput: any;
		try {
			validatedInput = await schemas.recoverAccountInput.validate(
				recoverAccountInput,
				{
					stripUnknown: true,
				},
			);
		} catch (e) {
			throw new ValidationError(
				typeof e.errors === 'string' ? e.errors : e.errors.join(),
				{ validationInput: recoverAccountInput },
			);
		}

		return new Promise<{ hint: string }>((resolve, reject) => {
			setters.recoverAccount(
				context,
				validatedInput as IRecoverAccountInput,
				resolveCallback(resolve, reject),
			);
		});
	},
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
