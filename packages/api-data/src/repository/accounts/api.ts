import {IContext} from '../../types';
import getters from './getters';
import schemas from './schemas';
import setters, {IChangePassword, ICreateAccountInput, ICredentials, IRecoverAccountInput} from './setters';

export default (context: IContext) => ({
	isAccountLoggedIn: (): Promise<{loggedIn: boolean}> =>
		new Promise((resolve, reject) => {
			getters.isAccountLoggedIn(context, (e, r) => {
				if (e) {
					reject(e);
				}
				resolve(r);
			});
		}),
	createAccount: (createAccountInput: ICreateAccountInput): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.createAccountInput.validate(createAccountInput, {
					stripUnknown: true,
				});
				setters.createAccount(context, validatedArgs as ICreateAccountInput, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
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
	changePassword: (changePassword: IChangePassword): Promise<null> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.changePassword.validate(changePassword, {
					stripUnknown: true,
				});
				setters.changePassword(context, validatedArgs as IChangePassword, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
			} catch (e) {
				reject(typeof e.errors === 'string' ? e.errors : e.errors.join());
			}
		}),
	recoverAccount: (recoverAccount: IRecoverAccountInput): Promise<{hint: string}> =>
		new Promise(async (resolve, reject) => {
			try {
				const validatedArgs = await schemas.changePassword.validate(recoverAccount, {
					stripUnknown: true,
				});
				setters.recoverAccount(context, validatedArgs as IRecoverAccountInput, (e, r) => {
					if (e) {
						reject(e);
					}
					resolve(r);
				});
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
