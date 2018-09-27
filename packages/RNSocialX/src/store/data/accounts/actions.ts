import {
	IAccountByPubInput,
	IChangePasswordInput,
	ICreateAccountInput,
	ICredentials,
	IRecoverAccountInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	IChangePasswordAction,
	ICreateAccountAction,
	IGetAccountByPubAction,
	IGetCurrentAccountAction,
	IGetIsAccountLoggedInAction,
	ILoginAction,
	ILogoutAction,
	IRecoverAccountAction,
	ITrustAccountAction,
} from './Types';

const createAccountAction: ActionCreator<ICreateAccountAction> = (
	createAccountInput: ICreateAccountInput,
) => ({
	type: ActionTypes.CREATE_ACCOUNT,
	payload: createAccountInput,
});

export const createAccount = (
	createAccountInput: ICreateAccountInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(createAccountAction(createAccountInput));
	} catch (e) {
		// dispatch(setGlobalLoadingIndicator(false);
		// dispatch(addNotificationtoQueue('there was an error');
	}
};

const recoverAccountAction: ActionCreator<IRecoverAccountAction> = (
	recoverAccountInput: IRecoverAccountInput,
) => ({
	type: ActionTypes.RECOVER_ACCOUNT,
	payload: recoverAccountInput,
});

export const recoverAccount = (
	recoverAccountInput: IRecoverAccountInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(recoverAccountAction(recoverAccountInput));
	} catch (e) {
		/**/
	}
};

const trustAccountAction: ActionCreator<ITrustAccountAction> = () => ({
	type: ActionTypes.TRUST_ACCOUNT,
});

export const trustAccount = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(trustAccountAction());
	} catch (e) {
		/**/
	}
};

const loginAction: ActionCreator<ILoginAction> = (
	credentials: ICredentials,
) => ({
	type: ActionTypes.LOGIN,
	payload: credentials,
});

export const login = (credentials: ICredentials): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(loginAction(credentials));
	} catch (e) {
		/**/
	}
};

const logoutAction: ActionCreator<ILogoutAction> = () => ({
	type: ActionTypes.LOGOUT,
});

export const logout = (): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(logoutAction());
	} catch (e) {
		/**/
	}
};

const getIsAccountLoggedInAction: ActionCreator<
	IGetIsAccountLoggedInAction
> = () => ({
	type: ActionTypes.GET_IS_ACCOUNT_LOGGED_IN,
});

export const getIsAccountLoggedIn = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(getIsAccountLoggedInAction());
	} catch (e) {
		/**/
	}
};

const changePasswordAction: ActionCreator<IChangePasswordAction> = (
	changePasswordInput: IChangePasswordInput,
) => ({
	type: ActionTypes.CHANGE_PASSWORD,
	payload: changePasswordInput,
});

export const changePassword = (
	changePasswordInput: IChangePasswordInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(changePasswordAction(changePasswordInput));
	} catch (e) {
		/**/
	}
};

const getCurrentAccountAction: ActionCreator<
	IGetCurrentAccountAction
> = () => ({
	type: ActionTypes.GET_CURRENT_ACCOUNT,
});

export const getCurrentAccount = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(getCurrentAccountAction());
	} catch (e) {
		/**/
	}
};

const getAccountByPubAction: ActionCreator<IGetAccountByPubAction> = (
	getAccountByPubInput: IAccountByPubInput,
) => ({
	type: ActionTypes.GET_ACCOUNT_BY_PUB,
	payload: getAccountByPubInput,
});

export const getAccountByPub = (
	getAccountByPubInput: IAccountByPubInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getAccountByPubAction(getAccountByPubInput));
	} catch (e) {
		/**/
	}
};
