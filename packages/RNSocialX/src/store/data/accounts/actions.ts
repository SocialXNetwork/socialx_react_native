import {
	IAccountData,
	IChangePasswordInput,
	ICredentials,
	IGetAccountByPubInput,
	IRecoverAccountInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { getCurrentProfile } from '../profiles';

import { clearGunAuth, setGunAuth } from '../../auth/gun';
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

const getCurrentAccountAction: ActionCreator<IGetCurrentAccountAction> = () => ({
	type: ActionTypes.GET_CURRENT_ACCOUNT,
});

const syncGetCurrentAccountAction: ActionCreator<ISyncGetCurrentAccountAction> = (
	account: IAccountData,
) => ({
	type: ActionTypes.SYNC_GET_CURRENT_ACCOUNT,
	payload: account,
});

export const getCurrentAccount = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(getCurrentAccountAction());
		await dispatch(
			beginActivity({
				type: ActionTypes.GET_CURRENT_ACCOUNT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const account = await dataApi.accounts.getCurrentAccount();
		dispatch(syncGetCurrentAccountAction(account));
		await dispatch(setGunAuth({ alias: account.alias, pub: account.pub }));
		await dispatch(getCurrentProfile());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_CURRENT_ACCOUNT,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const createAccountAction: ActionCreator<ICreateAccountAction> = (
	createAccountInput: ICreateAccountInput,
) => ({
	type: ActionTypes.CREATE_ACCOUNT,
	payload: createAccountInput,
});

export const createAccount = (createAccountInput: ICreateAccountInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();

	try {
		dispatch(createAccountAction(createAccountInput));
		await dispatch(
			beginActivity({
				type: ActionTypes.CREATE_ACCOUNT,
				uuid: activityId,
			}),
		);
		const { dataApi, storageApi } = context;

		const { avatar, ...createAccountRest } = createAccountInput;
		if (avatar.uri.length > 0) {
			const bootstrapStatus = async (uploadIdStarted: string) => {
				await dispatch(
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

			const updateStatus = async ({
				uploadId: uploadIdUpdated,
				progress,
			}: any & { uploadId: string }) => {
				await dispatch(
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

			await dispatch(
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
		await dispatch(setGunAuth({ password: createAccountInput.password }));
		await dispatch(getCurrentAccount());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.CREATE_ACCOUNT,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
		await dispatch(removeUploadedFiles());
	}
};

const recoverAccountAction: ActionCreator<IRecoverAccountAction> = (
	recoverAccountActionInput: IRecoverAccountInput,
) => ({
	type: ActionTypes.RECOVER_ACCOUNT,
	payload: recoverAccountActionInput,
});

export const recoverAccount = (recoverAccountInput: IRecoverAccountInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	try {
		dispatch(recoverAccountAction(recoverAccountInput));
		await dispatch(
			beginActivity({
				type: ActionTypes.RECOVER_ACCOUNT,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const recoveryData = await dataApi.accounts.recoverAccount(recoverAccountInput);
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.RECOVER_ACCOUNT,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const loginAction: ActionCreator<ILoginAction> = (credentials: ICredentials) => ({
	type: ActionTypes.LOGIN,
	payload: credentials,
});

export const login = (credentials: ICredentials): IThunk => async (dispatch, getState, context) => {
	const state = getState();
	const auth = state.auth.database.gun;
	const activityId = uuidv4();
	try {
		dispatch(loginAction(credentials));
		await dispatch(
			beginActivity({
				type: ActionTypes.LOGIN,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		await dataApi.accounts.login(credentials);
		await dispatch(
			setGunAuth({
				password: credentials.password,
				alias: credentials.username,
			}),
		);
		await dispatch(getCurrentAccount());
		await dispatch(endActivity({ uuid: activityId }));
	} catch (e) {
		if (auth && auth.alias && auth.password) {
			console.log('login failed with', e);
			if (auth.alias.length > 0 && auth.password.length > 0) {
				console.log('retrying');
				await dispatch(login(credentials));
				return;
			} else {
				await dispatch(
					setError({
						type: ActionTypes.LOGIN,
						error: e.message,
						uuid: uuidv4(),
					}),
				);
			}
		} else {
			await dispatch(
				setError({
					type: ActionTypes.LOGIN,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		}
	}
};

const logoutAction: ActionCreator<ILogoutAction> = () => ({
	type: ActionTypes.LOGOUT,
});

export const logout = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	const actionType = ActionTypes.LOGOUT;
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(logoutAction());
			await dispatch(
				beginActivity({
					type: actionType,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			dataApi.accounts.logout();

			await dispatch(clearGunAuth());
		} catch (e) {
			await dispatch(
				setError({
					type: actionType,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const changePasswordAction: ActionCreator<IChangePasswordAction> = (
	changePasswordInput: IChangePasswordInput,
) => ({
	type: ActionTypes.CHANGE_PASSWORD,
	payload: changePasswordInput,
});

export const changePassword = (changePasswordInput: IChangePasswordInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(changePasswordAction(changePasswordInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.CHANGE_PASSWORD,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.accounts.changePassword(changePasswordInput);
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.CHANGE_PASSWORD,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
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

export const getAccountByPub = (getAccountByPubInput: IGetAccountByPubInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	try {
		dispatch(getAccountByPubAction(getAccountByPubInput));
		await dispatch(beginActivity({ type: ActionTypes.GET_ACCOUNT_BY_PUB, uuid: activityId }));
		const { dataApi } = context;
		const account = await dataApi.accounts.getAccountByPub(getAccountByPubInput);
		dispatch(syncGetAccountByPubAction(account));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_ACCOUNT_BY_PUB,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};
