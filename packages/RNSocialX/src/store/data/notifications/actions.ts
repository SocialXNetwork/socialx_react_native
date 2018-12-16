import { ICreateNotification, INotificationReturnData } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { syncExternalProfiles } from '../profiles';
import {
	ActionTypes,
	ICreateNotificationAction,
	IFriendRequests,
	IFriendResponses,
	IGetNotificationsAction,
	IHookNotificationsAction,
	IMarkNotificationsAsReadAction,
	ISyncFriendRequestsAction,
	ISyncFriendResponsesAction,
	ISyncNotificationsAction,
	IUnreadNotificationsInput,
} from './Types';

const createNotificationAction: ActionCreator<ICreateNotificationAction> = (
	createNotificationInput: ICreateNotification,
) => ({
	type: ActionTypes.CREATE_NOTIFICATION,
	payload: createNotificationInput,
});

export const createNotification = (createNotificationInput: ICreateNotification): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(createNotificationAction(createNotificationInput));
			await dispatch(
				beginActivity({
					type: ActionTypes.CREATE_NOTIFICATION,
					uuid: activityId,
				}),
			);
			const { dataApi } = context;
			await dataApi.notifications.createNotification(createNotificationInput);
			await dispatch(getNotifications());
		} catch (e) {
			/**/
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

export const getNotificationsAction: ActionCreator<IGetNotificationsAction> = () => ({
	type: ActionTypes.GET_CURRENT_NOTIFICATIONS,
});

export const syncNotificationsAction: ActionCreator<ISyncNotificationsAction> = (
	notifications: INotificationReturnData[],
) => ({
	type: ActionTypes.SYNC_CURRENT_NOTIFICATIONS,
	payload: notifications,
});

export const getNotifications = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		dispatch(getNotificationsAction());
		await dispatch(
			beginActivity({
				uuid: activityId,
				type: ActionTypes.GET_CURRENT_NOTIFICATIONS,
			}),
		);

		const notifications = await context.dataApi.notifications.getNotifications();
		dispatch(syncNotificationsAction(notifications));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_CURRENT_NOTIFICATIONS,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

export const hookNotificationsAction: ActionCreator<IHookNotificationsAction> = () => ({
	type: ActionTypes.HOOK_NOTIFICATIONS,
});

export const syncFriendRequestsAction: ActionCreator<ISyncFriendRequestsAction> = (
	requests: IFriendRequests,
) => ({
	type: ActionTypes.SYNC_FRIEND_REQUESTS,
	payload: requests,
});

export const syncFriendResponsesAction: ActionCreator<ISyncFriendResponsesAction> = (
	responses: IFriendResponses,
) => ({
	type: ActionTypes.SYNC_FRIEND_RESPONSES,
	payload: responses,
});

export const hookNotifications = (): IThunk => async (dispatch, getState, context) => {
	dispatch(hookNotificationsAction());

	context.dataApi.hooks.hookFriendRequests((friendRequests) => {
		dispatch(syncFriendRequestsAction(friendRequests.requests));
		dispatch(syncExternalProfiles(friendRequests.profiles));
	});
	context.dataApi.hooks.hookFriendResponses((friendResponses) => {
		dispatch(syncFriendResponsesAction(friendResponses.responses));
		dispatch(syncExternalProfiles(friendResponses.profiles));
	});
};

const markNotificationsAsReadAction: ActionCreator<IMarkNotificationsAsReadAction> = (
	input: IUnreadNotificationsInput,
) => ({
	type: ActionTypes.MARK_NOTIFICATIONS_AS_READ,
	payload: input,
});

export const markNotificationsAsRead = (input: IUnreadNotificationsInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	const activityId = uuid();

	try {
		dispatch(markNotificationsAsReadAction(input));
		await dispatch(
			beginActivity({
				uuid: activityId,
				type: ActionTypes.MARK_NOTIFICATIONS_AS_READ,
			}),
		);

		await context.dataApi.profiles.readFriendRequests(input.unreadRequests);
		await context.dataApi.profiles.readFriendRequests(input.unreadResponses);
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.MARK_NOTIFICATIONS_AS_READ,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};
