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
	REGISTER = 'auth/REGISTER',
	RESET_PASSWORD = 'auth/RESET_PASSWORD',
	LOGIN = 'auth/LOGIN',
	LOGOUT = 'auth/LOGOUT',
}

export interface IRegisterAction extends Action {
	type: ActionTypes.REGISTER;
	payload: {
		username: string;
		password: string;
	};
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

export type IAction = IRegisterAction | ILoginAction | ILogoutAction | IResetPasswordAction;
