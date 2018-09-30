export { default as reducer } from './reducer';
export { IState, IAction } from './Types';

export {
	IAccountData,
	IChangePasswordInput,
	ICreateAccountInput,
	ICredentials,
	IGetAccountByPubInput,
	IRecoverAccountInput,
} from '@socialx/api-data';

export {
	changePassword,
	recoverAccount,
	logout,
	trustAccount,
	createAccount,
	getIsAccountLoggedIn,
	login,
	getCurrentAccount,
	getAccountByPub,
} from './actions';
