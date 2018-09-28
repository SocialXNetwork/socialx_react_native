import {
	IChangePasswordInput,
	ICreateAccountInput,
	ICredentials,
	IGetAccountByPubInput,
	IRecoverAccountInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	IAccount,
	IChangePasswordAction,
	ICreateAccountAction,
	IGetAccountByPubAction,
	IGetCurrentAccountAction,
	IGetIsAccountLoggedInAction,
	ILoginAction,
	ILogoutAction,
	IRecoverAccountAction,
	IRecoveryData,
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
		const { dataApi } = context;
		await dataApi.accounts.createAccount(createAccountInput);
		dispatch(createAccountAction(createAccountInput));
	} catch (e) {
		// dispatch(setGlobalLoadingIndicator(false);
		// dispatch(addNotificationtoQueue('there was an error');
	}
};

const recoverAccountAction: ActionCreator<IRecoverAccountAction> = (
	recoverAccountActionInput: IRecoverAccountInput & IRecoveryData,
) => ({
	type: ActionTypes.RECOVER_ACCOUNT,
	payload: recoverAccountActionInput,
});

export const recoverAccount = (
	recoverAccountInput: IRecoverAccountInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		const { dataApi } = context;
		const recoveryData = await dataApi.accounts.recoverAccount(
			recoverAccountInput,
		);
		dispatch(recoverAccountAction({ ...recoverAccountInput, ...recoveryData }));
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
		const { dataApi } = context;
		await dataApi.accounts.login(credentials);
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
		const { dataApi } = context;
		await dataApi.accounts.logout();
		dispatch(logoutAction());
	} catch (e) {
		/**/
	}
};

const getIsAccountLoggedInAction: ActionCreator<IGetIsAccountLoggedInAction> = (
	loggedIn: boolean,
) => ({
	type: ActionTypes.GET_IS_ACCOUNT_LOGGED_IN,
	payload: loggedIn,
});

export const getIsAccountLoggedIn = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		const { dataApi } = context;
		const { loggedIn } = await dataApi.accounts.getIsAccountLoggedIn();
		dispatch(getIsAccountLoggedInAction(loggedIn));
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
		const { dataApi } = context;
		await dataApi.accounts.changePassword(changePasswordInput);
		dispatch(changePasswordAction(changePasswordInput));
	} catch (e) {
		/**/
	}
};

const getCurrentAccountAction: ActionCreator<IGetCurrentAccountAction> = (
	currentAccount: IAccount,
) => ({
	type: ActionTypes.GET_CURRENT_ACCOUNT,
	payload: currentAccount,
});

export const getCurrentAccount = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		const { dataApi } = context;
		const { alias, epub, pub } = await dataApi.accounts.getCurrentAccount();
		dispatch(getCurrentAccountAction({ alias, username: alias, epub, pub }));
	} catch (e) {
		/**/
	}
};

const getAccountByPubAction: ActionCreator<IGetAccountByPubAction> = (
	account: IGetAccountByPubInput & { account: IAccount },
) => ({
	type: ActionTypes.GET_ACCOUNT_BY_PUB,
	payload: account,
});

export const getAccountByPub = (
	getAccountByPubInput: IGetAccountByPubInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		const { dataApi } = context;
		const { alias, pub, epub } = await dataApi.accounts.getAccountByPub(
			getAccountByPubInput,
		);
		dispatch(
			getAccountByPubAction({
				...getAccountByPubInput,
				account: {
					alias,
					username: alias,
					pub,
					epub,
				},
			}),
		);
	} catch (e) {
		/**/
	}
};
