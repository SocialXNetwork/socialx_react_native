import {
	IAcceptFriendInput,
	IAddFriendInput,
	IClearFriendResponseInput,
	IPostReturnData,
	IRejectFriendInput,
	IRemoveFriendInput,
	IUpdateProfileInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';

import { setUploadStatus } from '../../storage/files';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { getUserPosts } from '../posts';
import {
	ActionTypes,
	IAcceptFriendAction,
	IAddFriendAction,
	IAddPostsToProfileAction,
	IClearFriendResponseAction,
	IGetCurrentFriendsAction,
	IGetCurrentProfileAction,
	IGetProfileByAliasAction,
	IGetProfilesByPostsAction,
	IGetProfilesByUsernamesAction,
	IPostsToProfileInput,
	IProfile,
	IRejectFriendAction,
	IRemoveFriendAction,
	ISyncFriendsInput,
	ISyncGetCurrentFriendsAction,
	ISyncGetCurrentProfileAction,
	ISyncGetProfileByAliasAction,
	ISyncGetProfilesByPostsAction,
	ISyncGetProfilesByUsernamesAction,
	IUpdateProfileAction,
	IUsernamesInput,
} from './Types';

/**
 * 	Retrieves the profiles of users engaged
 * 	in posts and adds them to the store
 */

const getProfilesByPostsAction: ActionCreator<IGetProfilesByPostsAction> = (
	posts: IPostReturnData[],
) => ({
	type: ActionTypes.GET_PROFILES_BY_POSTS,
	payload: posts,
});

const syncGetProfilesByPostsAction: ActionCreator<ISyncGetProfilesByPostsAction> = (
	profiles: IProfile[],
) => ({
	type: ActionTypes.SYNC_GET_PROFILES_BY_POSTS,
	payload: profiles,
});

export const getProfilesByPosts = (posts: IPostReturnData[]): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;

	if (auth && auth.alias) {
		try {
			dispatch(getProfilesByPostsAction(posts));
			await dispatch(
				beginActivity({
					type: ActionTypes.GET_PROFILES_BY_POSTS,
					uuid: activityId,
				}),
			);

			const profiles = await context.dataApi.profiles.getUserProfilesByPosts({ posts });
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

/**
 * 	Retrieves the profile of a user given his alias
 * 	and adds it to the store
 */

const getProfileByAliasAction: ActionCreator<IGetProfileByAliasAction> = (alias: string) => ({
	type: ActionTypes.GET_PROFILE_BY_ALIAS,
	payload: alias,
});

const syncGetProfileByAliasAction: ActionCreator<ISyncGetProfileByAliasAction> = (
	profile: IProfile,
) => ({
	type: ActionTypes.SYNC_GET_PROFILE_BY_ALIAS,
	payload: profile,
});

export const getProfileByAlias = (alias: string): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;

	if (auth && auth.alias) {
		try {
			dispatch(getProfileByAliasAction(alias));
			await dispatch(
				beginActivity({
					type: ActionTypes.GET_PROFILE_BY_ALIAS,
					uuid: activityId,
				}),
			);

			const profile = await context.dataApi.profiles.getProfileByUsername({ username: alias });
			await dispatch(syncGetProfileByAliasAction(profile));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.GET_PROFILE_BY_ALIAS,
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
	profiles: IProfile[],
) => ({
	type: ActionTypes.SYNC_GET_PROFILES_BY_USERNAMES,
	payload: profiles,
});

export const getProfilesByUsernames = (input: IUsernamesInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;

	if (auth && auth.alias) {
		try {
			dispatch(getProfilesByUsernamesAction(input));
			await dispatch(
				beginActivity({
					type: ActionTypes.GET_PROFILES_BY_USERNAMES,
					uuid: activityId,
				}),
			);

			const profiles = await context.dataApi.profiles.getProfilesByUsernames(input);
			dispatch(syncGetProfilesByUsernamesAction(profiles));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.GET_PROFILES_BY_USERNAMES,
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
	profile: IProfile,
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

			const profile = await context.dataApi.profiles.getCurrentProfile();
			dispatch(syncGetCurrentProfileAction(profile));
			await dispatch(getUserPosts(profile.alias));
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

const getCurrentFriendsAction: ActionCreator<IGetCurrentFriendsAction> = () => ({
	type: ActionTypes.GET_CURRENT_FRIENDS,
});

const syncGetCurrentFriendsAction: ActionCreator<ISyncGetCurrentFriendsAction> = (
	input: ISyncFriendsInput,
) => ({
	type: ActionTypes.SYNC_GET_CURRENT_FRIENDS,
	payload: input,
});

export const getCurrentFriends = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	const state = getState();
	const currentUser = state.auth.database.gun;

	try {
		dispatch(getCurrentFriendsAction());
		await dispatch(
			beginActivity({
				uuid: activityId,
				type: ActionTypes.GET_CURRENT_FRIENDS,
			}),
		);

		const friends = await context.dataApi.profiles.getCurrentProfileFriends();
		dispatch(syncGetCurrentFriendsAction({ alias: currentUser!.alias, friends }));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_CURRENT_FRIENDS,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
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

				const { Hash: hash } = await storageApi.uploadFile(
					avatar,
					// ? TODO: should we also pass in the extension here? (jpeg/png)
					'image/jpeg',
					bootstrapStatus,
					updateStatus,
				);

				await dispatch(
					setUploadStatus({
						uploadId: '',
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

				console.log('*** upload completed', { hash });

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
			await dispatch(getProfileByAlias(addFriendInput.username));
			await dispatch(getCurrentFriends());
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
			await dispatch(getProfileByAlias(removeFriendInput.username));
			await dispatch(getCurrentFriends());
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
			await dispatch(getProfileByAlias(acceptFriendInput.username));
			await dispatch(getCurrentFriends());
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

const rejectFriendAction: ActionCreator<IRejectFriendAction> = (
	rejectFriendInput: IRejectFriendInput,
) => ({
	type: ActionTypes.REJECT_FRIEND,
	payload: rejectFriendInput,
});

export const rejectFriend = (rejectFriendInput: IRejectFriendInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(rejectFriendAction(rejectFriendInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.REJECT_FRIEND,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.profiles.rejectFriend(rejectFriendInput);
			await dispatch(getProfileByAlias(rejectFriendInput.username));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.REJECT_FRIEND,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

const clearFriendResponseAction: ActionCreator<IClearFriendResponseAction> = (
	clearFriendResponseInput: IClearFriendResponseInput,
) => ({
	type: ActionTypes.CLEAR_FRIEND_RESPONSE,
	payload: clearFriendResponseInput,
});

export const clearFriendResponse = (
	clearFriendResponseInput: IClearFriendResponseInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(clearFriendResponseAction(clearFriendResponseInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.CLEAR_FRIEND_RESPONSE,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.profiles.clearFriendResponse(clearFriendResponseInput);
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.CLEAR_FRIEND_RESPONSE,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

export const addPostsToProfile: ActionCreator<IAddPostsToProfileAction> = (
	input: IPostsToProfileInput,
) => ({
	type: ActionTypes.ADD_POSTS_TO_PROFILE,
	payload: input,
});
