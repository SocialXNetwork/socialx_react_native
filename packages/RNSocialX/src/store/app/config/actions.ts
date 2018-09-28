import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
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

export const setAppConfig = (
	setAppConfigInput: ISetAppConfigInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(setAppConfigAction(setAppConfigInput));
	} catch (e) {
		/**/
	}
};

const setCustomGunSuperPeersAction: ActionCreator<
	ISetCustomGunSuperPeersAction
> = (setCustomGunSuperPeersInput: ISetCustomGunSuperPeersInput) => ({
	type: ActionTypes.SET_CUSTOM_GUN_SUPER_PEERS,
	payload: setCustomGunSuperPeersInput,
});

export const setCustomGunSuperPeers = (
	setCustomGunSuperPeersInput: ISetCustomGunSuperPeersInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(setCustomGunSuperPeersAction(setCustomGunSuperPeersInput));
	} catch (e) {
		/**/
	}
};
