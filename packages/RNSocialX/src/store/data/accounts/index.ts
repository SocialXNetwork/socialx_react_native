export { default as reducer } from './reducer';
export { IState, IAction } from './Types';
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
