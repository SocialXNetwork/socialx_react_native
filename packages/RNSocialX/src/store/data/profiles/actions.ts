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
import { setGlobal } from '../../ui/globals';
import { getUserPosts } from '../posts';
import {
	ActionTypes,
	IAcceptFriendAction,
	IAddFriendAction,
	IAddPostsToProfileAction,
	IAddPostsToProfileInput,
	IAliasInput,
	IClearFriendResponseAction,
	IFriendInput,
	IGetCurrentFriendsAction,
	IGetCurrentProfileAction,
	IGetProfileByAliasAction,
	IGetProfilesByPostsAction,
	IProfile,
	IRejectFriendAction,
	IRemoveFriendAction,
	IRemovePostFromProfileAction,
	IRemovePostFromProfileInput,
	ISearchForProfilesAction,
	ISearchInput,
	ISyncFriendsInput,
	ISyncGetCurrentFriendsAction,
	ISyncGetCurrentProfileAction,
	ISyncGetProfileByAliasAction,
	ISyncGetProfilesByPostsAction,
	ISyncSearchForProfilesAction,
	ISyncSearchInput,
	ISyncUndoRequestAction,
	IUndoRequestAction,
	IUpdateProfileAction,
	IUpdateProfileInput as ISettingsInput,
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

/**
 * 	Retrieves the profile of the current user
 *  and adds it to the store
 */

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

/**
 * 	Retrieves the friends of the current user
 * 	and adds them to the store
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

	const activityId = uuidv4();
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
				uuid: uuidv4(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
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

const undoRequestAction: ActionCreator<IUndoRequestAction> = (input: IAliasInput) => ({
	type: ActionTypes.UNDO_REQUEST,
	payload: input,
});

const syncUndoRequestAction: ActionCreator<ISyncUndoRequestAction> = (input: IFriendInput) => ({
	type: ActionTypes.SYNC_UNDO_REQUEST,
	payload: input,
});

export const undoRequest = (input: IAliasInput): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	const { alias: currentUserAlias } = getState().auth.database.gun!;

	try {
		dispatch(undoRequestAction(input));
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
				uuid: uuidv4(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

/**
 * 	Dispatched when we create a new post or we fetch
 * 	some posts, adds it/them to the profile of the owner.
 *  @param input an object that takes the alias of the user and an array of post ids
 */

export const addPostsToProfile: ActionCreator<IAddPostsToProfileAction> = (
	input: IAddPostsToProfileInput,
) => ({
	type: ActionTypes.ADD_POSTS_TO_PROFILE,
	payload: input,
});

/**
 * 	Dispatched when we remove a post,
 * 	removes it from the profile of the owner.
 *  @param input an object that takes the alias of the user and the id of the post being removed
 */

export const removePostFromProfile: ActionCreator<IRemovePostFromProfileAction> = (
	input: IRemovePostFromProfileInput,
) => ({
	type: ActionTypes.REMOVE_POST_FROM_PROFILE,
	payload: input,
});

/**
 * 	Removes the previously searched profiles from the store
 *  @param aliases an array of aliases
 */

export const searchForProfilesAction: ActionCreator<ISearchForProfilesAction> = (
	aliases: string[],
) => ({
	type: ActionTypes.SEARCH_FOR_PROFILES,
	payload: aliases,
});

/**
 * 	Adds the profiles returned by the search to the store
 *  @param profiles an array of profiles
 */

export const syncSearchForProfilesAction: ActionCreator<ISyncSearchForProfilesAction> = (
	input: ISyncSearchInput,
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
	const activityId = uuidv4();
	const store = getState();
	const { aliasesToRemove } = store.ui.globals;

	if (input.term.length > 0) {
		try {
			dispatch(searchForProfilesAction(aliasesToRemove));
			await dispatch(
				beginActivity({
					type: ActionTypes.SEARCH_FOR_PROFILES,
					uuid: activityId,
				}),
			);

			const profiles = await context.dataApi.profiles.searchByFullName(input);
			const aliases = profiles.map((profile) => profile.alias);

			dispatch(syncSearchForProfilesAction({ profiles, aliases }));
			await dispatch(setGlobal({ aliasesToRemove: aliases }));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.SEARCH_FOR_PROFILES,
					error: e.message,
					uuid: uuidv4(),
				}),
			);
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};
