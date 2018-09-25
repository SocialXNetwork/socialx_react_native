import {ICreateAccountInput} from '@socialx/api-data';
import {Action} from 'redux';
import {DeepReadonly} from 'utility-types';

interface IUser {
	username: string;
	password: string;
	email: string;
	name: string;
}

export type IState = DeepReadonly<{
	currentUser: IUser | null;
}>;

export const enum ActionTypes {
	CREATE_ACCOUNT = 'app/auth/CREATE_ACCOUNT',
	RESET_PASSWORD = 'app/auth/RESET_PASSWORD',
	LOGIN = 'app/auth/LOGIN',
	LOGOUT = 'app/auth/LOGOUT',
}

export interface ICreateAccountAction extends Action {
	type: ActionTypes.CREATE_ACCOUNT;
	payload: ICreateAccountInput;
}

export interface ILoginAction extends Action {
	type: ActionTypes.LOGIN;
}

export interface ILogoutAction extends Action {
	type: ActionTypes.LOGOUT;
}

export interface IResetPasswordAction extends Action {
	type: ActionTypes.RESET_PASSWORD;
}

export type IAction = ICreateAccountAction | ILoginAction | ILogoutAction | IResetPasswordAction;
