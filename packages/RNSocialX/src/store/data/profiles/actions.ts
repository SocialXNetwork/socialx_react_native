import { IPostReturnData, IUpdateProfileInput } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { setUploadStatus } from '../../storage/files';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { deleteNotification } from '../notifications';
import { getUserPosts } from '../posts';
import {
	ActionTypes,
	IAcceptFriendAction,
	IAddFriendAction,
	IAddPostsToProfileAction,
	IAddPostsToProfileInput,
	IAliasInput,
	IClearFriendResponseAction,
	IClearSearchResultsAction,
	IFriendInput,
	IGetCurrentFriendsAction,
	IGetCurrentProfileAction,
	IGetCurrentProfileInput,
	IGetProfileByAliasAction,
	IGetProfilesByPostsAction,
	IProfile,
	IRejectFriendAction,
	IRemoveFriendAction,
	IRemovePostFromProfileAction,
	IRemovePostFromProfileInput,
	ISearchForProfilesAction,
	ISearchForProfilesLocallyAction,
	ISearchInput,
	ISearchWithAliasInput,
	ISearchWithProfilesInput,
	ISyncAcceptFriendAction,
	ISyncAddFriendAction,
	ISyncExternalProfilesAction,
	ISyncFriendsInput,
	ISyncGetCurrentFriendsAction,
	ISyncGetCurrentProfileAction,
	ISyncGetProfileByAliasAction,
	ISyncGetProfilesByPostsAction,
	ISyncRejectFriendAction,
	ISyncRemoveFriendAction,
	ISyncSearchForProfilesAction,
	ISyncUndoRequestAction,
	IUndoRequestAction,
	IUpdateProfileAction,
	IUpdateProfileInput as ISettingsInput,
} from './Types';

/**
 * 	Retrieves the profiles of users engaged in posts and adds them to the store
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
	const activityId = uuid();
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
					uuid: uuid(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

/**
 * 	Retrieves the profile of a user given his alias and adds it to the store
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
	const activityId = uuid();
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
					uuid: uuid(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

/**
 * 	Retrieves the profile of the current user and adds it to the store
 */

const getCurrentProfileAction: ActionCreator<IGetCurrentProfileAction> = () => ({
	type: ActionTypes.GET_CURRENT_PROFILE,
});

const syncGetCurrentProfileAction: ActionCreator<ISyncGetCurrentProfileAction> = (
	input: IGetCurrentProfileInput,
) => ({
	type: ActionTypes.SYNC_GET_CURRENT_PROFILE,
	payload: input,
});

export const getCurrentProfile = (initial: boolean = false): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();
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
			dispatch(syncGetCurrentProfileAction({ profile, initial }));
			await dispatch(getUserPosts(profile.alias));
		} catch (e) {
			console.log(e);
			await dispatch(
				setError({
					type: ActionTypes.GET_CURRENT_PROFILE,
					error: e.message,
					uuid: uuid(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

/**
 * 	Retrieves the friends of the current user and adds them to the store
 */

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
	const activityId = uuid();
	const state = getState();
	const { alias } = state.auth.database.gun!;

	try {
		dispatch(getCurrentFriendsAction());
		await dispatch(
			beginActivity({
				uuid: activityId,
				type: ActionTypes.GET_CURRENT_FRIENDS,
			}),
		);

		const friends = await context.dataApi.profiles.getCurrentProfileFriends();
		dispatch(syncGetCurrentFriendsAction({ alias, friends }));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_CURRENT_FRIENDS,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

/**
 * 	Updates the profile of the current user
 */

const updateCurrentProfileAction: ActionCreator<IUpdateProfileAction> = (
	updateProfileInput: IUpdateProfileInput,
) => ({
	type: ActionTypes.UPDATE_PROFILE,
	payload: updateProfileInput,
});

export const updateCurrentProfile = (input: ISettingsInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const { dataApi, storageApi } = context;

	const activityId = uuid();
	try {
		dispatch(updateCurrentProfileAction(input));
		await dispatch(
			beginActivity({
				type: ActionTypes.UPDATE_PROFILE,
				uuid: activityId,
			}),
		);

		const { avatar, ...profileWithoutAvatar } = input;

		if (avatar.length > 0 && avatar.indexOf('Q') < 0) {
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

			const profile = {
				...profileWithoutAvatar,
				avatar: hash,
			};

			await dataApi.profiles.updateProfile(profile);
		} else {
			if (avatar && avatar.indexOf('Q') >= 0) {
				await dataApi.profiles.updateProfile(profileWithoutAvatar);
			} else {
				await dataApi.profiles.updateProfile(input);
			}
		}
		await dispatch(getCurrentProfile());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.UPDATE_PROFILE,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const addFriendAction: ActionCreator<IAddFriendAction> = () => ({
	type: ActionTypes.ADD_FRIEND,
});

/**
 *  Changes the status of the profile to PENDING and adds its alias to the friends array
 *  @param input an object that takes the alias of the current user and the alias of the target user
 */

const syncAddFriendAction: ActionCreator<ISyncAddFriendAction> = (input: IFriendInput) => ({
	type: ActionTypes.SYNC_ADD_FRIEND,
	payload: input,
});

/**
 *  Sends a friend request to a user
 *  @param input an object that takes the alias of the target user
 */

export const addFriend = (input: IAliasInput): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();
	const { alias: currentUserAlias } = getState().auth.database.gun!;

	try {
		dispatch(addFriendAction());
		await dispatch(
			beginActivity({
				type: ActionTypes.ADD_FRIEND,
				uuid: activityId,
				payload: input.username,
			}),
		);
		await context.dataApi.profiles.addFriend(input);
		dispatch(syncAddFriendAction({ currentUserAlias, alias: input.username }));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.ADD_FRIEND,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const removeFriendAction: ActionCreator<IRemoveFriendAction> = () => ({
	type: ActionTypes.REMOVE_FRIEND,
});

/**
 *  Changes the status of the profile to NOT_FRIEND and removes its alias from the friends array
 *  @param input an object that takes the alias of the current user and the alias of the target user
 */

const syncRemoveFriendAction: ActionCreator<ISyncRemoveFriendAction> = (input: IFriendInput) => ({
	type: ActionTypes.SYNC_REMOVE_FRIEND,
	payload: input,
});

/**
 *  Removes a friend from the profile
 *  @param input an object that takes the alias of the target user
 */

export const removeFriend = (input: IAliasInput): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();
	const { alias: currentUserAlias } = getState().auth.database.gun!;

	try {
		dispatch(removeFriendAction());
		await dispatch(
			beginActivity({
				type: ActionTypes.REMOVE_FRIEND,
				uuid: activityId,
			}),
		);
		await context.dataApi.profiles.removeFriend(input);
		dispatch(syncRemoveFriendAction({ currentUserAlias, alias: input.username }));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.REMOVE_FRIEND,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const acceptFriendAction: ActionCreator<IAcceptFriendAction> = () => ({
	type: ActionTypes.ACCEPT_FRIEND,
});

const syncAcceptFriendAction: ActionCreator<ISyncAcceptFriendAction> = (input: IFriendInput) => ({
	type: ActionTypes.SYNC_ACCEPT_FRIEND,
	payload: input,
});

export const acceptFriend = (input: IAliasInput): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();
	const { alias: currentUserAlias } = getState().auth.database.gun!;
	const {} = getState().data.notifications.all;

	try {
		dispatch(acceptFriendAction(input));
		await dispatch(
			beginActivity({
				type: ActionTypes.ACCEPT_FRIEND,
				uuid: activityId,
			}),
		);

		await context.dataApi.profiles.acceptFriend(input);
		dispatch(syncAcceptFriendAction({ currentUserAlias, alias: input.username }));
		dispatch(deleteNotification(input.id));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.ACCEPT_FRIEND,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const rejectFriendAction: ActionCreator<IRejectFriendAction> = () => ({
	type: ActionTypes.REJECT_FRIEND,
});

const syncRejectFriendAction: ActionCreator<ISyncRejectFriendAction> = (alias: string) => ({
	type: ActionTypes.SYNC_REJECT_FRIEND,
	payload: alias,
});

export const rejectFriend = (input: IAliasInput): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		dispatch(rejectFriendAction(input));
		await dispatch(
			beginActivity({
				type: ActionTypes.REJECT_FRIEND,
				uuid: activityId,
			}),
		);

		await context.dataApi.profiles.rejectFriend(input);
		dispatch(syncRejectFriendAction(input.username));
		dispatch(deleteNotification(input.id));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.REJECT_FRIEND,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const clearFriendResponseAction: ActionCreator<IClearFriendResponseAction> = () => ({
	type: ActionTypes.CLEAR_FRIEND_RESPONSE,
});

export const clearFriendResponse = (input: IAliasInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();

	try {
		dispatch(clearFriendResponseAction(input));
		await dispatch(
			beginActivity({
				type: ActionTypes.CLEAR_FRIEND_RESPONSE,
				uuid: activityId,
			}),
		);

		await context.dataApi.profiles.clearFriendResponse(input);
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.CLEAR_FRIEND_RESPONSE,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const undoRequestAction: ActionCreator<IUndoRequestAction> = () => ({
	type: ActionTypes.UNDO_REQUEST,
});

/**
 *  Changes the status of the profile to NOT_FRIEND and removes its alias from the friends array
 *  @param input an object that takes the alias of the current user and the alias of the target user
 */

const syncUndoRequestAction: ActionCreator<ISyncUndoRequestAction> = (input: IFriendInput) => ({
	type: ActionTypes.SYNC_UNDO_REQUEST,
	payload: input,
});

/**
 *  Cancels a sent friend request
 *  @param input an object that takes the alias of the target user
 */

export const undoRequest = (input: IAliasInput): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();
	const { alias: currentUserAlias } = getState().auth.database.gun!;

	try {
		dispatch(undoRequestAction());
		await dispatch(
			beginActivity({
				type: ActionTypes.UNDO_REQUEST,
				uuid: activityId,
			}),
		);

		await context.dataApi.profiles.clearFriendRequest(input);
		dispatch(syncUndoRequestAction({ currentUserAlias, alias: input.username }));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.UNDO_REQUEST,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

/**
 * 	Dispatched when we create a new post or we fetch some posts, adds it/them to the profile of the owner.
 *  @param input an object that takes the alias of the user and an array of post ids
 */

export const addPostsToProfile: ActionCreator<IAddPostsToProfileAction> = (
	input: IAddPostsToProfileInput,
) => ({
	type: ActionTypes.ADD_POSTS_TO_PROFILE,
	payload: input,
});

/**
 * 	Dispatched when we remove a post, removes it from the profile of the owner.
 *  @param input an object that takes the alias of the user and the id of the post being removed
 */

export const removePostFromProfile: ActionCreator<IRemovePostFromProfileAction> = (
	input: IRemovePostFromProfileInput,
) => ({
	type: ActionTypes.REMOVE_POST_FROM_PROFILE,
	payload: input,
});

/**
 * 	Searches the store for profiles that match the term
 *  @param input an object that takes the alias of the current user and the term used for search
 */

export const searchForProfilesLocally: ActionCreator<ISearchForProfilesLocallyAction> = (
	input: ISearchWithAliasInput,
) => ({
	type: ActionTypes.SEARCH_FOR_PROFILES_LOCALLY,
	payload: input,
});

export const searchForProfilesAction: ActionCreator<ISearchForProfilesAction> = () => ({
	type: ActionTypes.SEARCH_FOR_PROFILES,
});

/**
 * 	Adds the profiles returned by the search to the store
 *  @param profiles an array of profiles
 */

export const syncSearchForProfilesAction: ActionCreator<ISyncSearchForProfilesAction> = (
	input: ISearchWithProfilesInput,
) => ({
	type: ActionTypes.SYNC_SEARCH_FOR_PROFILES,
	payload: input,
});

/**
 *  Searches and returns profiles based on the search term
 *  @param input an object that takes the search term and a limit of how many profiles to be returned
 */

export const searchForProfiles = (input: ISearchInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();
	const { term } = input;

	if (term.length > 0) {
		try {
			dispatch(searchForProfilesAction(term));
			await dispatch(
				beginActivity({
					type: ActionTypes.SEARCH_FOR_PROFILES,
					uuid: activityId,
				}),
			);

			const profiles = await context.dataApi.profiles.searchByFullName(input);
			dispatch(syncSearchForProfilesAction({ term, profiles }));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.SEARCH_FOR_PROFILES,
					error: e.message,
					uuid: uuid(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

/**
 * 	Removes the previously searched profiles from the store
 */

export const clearSearchResults: ActionCreator<IClearSearchResultsAction> = () => ({
	type: ActionTypes.CLEAR_SEARCH_RESULTS,
});

/**
 * 	Syncs the store with the profiles received from notifications
 *  @param profiles an array of the profiles to be synced with the store
 */

export const syncExternalProfiles: ActionCreator<ISyncExternalProfilesAction> = (
	profiles: IProfile[],
) => ({
	type: ActionTypes.SYNC_EXTERNAL_PROFILES,
	payload: profiles,
});
