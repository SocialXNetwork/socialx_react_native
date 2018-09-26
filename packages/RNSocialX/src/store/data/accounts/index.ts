export { default as reducer } from './reducer';
export { IState, IAction, IAccount } from './Types';
export {
	changePassword,
	recoverAccount,
	logout,
	trustAccount,
	createAccount,
	getIsAccountLoggedIn,
	login,
} from './actions';
