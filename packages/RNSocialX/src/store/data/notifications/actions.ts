import { ICreateNotification } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { NOTIFICATION_TYPES } from '../../../environment/consts';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { syncExternalProfiles } from '../profiles';
import {
	ActionTypes,
	ICreateNotificationAction,
	IGetNotificationsAction,
	IHookNotificationsAction,
	IMarkNotificationsAsReadAction,
	INotifications,
	ISyncNotificationsAction,
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
	type: ActionTypes.GET_NOTIFICATIONS,
});

export const syncNotificationsAction: ActionCreator<ISyncNotificationsAction> = (
	notifications: INotifications,
) => ({
	type: ActionTypes.SYNC_NOTIFICATIONS,
	payload: notifications,
});

export const getNotifications = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		dispatch(getNotificationsAction());
		await dispatch(
			beginActivity({
				uuid: activityId,
				type: ActionTypes.GET_NOTIFICATIONS,
			}),
		);

		const notifications = await context.dataApi.notifications.getNotifications();
		dispatch(syncNotificationsAction(notifications));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_NOTIFICATIONS,
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

export const hookNotifications = (): IThunk => async (dispatch, getState, context) => {
	dispatch(hookNotificationsAction());

	await context.dataApi.hooks.hookFriendRequests((friendRequests) => {
		dispatch(syncNotificationsAction(friendRequests.requests));
		dispatch(syncExternalProfiles(friendRequests.profiles));
	});
	await context.dataApi.hooks.hookFriendResponses((friendResponses) => {
		dispatch(syncNotificationsAction(friendResponses.responses));
		dispatch(syncExternalProfiles(friendResponses.profiles));
	});
};

const markNotificationsAsReadAction: ActionCreator<IMarkNotificationsAsReadAction> = () => ({
	type: ActionTypes.MARK_NOTIFICATIONS_AS_READ,
});

export const markNotificationsAsRead = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();
	const { all, unread } = getState().data.notifications;

	const unreadReqs = [];
	const unreadResps = [];

	for (const id of unread) {
		if (all[id].type === NOTIFICATION_TYPES.FRIEND_REQUEST) {
			unreadReqs.push({ username: all[id].owner.alias });
		} else {
			unreadResps.push({ username: all[id].owner.alias });
		}
	}

	try {
		dispatch(markNotificationsAsReadAction());
		await dispatch(
			beginActivity({
				uuid: activityId,
				type: ActionTypes.MARK_NOTIFICATIONS_AS_READ,
			}),
		);

		await context.dataApi.profiles.readFriendRequests(unreadReqs);
		await context.dataApi.profiles.readFriendRequests(unreadResps);
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
