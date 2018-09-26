import {
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
	IIsAccountLoggedInAction,
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
		// get something from anywhere redux store
		// const currentUserAccount = getState().app.accounts.currentUser;
		// const currentOverlayStatus = getState().ui.overlays.currentOverlayStatus;

		// get something from api
		// const data = await context.dataApi.accounts.createAccount(createAccountInput);

		// for instance import this action from ui and begin showing loding indicator
		// dispatch(setGlobalLoadingIndicator(true));

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

const isAccountLoggedInAction: ActionCreator<
	IIsAccountLoggedInAction
> = () => ({
	type: ActionTypes.IS_ACCOUNT_LOGGED_IN,
});

export const isAccountLoggedIn = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(isAccountLoggedInAction());
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
