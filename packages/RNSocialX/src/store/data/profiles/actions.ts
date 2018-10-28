import {
	IAcceptFriendInput,
	IAddFriendInput,
	IPostArrayData,
	IProfileData,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { getUserPosts } from '../../aggregations/posts';
import { setUploadStatus } from '../../storage/files';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import {
	ActionTypes,
	IAcceptFriendAction,
	IAddFriendAction,
	IGetCurrentProfileAction,
	IGetProfileByUsernameAction,
	IGetProfilesByPostsAction,
	IGetProfilesByUsernamesAction,
	IRemoveFriendAction,
	ISyncGetCurrentProfileAction,
	ISyncGetProfileByUsernameAction,
	ISyncGetProfilesByPostsAction,
	ISyncGetProfilesByUsernamesAction,
	IUpdateProfileAction,
	IUsernameInput,
	IUsernamesInput,
} from './Types';

const getProfilesByPostsAction: ActionCreator<IGetProfilesByPostsAction> = (
	posts: IPostArrayData,
) => ({
	type: ActionTypes.GET_PROFILES_BY_POSTS,
	payload: posts,
});

const syncGetProfilesByPostsAction: ActionCreator<ISyncGetProfilesByPostsAction> = (
	profiles: IProfileData[],
) => ({
	type: ActionTypes.SYNC_GET_PROFILES_BY_POSTS,
	payload: profiles,
});

export const getProfilesByPosts = (getProfileByPostsInput: IPostArrayData): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(getProfilesByPostsAction(getProfileByPostsInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.GET_PROFILES_BY_POSTS,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			const profiles = await dataApi.profiles.getUserProfilesByPosts({
				posts: getProfileByPostsInput,
			});
			await dispatch(syncGetProfilesByPostsAction(profiles));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.GET_PROFILES_BY_POSTS,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const getProfileByUsernameAction: ActionCreator<IGetProfileByUsernameAction> = (
	getProfileByUsernameInput: IUsernameInput,
) => ({
	type: ActionTypes.GET_PROFILE_BY_USERNAME,
	payload: getProfileByUsernameInput,
});

const syncGetProfileByUsernameAction: ActionCreator<ISyncGetProfileByUsernameAction> = (
	profile: IProfileData,
) => ({
	type: ActionTypes.SYNC_GET_PROFILE_BY_USERNAME,
	payload: profile,
});

export const getProfileByUsername = (getProfileByUsernameInput: IUsernameInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(getProfileByUsernameAction(getProfileByUsernameInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.GET_PROFILE_BY_USERNAME,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			const profile = await dataApi.profiles.getProfileByUsername(getProfileByUsernameInput);
			await dispatch(syncGetProfileByUsernameAction(profile));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.GET_PROFILE_BY_USERNAME,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};
const getProfilesByUsernamesAction: ActionCreator<IGetProfilesByUsernamesAction> = (
	getProfilesByUsernamesInput: IUsernamesInput,
) => ({
	type: ActionTypes.GET_PROFILES_BY_USERNAMES,
	payload: getProfilesByUsernamesInput,
});

const syncGetProfilesByUsernamesAction: ActionCreator<ISyncGetProfilesByUsernamesAction> = (
	profiles: IProfileData[],
) => ({
	type: ActionTypes.SYNC_GET_PROFILES_BY_USERNAMES,
	payload: profiles,
});

// relevant for fetching the users that liked/commented on stuff etc..
export const getProfilesByUsernames = (
	getProfileByUsernameInput: IUsernamesInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(getProfileByUsernameAction(getProfileByUsernameInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.GET_PROFILE_BY_USERNAME,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			const profiles = await dataApi.profiles.getProfilesByUsernames(getProfileByUsernameInput);
			dispatch(syncGetProfilesByUsernamesAction(profiles));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.GET_PROFILE_BY_USERNAME,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const getCurrentProfileAction: ActionCreator<IGetCurrentProfileAction> = () => ({
	type: ActionTypes.GET_CURRENT_PROFILE,
});

const syncGetCurrentProfileAction: ActionCreator<ISyncGetCurrentProfileAction> = (
	profile: IProfileData,
) => ({
	type: ActionTypes.SYNC_GET_CURRENT_PROFILE,
	payload: profile,
});

export const getCurrentProfile = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(getCurrentProfileAction());
			await dispatch(
				beginActivity({
					type: ActionTypes.GET_CURRENT_PROFILE,
					uuid: activityId,
				}),
			);
			const profile = storeState.data.accounts.accounts[0].profile[auth.alias];
			dispatch(syncGetCurrentProfileAction(profile));
			await dispatch(getUserPosts({ username: profile.alias }));
		} catch (e) {
			console.log(e);
			await dispatch(
				setError({
					type: ActionTypes.GET_CURRENT_PROFILE,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const updateCurrentProfileAction: ActionCreator<IUpdateProfileAction> = (
	updateProfileInput: IUpdateProfileInput,
) => ({
	type: ActionTypes.UPDATE_PROFILE,
	payload: updateProfileInput,
});

export const updateCurrentProfile = (updateProfileInput: IUpdateProfileInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const { dataApi, storageApi } = context;

	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(updateCurrentProfileAction(updateProfileInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.UPDATE_PROFILE,
					uuid: activityId,
				}),
			);

			const { avatar, ...profileRest } = updateProfileInput;

			if (avatar!.length > 0 && avatar && avatar.indexOf('http') < 0) {
				const bootstrapStatus = async (uploadIdStarted: string) => {
					await dispatch(
						setUploadStatus({
							path: avatar,
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
							path: avatar,
							aborting: false,
							done: false,
							hash: '',
						}),
					);
				};

				const { uploadId, responseBody } = await storageApi.uploadFile(
					avatar,
					bootstrapStatus,
					updateStatus,
				);
				const { Hash: hash } = JSON.parse(responseBody);

				await dispatch(
					setUploadStatus({
						uploadId,
						progress: 100,
						path: avatar,
						aborting: false,
						done: true,
						hash,
					}),
				);

				const updateProfileFinal = {
					...profileRest,
					avatar: hash,
				};

				await dataApi.profiles.updateProfile(updateProfileFinal);
			} else {
				if (avatar && avatar.indexOf('http') >= 0) {
					await dataApi.profiles.updateProfile(profileRest);
				} else {
					await dataApi.profiles.updateProfile(updateProfileInput);
				}
			}

			await dispatch(getCurrentProfile());
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.UPDATE_PROFILE,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const addFriendAction: ActionCreator<IAddFriendAction> = (addFriendInput: IAddFriendInput) => ({
	type: ActionTypes.ADD_FRIEND,
	payload: addFriendInput,
});

export const addFriend = (addFriendInput: IAddFriendInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(addFriendAction(addFriendInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.ADD_FRIEND,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.profiles.addFriend(addFriendInput);
			await dispatch(getCurrentProfile());
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.ADD_FRIEND,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const removeFriendAction: ActionCreator<IRemoveFriendAction> = (
	removeFriendInput: IRemoveFriendInput,
) => ({
	type: ActionTypes.REMOVE_FRIEND,
	payload: removeFriendInput,
});

export const removeFriend = (removeFriendInput: IRemoveFriendInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(removeFriendAction(removeFriendInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.REMOVE_FRIEND,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.profiles.removeFriend(removeFriendInput);
			await dispatch(getCurrentProfile());
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.REMOVE_FRIEND,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const acceptFriendAction: ActionCreator<IAcceptFriendAction> = (
	acceptFriendInput: IAcceptFriendInput,
) => ({
	type: ActionTypes.ACCEPT_FRIEND,
	payload: acceptFriendInput,
});

export const acceptFriend = (acceptFriendInput: IAcceptFriendInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(acceptFriendAction(acceptFriendInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.ACCEPT_FRIEND,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.profiles.acceptFriend(acceptFriendInput);
			await dispatch(getCurrentProfile());
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.ACCEPT_FRIEND,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};
