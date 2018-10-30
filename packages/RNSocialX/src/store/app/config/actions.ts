import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { setError } from '../../ui/activities';
import {
	ActionTypes,
	ISetAppConfigAction,
	ISetAppConfigInput,
	ISetCustomGunSuperPeersAction,
	ISetCustomGunSuperPeersInput,
} from './Types';

const setAppConfigAction: ActionCreator<ISetAppConfigAction> = (
	setAppConfigInput: ISetAppConfigInput,
) => ({
	type: ActionTypes.SET_APP_CONFIG,
	payload: setAppConfigInput,
});

export const setAppConfig = (setAppConfigInput: ISetAppConfigInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(setAppConfigAction(setAppConfigInput));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SET_APP_CONFIG,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};

const setCustomGunSuperPeersAction: ActionCreator<ISetCustomGunSuperPeersAction> = (
	setCustomGunSuperPeersInput: ISetCustomGunSuperPeersInput,
) => ({
	type: ActionTypes.SET_CUSTOM_GUN_SUPER_PEERS,
	payload: setCustomGunSuperPeersInput,
});

export const setCustomGunSuperPeers = (
	setCustomGunSuperPeersInput: ISetCustomGunSuperPeersInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(setCustomGunSuperPeersAction(setCustomGunSuperPeersInput));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SET_CUSTOM_GUN_SUPER_PEERS,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};
