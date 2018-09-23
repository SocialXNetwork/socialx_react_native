import {ActionCreator, Dispatch} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IApplicationState} from '../../';
import {ActionTypes, ILoginAction, ILogoutAction, IRegisterAction, IResetPasswordAction} from './Types';

export const register: ActionCreator<IRegisterAction> = (username: string, password: string) => ({
	type: ActionTypes.REGISTER,
	payload: {
		username,
		password,
	},
});

export const login: ActionCreator<ILoginAction> = (username: string, password: string) => ({
	type: ActionTypes.LOGIN,
	payload: {
		username,
		password,
	},
});

export const logout: ActionCreator<ILogoutAction> = (username: string, password: string) => ({
	type: ActionTypes.LOGOUT,
	payload: {
		username,
		password,
	},
});

export const resetPassword: ActionCreator<IResetPasswordAction> = (username: string, password: string) => ({
	type: ActionTypes.RESET_PASSWORD,
	payload: {
		username,
		password,
	},
});
