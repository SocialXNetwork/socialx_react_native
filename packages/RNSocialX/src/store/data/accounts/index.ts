export { default as reducer } from './reducer';
export { IState, IAction, ICreateAccountInput } from './Types';

export {
	IAccountData,
	IChangePasswordInput,
	ICredentials,
	IGetAccountByPubInput,
	IRecoverAccountInput,
} from '@socialx/api-data';

export {
	changePassword,
	recoverAccount,
	logout,
	createAccount,
	login,
	getCurrentAccount,
	getAccountByPub,
} from './actions';
