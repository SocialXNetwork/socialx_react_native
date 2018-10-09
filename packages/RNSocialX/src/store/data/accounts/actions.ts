import {
	IAccountData,
	IChangePasswordInput,
	ICredentials,
	IGetAccountByPubInput,
	IRecoverAccountInput,
} from '@socialx/api-data';
import { IListenerProgess } from 'react-native-background-upload';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';

import { clearAuth, setAuth } from '../../app/auth';
import { removeUploadedFiles, setUploadStatus } from '../../storage/files';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import {
	ActionTypes,
	IChangePasswordAction,
	ICreateAccountAction,
	ICreateAccountInput,
	IGetAccountByPubAction,
	IGetCurrentAccountAction,
	ILoginAction,
	ILogoutAction,
	IRecoverAccountAction,
	ISyncGetAccountByPubAction,
	ISyncGetCurrentAccountAction,
} from './Types';

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
		dispatch(setAuth({ alias: account.alias, pub: account.pub }));
	} catch (e) {
		dispatch(
			setError({
				type: ActionTypes.GET_CURRENT_ACCOUNT,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const createAccountAction: ActionCreator<ICreateAccountAction> = (
	createAccountInput: ICreateAccountInput,
) => ({
	type: ActionTypes.CREATE_ACCOUNT,
	payload: createAccountInput,
});

export const createAccount = (
	createAccountInput: ICreateAccountInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();

	try {
		dispatch(createAccountAction(createAccountInput));
		dispatch(
			beginActivity({
				type: ActionTypes.CREATE_ACCOUNT,
				uuid: activityId,
			}),
		);
		const { dataApi, storageApi } = context;

		const { avatar, ...createAccountRest } = createAccountInput;
		if (avatar.uri.length > 0) {
			const bootstrapStatus = (uploadIdStarted: string) => {
				dispatch(
					setUploadStatus({
						path: avatar.uri,
						uploadId: uploadIdStarted,
						progress: 0,
						aborting: false,
						done: false,
						hash: '',
					}),
				);
			};

			const updateStatus = ({
				uploadId: uploadIdUpdated,
				progress,
			}: IListenerProgess & { uploadId: string }) => {
				dispatch(
					setUploadStatus({
						uploadId: uploadIdUpdated,
						progress,
						path: avatar.uri,
						aborting: false,
						done: false,
						hash: '',
					}),
				);
			};

			const { uploadId, responseBody } = await storageApi.uploadFile(
				avatar.uri,
				bootstrapStatus,
				updateStatus,
			);
			const { Hash: hash } = JSON.parse(responseBody);

			dispatch(
				setUploadStatus({
					uploadId,
					progress: 100,
					path: avatar.uri,
					aborting: false,
					done: true,
					hash,
				}),
			);

			const createAccountFinal = {
				...createAccountRest,
				avatar: hash,
			};
			await dataApi.accounts.createAccount(createAccountFinal);
		} else {
			const createAccountFinal = {
				...createAccountRest,
				avatar: '',
			};

			await dataApi.accounts.createAccount(createAccountFinal);
		}
		dispatch(getCurrentAccount());
	} catch (e) {
		dispatch(
			setError({
				type: ActionTypes.CREATE_ACCOUNT,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		dispatch(endActivity({ uuid: activityId }));
		dispatch(removeUploadedFiles());
	}
};

const recoverAccountAction: ActionCreator<IRecoverAccountAction> = (
	recoverAccountActionInput: IRecoverAccountInput,
) => ({
	type: ActionTypes.RECOVER_ACCOUNT,
	payload: recoverAccountActionInput,
});

export const recoverAccount = (
	recoverAccountInput: IRecoverAccountInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(recoverAccountAction(recoverAccountInput));
		dispatch(
			beginActivity({
				type: ActionTypes.RECOVER_ACCOUNT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const recoveryData = await dataApi.accounts.recoverAccount(
			recoverAccountInput,
		);
	} catch (e) {
		dispatch(
			setError({
				type: ActionTypes.RECOVER_ACCOUNT,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		dispatch(endActivity({ uuid: activityId }));
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
	const activityId = uuidv4();
	try {
		dispatch(loginAction(credentials));
		dispatch(
			beginActivity({
				type: ActionTypes.LOGIN,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.accounts.login(credentials);
		dispatch(getCurrentAccount());
	} catch (e) {
		dispatch(
			setError({
				type: ActionTypes.LOGIN,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const logoutAction: ActionCreator<ILogoutAction> = () => ({
	type: ActionTypes.LOGOUT,
});

export const logout = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	const actionType = ActionTypes.LOGOUT;
	const storeState = getState();
	const auth = storeState.app.auth.auth;
	if (auth && auth.alias) {
		try {
			dispatch(logoutAction());
			dispatch(
				beginActivity({
					type: actionType,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.accounts.logout();

			dispatch(clearAuth());
		} catch (e) {
			dispatch(
				setError({
					type: actionType,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			dispatch(endActivity({ uuid: activityId }));
		}
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
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.app.auth.auth;
	if (auth && auth.alias) {
		try {
			dispatch(changePasswordAction(changePasswordInput));
			dispatch(
				beginActivity({
					type: ActionTypes.CHANGE_PASSWORD,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.accounts.changePassword(changePasswordInput);
		} catch (e) {
			dispatch(
				setError({
					type: ActionTypes.CHANGE_PASSWORD,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			dispatch(endActivity({ uuid: activityId }));
		}
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
		dispatch(
			setError({
				type: ActionTypes.GET_ACCOUNT_BY_PUB,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};
