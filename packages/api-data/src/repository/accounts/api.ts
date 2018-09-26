import { IContext } from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters, {
	IChangePasswordInput,
	ICreateAccountInput,
	ICredentials,
	IRecoverAccountInput,
} from './setters';

export default (context: IContext) => ({
	changePassword: (changePasswordInput: IChangePasswordInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.changePassword.validate(
					changePasswordInput,
					{
						stripUnknown: true,
					},
				);
				setters.changePassword(
					context,
					validatedArgs as IChangePasswordInput,
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	createAccount: (createAccountInput: ICreateAccountInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.createAccountInput.validate(
					createAccountInput,
					{
						stripUnknown: true,
					},
				);
				setters.createAccount(
					context,
					validatedArgs as ICreateAccountInput,
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	getIsAccountLoggedIn: (): Promise<{ loggedIn: boolean }> =>
		new Promise((resolve, reject) => {
			getters.getIsAccountLoggedIn(context, (e, r) => {
				if (e) {
					reject(e);
				}
				resolve(r);
			});
		}),
	login: (credentials: ICredentials): Promise<null> =>
		new Promise((resolve, reject) => {
			setters.login(context, credentials, (e, r) => {
				if (e) {
					reject(e);
				}
				resolve(r);
			});
		}),
	logout: (): Promise<null> =>
		new Promise((resolve, reject) => {
			setters.logout(context, (e, r) => {
				if (e) {
					reject(e);
				}
				resolve(r);
			});
		}),
	recoverAccount: (
		recoverAccountInput: IRecoverAccountInput,
	): Promise<{ hint: string }> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.changePassword.validate(
					recoverAccountInput,
					{
						stripUnknown: true,
					},
				);
				setters.recoverAccount(
					context,
					validatedArgs as IRecoverAccountInput,
					(e, r) => {
						if (e) {
							reject(e);
						}
						resolve(r);
					},
				);
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	trustAccount: (): Promise<null> =>
		new Promise((resolve, reject) => {
			setters.logout(context, (e, r) => {
				if (e) {
					reject(e);
				}
				resolve(r);
			});
		}),
});
