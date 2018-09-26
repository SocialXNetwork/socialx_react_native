import { ICreateProfileInput } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	ICreateProfileAction,
	ICurrentProfileAction,
	IProfileByUsernameAction,
	IPublicKeyByUsernameAction,
	IUsernameArgument,
} from './Types';

const createProfileAction: ActionCreator<ICreateProfileAction> = (
	createProfileInput: ICreateProfileInput,
) => ({
	type: ActionTypes.CREATE_PROFILE,
	payload: createProfileInput,
});

export const createProfile = (
	createProfileInput: ICreateProfileInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(createProfileAction(createProfileInput));
	} catch (e) {
		/**/
	}
};

const getProfileByUsernameAction: ActionCreator<IProfileByUsernameAction> = (
	getProfileByUsernameInput: IUsernameArgument,
) => ({
	type: ActionTypes.PROFILE_BY_USERNAME,
	payload: getProfileByUsernameInput,
});

export const getProfileByUsername = (
	getProfileByUsernameInput: IUsernameArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getProfileByUsernameAction(getProfileByUsernameInput));
	} catch (e) {
		/**/
	}
};

const getCurrentProfileAction: ActionCreator<ICurrentProfileAction> = () => ({
	type: ActionTypes.CURRENT_PROFILE,
});

export const getCurrentProfile = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(getCurrentProfileAction());
	} catch (e) {
		/**/
	}
};

const getPublicKeyByUsernameAction: ActionCreator<
	IPublicKeyByUsernameAction
> = (getProfileUsernameInput: IUsernameArgument) => ({
	type: ActionTypes.PUBLIC_KEY_BY_USERNAME,
	payload: getProfileUsernameInput,
});

export const getPublicKeyByUsername = (
	getProfileUsernameInput: IUsernameArgument,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(getPublicKeyByUsernameAction(getProfileUsernameInput));
	} catch (e) {
		/**/
	}
};
