import {
	IAccountData,
	IChangePasswordInput,
	ICreateAccountInput,
	ICredentials,
	IGetAccountByPubInput,
	IRecoverAccountInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { beginActivity, endActivity } from '../../ui/activities';
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
	ISyncGetAccountByPubAction,
	ISyncGetCurrentAccountAction,
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
		const { dataApi } = context;
		await dataApi.accounts.createAccount(createAccountInput);
	} catch (e) {
		// dispatch(setGlobalLoadingIndicator(false);
		// dispatch(addNotificationtoQueue('there was an error');
	}
};

// TODO: @jake check with serkan
const recoverAccountAction: ActionCreator<IRecoverAccountAction> = (
	recoverAccountActionInput: IRecoverAccountInput,
) => ({
	type: ActionTypes.RECOVER_ACCOUNT,
	payload: recoverAccountActionInput,
});

export const recoverAccount = (
	recoverAccountInput: IRecoverAccountInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(recoverAccountAction(recoverAccountInput));
		const { dataApi } = context;
		const recoveryData = await dataApi.accounts.recoverAccount(
			recoverAccountInput,
		);
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
		const { dataApi } = context;
		await dataApi.accounts.login(credentials);
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
		const { dataApi } = context;
		await dataApi.accounts.logout();
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
		const { dataApi } = context;
		const accountLoggedIn = await dataApi.accounts.getIsAccountLoggedIn();
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
		const { dataApi } = context;
		await dataApi.accounts.changePassword(changePasswordInput);
	} catch (e) {
		/**/
	}
};

const getCurrentAccountAction: ActionCreator<
	IGetCurrentAccountAction
> = () => ({
	type: ActionTypes.GET_CURRENT_ACCOUNT,
});

const syncGetCurrentAccountAction: ActionCreator<
	ISyncGetCurrentAccountAction
> = (account: IAccountData) => ({
	type: ActionTypes.SYNC_GET_CURRENT_ACCOUNT,
	payload: account,
});

export const getCurrentAccount = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	try {
		dispatch(getCurrentAccountAction());
		dispatch(
			beginActivity({
				type: ActionTypes.GET_CURRENT_ACCOUNT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const account = await dataApi.accounts.getCurrentAccount();
		dispatch(syncGetCurrentAccountAction(account));
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const getAccountByPubAction: ActionCreator<IGetAccountByPubAction> = (
	getAccountByPubInput: IGetAccountByPubInput,
) => ({
	type: ActionTypes.GET_ACCOUNT_BY_PUB,
	payload: getAccountByPubInput,
});

const syncGetAccountByPubAction: ActionCreator<ISyncGetAccountByPubAction> = (
	account: IAccountData,
) => ({
	type: ActionTypes.SYNC_GET_ACCOUNT_BY_PUB,
	payload: account,
});

export const getAccountByPub = (
	getAccountByPubInput: IGetAccountByPubInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(getAccountByPubAction(getAccountByPubInput));
		dispatch(
			beginActivity({ type: ActionTypes.GET_ACCOUNT_BY_PUB, uuid: activityId }),
		);
		const { dataApi } = context;
		const account = await dataApi.accounts.getAccountByPub(
			getAccountByPubInput,
		);
		dispatch(syncGetAccountByPubAction(account));
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};
