import {
	IAccountData,
	IChangePasswordInput,
	ICredentials,
	IGetAccountByPubInput,
	IRecoverAccountInput,
} from '@socialx/api-data';
import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';
import { ISetAuthAction } from '../../app/auth/Types';

export type IState = DeepReadonly<{
	accounts: IAccountData[];
}>;

export const enum ActionTypes {
	CREATE_ACCOUNT = 'data/accounts/CREATE_ACCOUNT',
	RECOVER_ACCOUNT = 'data/accounts/RECOVER_ACCOUNT',
	TRUST_ACCOUNT = 'data/accounts/TRUST_ACCOUNT',
	CHANGE_PASSWORD = 'data/accounts/CHANGE_PASSWORD',
	LOGIN = 'data/accounts/LOGIN',
	LOGOUT = 'data/accounts/LOGOUT',
	GET_CURRENT_ACCOUNT = 'data/accounts/GET_CURRENT_ACCOUNT',
	SYNC_GET_CURRENT_ACCOUNT = 'data/accounts/SYNC_GET_CURRENT_ACCOUNT',
	GET_ACCOUNT_BY_PUB = 'data/accounts/GET_ACCOUNT_BY_PUB',
	SYNC_GET_ACCOUNT_BY_PUB = 'data/accounts/SYNC_GET_ACCOUNT_BY_PUB',
}

export interface ICreateAccountInput {
	username: string;
	password: string;
	email: string;
	avatar: { uri: string };
	fullName: string;
	miningEnabled: boolean;
	shareDataEnabled: boolean;
	aboutMeText: string;
	recover: {
		question1: string;
		question2: string;
		reminder: string;
		encryptedReminder?: string;
	};
}

export interface ICreateAccountAction extends Action {
	type: ActionTypes.CREATE_ACCOUNT;
	payload: ICreateAccountInput;
}

export interface IRecoverAccountAction extends Action {
	type: ActionTypes.RECOVER_ACCOUNT;
	payload: IRecoverAccountInput;
}

export interface ILoginAction extends Action {
	type: ActionTypes.LOGIN;
	payload: ICredentials;
}

export interface ILogoutAction extends Action {
	type: ActionTypes.LOGOUT;
}

export interface IChangePasswordAction extends Action {
	type: ActionTypes.CHANGE_PASSWORD;
	payload: IChangePasswordInput;
}

export interface IGetCurrentAccountAction extends Action {
	type: ActionTypes.GET_CURRENT_ACCOUNT;
}

export interface ISyncGetCurrentAccountAction extends Action {
	type: ActionTypes.SYNC_GET_CURRENT_ACCOUNT;
	payload: IAccountData;
}

export interface IGetAccountByPubAction extends Action {
	type: ActionTypes.GET_ACCOUNT_BY_PUB;
	payload: IGetAccountByPubInput;
}

export interface ISyncGetAccountByPubAction extends Action {
	type: ActionTypes.SYNC_GET_ACCOUNT_BY_PUB;
	payload: IAccountData;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IResetStoreAction
	| ICreateAccountAction
	| IRecoverAccountAction
	| ILoginAction
	| ILogoutAction
	| IChangePasswordAction
	| IGetCurrentAccountAction
	| ISyncGetCurrentAccountAction
	| IGetAccountByPubAction
	| ISyncGetAccountByPubAction;
