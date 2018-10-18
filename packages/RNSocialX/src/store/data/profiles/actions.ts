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
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import {
	ActionTypes,
	IAcceptFriendAction,
	IAddFriendAction,
	IGetCurrentProfileAction,
	IGetProfileByUsernameAction,
	IGetProfilesByPostsAction,
	IRemoveFriendAction,
	ISearchProfilesByFullNameAction,
	ISearchProfilesByFullNameInput,
	ISyncGetCurrentProfileAction,
	ISyncGetProfileByUsernameAction,
	ISyncGetProfilesByPostsAction,
	ISyncSearchProfilesByFullNameAction,
	IUpdateProfileAction,
	IUsernameInput,
} from './Types';

const getProfilesByPostsAction: ActionCreator<IGetProfilesByPostsAction> = (
	posts: IPostArrayData,
) => ({
	type: ActionTypes.GET_PROFILES_BY_POSTS,
	payload: posts,
});

const syncGetProfilesByPostsAction: ActionCreator<
	ISyncGetProfilesByPostsAction
> = (profiles: IProfileData[]) => ({
	type: ActionTypes.SYNC_GET_PROFILES_BY_POSTS,
	payload: profiles,
});

export const getProfilesByPosts = (
	getProfileByPostsInput: IPostArrayData,
): IThunk => async (dispatch, getState, context) => {
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

export const searchProfilesByFullNameAction: ActionCreator<
	ISearchProfilesByFullNameAction
> = (searchProfilesByFullNameInput: any) => ({
	type: ActionTypes.SEARCH_PROFILES_BY_FULLNAME,
	payload: searchProfilesByFullNameInput,
});

export const syncSearchProfilesByFullNameAction: ActionCreator<
	ISyncSearchProfilesByFullNameAction
> = (profiles: IProfileData[]) => ({
	type: ActionTypes.SYNC_SEARCH_PROFILES_BY_FULLNAME,
	payload: profiles,
});

export const searchProfilesByFullName = ({
	term,
	maxResults,
}: ISearchProfilesByFullNameInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(searchProfilesByFullNameAction({ term, maxResults }));
			await dispatch(
				beginActivity({
					type: ActionTypes.SEARCH_PROFILES_BY_FULLNAME,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			const profiles = await dataApi.profiles.searchByFullName({
				textSearch: term,
				maxResults,
			});
			await dispatch(syncSearchProfilesByFullNameAction(profiles));
		} catch (e) {
			await dispatch(
				setError({
					type: ActionTypes.SYNC_SEARCH_PROFILES_BY_FULLNAME,
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
			const profile = await dataApi.profiles.getProfileByUsername(
				getProfileByUsernameInput,
			);
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
			const { dataApi } = context;
			const profile = await dataApi.profiles.getCurrentProfile();
			await dispatch(syncGetCurrentProfileAction(profile));
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

export const updateCurrentProfile = (
	updateProfileInput: IUpdateProfileInput,
): IThunk => async (dispatch, getState, context) => {
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
			const { dataApi } = context;
			await dataApi.profiles.updateProfile(updateProfileInput);
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

export const removeFriend = (
	removeFriendInput: IRemoveFriendInput,
): IThunk => async (dispatch, getState, context) => {
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

export const acceptFriend = (
	acceptFriendInput: IAcceptFriendInput,
): IThunk => async (dispatch, getState, context) => {
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
