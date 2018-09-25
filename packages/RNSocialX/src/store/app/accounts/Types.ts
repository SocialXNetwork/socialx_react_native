import {IChangePasswordInput, ICreateAccountInput, ICredentials, IRecoverAccountInput} from '@socialx/api-data';
import {Action} from 'redux';
import {DeepReadonly} from 'utility-types';

export interface IAccount {
	alias?: string;
	username: string;
	pub: string;
}

export type IState = DeepReadonly<{
	currentAccount: IAccount | null;
}>;

export const enum ActionTypes {
	CREATE_ACCOUNT = 'app/accounts/CREATE_ACCOUNT',
	RECOVER_ACCOUNT = 'app/accounts/RECOVER_ACCOUNT',
	TRUST_ACCOUNT = 'app/accounts/TRUST_ACCOUNT',
	IS_ACCOUNT_LOGGED_IN = 'app/accounts/IS_ACCOUNT_LOGGED_IN',
	CHANGE_PASSWORD = 'app/accounts/CHANGE_PASSWORD',
	LOGIN = 'app/accounts/LOGIN',
	LOGOUT = 'app/accounts/LOGOUT',
}

export interface ICreateAccountAction extends Action {
	type: ActionTypes.CREATE_ACCOUNT;
	payload: ICreateAccountInput;
}

export interface IRecoverAccountAction extends Action {
	type: ActionTypes.RECOVER_ACCOUNT;
	payload: IRecoverAccountInput;
}

export interface ITrustAccountAction extends Action {
	type: ActionTypes.TRUST_ACCOUNT;
}

export interface ILoginAction extends Action {
	type: ActionTypes.LOGIN;
	payload: ICredentials;
}

export interface ILogoutAction extends Action {
	type: ActionTypes.LOGOUT;
}

export interface IIsAccountLoggedInAction extends Action {
	type: ActionTypes.IS_ACCOUNT_LOGGED_IN;
}

export interface IChangePasswordAction extends Action {
	type: ActionTypes.CHANGE_PASSWORD;
	payload: IChangePasswordInput;
}

export type IAction =
	| ICreateAccountAction
	| ITrustAccountAction
	| IIsAccountLoggedInAction
	| IRecoverAccountAction
	| ILoginAction
	| ILogoutAction
	| IChangePasswordAction;
