import {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IProfileData,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { beginActivity, endActivity } from '../../ui/activities';
import {
	ActionTypes,
	IAcceptFriendAction,
	IAddFriendAction,
	ICreateProfileAction,
	IGetCurrentProfileAction,
	IGetProfileByUsernameAction,
	IGetPublicKeyByUsernameAction,
	IRemoveFriendAction,
	ISyncGetCurrentProfileAction,
	ISyncGetProfileByUsernameAction,
	ISyncGetPublicKeyByUsernameAction,
	IUpdateProfileAction,
	IUsernameInput,
} from './Types';

const createProfileAction: ActionCreator<ICreateProfileAction> = (
	createProfileInput: ICreateProfileInput,
) => ({
	type: ActionTypes.CREATE_PROFILE,
	payload: createProfileInput,
});

// ? should this method be exposed? since its being used internally by createAccount
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
	getProfileByUsernameInput: IUsernameInput,
) => ({
	type: ActionTypes.GET_PROFILE_BY_USERNAME,
	payload: getProfileByUsernameInput,
});

const syncGetProfileByUsernameAction: ActionCreator<
	ISyncGetProfileByUsernameAction
> = (profile: IProfileData) => ({
	type: ActionTypes.SYNC_GET_PROFILE_BY_USERNAME,
	payload: profile,
});

export const getProfileByUsername = (
	getProfileByUsernameInput: IUsernameInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(getProfileByUsernameAction(getProfileByUsernameInput));
		dispatch(
			beginActivity({
				type: ActionTypes.GET_PROFILE_BY_USERNAME,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const profile = await dataApi.profiles.getProfileByUsername(
			getProfileByUsernameInput,
		);
		dispatch(syncGetProfileByUsernameAction(profile));
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const getCurrentProfileAction: ActionCreator<
	IGetCurrentProfileAction
> = () => ({
	type: ActionTypes.GET_CURRENT_PROFILE,
});

const syncGetCurrentProfileAction: ActionCreator<
	ISyncGetCurrentProfileAction
> = (profile: IProfileData) => ({
	type: ActionTypes.SYNC_GET_CURRENT_PROFILE,
	payload: profile,
});

export const getCurrentProfile = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	try {
		dispatch(getCurrentProfileAction());
		dispatch(
			beginActivity({
				type: ActionTypes.GET_CURRENT_PROFILE,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const profile = await dataApi.profiles.getCurrentProfile();
		dispatch(syncGetCurrentProfileAction(profile));
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
	}
};

const getPublicKeyByUsernameAction: ActionCreator<
	IGetPublicKeyByUsernameAction
> = (getProfileUsernameInput: IUsernameInput) => ({
	type: ActionTypes.GET_PUBLIC_KEY_BY_USERNAME,
	payload: getProfileUsernameInput,
});

// TODO: @jake check with serkan on this
const syncGetPublicKeyByUsernameAction: ActionCreator<
	ISyncGetPublicKeyByUsernameAction
> = (publicKey: string) => ({
	type: ActionTypes.SYNC_GET_PUBLIC_KEY_BY_USERNAME,
	payload: publicKey,
});

export const getPublicKeyByUsername = (
	getProfileUsernameInput: IUsernameInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(getPublicKeyByUsernameAction(getProfileUsernameInput));
		dispatch(
			beginActivity({
				type: ActionTypes.GET_PUBLIC_KEY_BY_USERNAME,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const publicKey = await dataApi.profiles.getPublicKeyByUsername(
			getProfileUsernameInput,
		);
		dispatch(syncGetPublicKeyByUsernameAction(publicKey));
	} catch (e) {
		/**/
	} finally {
		dispatch(endActivity({ uuid: activityId }));
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
		const { dataApi } = context;
		await dataApi.profiles.updateProfile(updateProfileInput);
		dispatch(getCurrentProfile());
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
		const { dataApi } = context;
		await dataApi.profiles.addFriend(addFriendInput);
		dispatch(getCurrentProfile());
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
		const { dataApi } = context;
		await dataApi.profiles.removeFriend(removeFriendInput);
		dispatch(getCurrentProfile());
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
		const { dataApi } = context;
		await dataApi.profiles.acceptFriend(acceptFriendInput);
		dispatch(getCurrentProfile());
	} catch (e) {
		/**/
	}
};
