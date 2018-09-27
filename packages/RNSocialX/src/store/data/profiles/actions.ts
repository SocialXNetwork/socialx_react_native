import {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	IAcceptFriendAction,
	IAddFriendAction,
	ICreateProfileAction,
	IGetCurrentProfileAction,
	IGetProfileByUsernameAction,
	IGetPublicKeyByUsernameAction,
	IRemoveFriendAction,
	IUpdateProfileAction,
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

const updateCurrentProfileAction: ActionCreator<IUpdateProfileAction> = (
	updateProfileInput: IUpdateProfileInput,
) => ({
	type: ActionTypes.UPDATE_PROFILE,
	payload: updateProfileInput,
});

export const updateCurrentProfile = (
	updateProfileInput: IUpdateProfileInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(updateCurrentProfileAction(updateProfileInput));
	} catch (e) {
		/**/
	}
};

const addFriendAction: ActionCreator<IAddFriendAction> = (
	addFriendInput: IAddFriendInput,
) => ({
	type: ActionTypes.ADD_FRIEND,
	payload: addFriendInput,
});

export const addFriend = (addFriendInput: IAddFriendInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(addFriendAction(addFriendInput));
	} catch (e) {
		/**/
	}
};

const removeFriendAction: ActionCreator<IRemoveFriendAction> = (
	removeFriendInput: IRemoveFriendInput,
) => ({
	type: ActionTypes.REMOVE_FRIEND,
	payload: removeFriendInput,
});

export const removeFriend = (
	removeFriendInput: IRemoveFriendInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(removeFriendAction(removeFriendInput));
	} catch (e) {
		/**/
	}
};

const acceptFriendAction: ActionCreator<IAcceptFriendAction> = (
	acceptFriendInput: IAcceptFriendInput,
) => ({
	type: ActionTypes.ACCEPT_FRIEND,
	payload: acceptFriendInput,
});

export const acceptFriend = (
	acceptFriendInput: IAcceptFriendInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(acceptFriendAction(acceptFriendInput));
	} catch (e) {
		/**/
	}
};
