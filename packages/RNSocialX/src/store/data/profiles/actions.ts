import { ICreateProfileInput } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	ICreateProfileAction,
	IGetCurrentProfileAction,
	IGetProfileByUsernameAction,
	IGetPublicKeyByUsernameAction,
	IUsernameArgument,
} from './Types';

// todo: add the new api actions here
// updateProfile
// addFriend
// removeFriend
// acceptFriend

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

const getProfileByUsernameAction: ActionCreator<IGetProfileByUsernameAction> = (
	getProfileByUsernameInput: IUsernameArgument,
) => ({
	type: ActionTypes.GET_PROFILE_BY_USERNAME,
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

const getCurrentProfileAction: ActionCreator<
	IGetCurrentProfileAction
> = () => ({
	type: ActionTypes.GET_CURRENT_PROFILE,
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
	IGetPublicKeyByUsernameAction
> = (getProfileUsernameInput: IUsernameArgument) => ({
	type: ActionTypes.GET_PUBLIC_KEY_BY_USERNAME,
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
