import {
	ICreateNotification,
	IFriendRequest,
	IFriendResponse,
	INotificationReturnData,
	IRemoveNotificationInput,
} from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { beginActivity, endActivity } from '../../ui/activities';
import {
	ActionTypes,
	ICreateNotificationAction,
	IGetNotificationsAction,
	IHookNotificationsAction,
	IRemoveNotificationAction,
	ISyncFriendRequestsAction,
	ISyncFriendResponsesAction,
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
	const activityId = uuidv4();
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

const removeNotificationAction: ActionCreator<IRemoveNotificationAction> = (
	removeNotificationInput: IRemoveNotificationInput,
) => ({
	type: ActionTypes.REMOVE_NOTIFICATION,
	payload: removeNotificationInput,
});

// ! not in use
export const removeNotification = (
	removeNotificationInput: IRemoveNotificationInput,
): IThunk => async (dispatch, getState, context) => {
	// const activityId = uuidv4();
	// const storeState = getState();
	// const auth = storeState.auth.database.gun;
	// if (auth && auth.alias) {
	// 	try {
	// 		dispatch(removeNotificationAction(removeNotificationInput));
	// 		await dispatch(
	// 			beginActivity({
	// 				type: ActionTypes.REMOVE_NOTIFICATION,
	// 				uuid: activityId,
	// 			}),
	// 		);
	// 		const { dataApi } = context;
	// 		await dataApi.notifications.removeNotification(removeNotificationInput);
	// 		await dispatch(getNotifications());
	// 	} catch (e) {
	// 		/**/
	// 	} finally {
	// 		await dispatch(endActivity({ uuid: activityId }));
	// 	}
	// }
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
	const activityId = uuidv4();
	const storeState = getState();
	const auth = storeState.auth.database.gun;
	if (auth && auth.alias) {
		try {
			dispatch(getNotificationsAction());
			await dispatch(
				beginActivity({
					uuid: activityId,
					type: ActionTypes.GET_CURRENT_NOTIFICATIONS,
				}),
			);
			const { dataApi } = context;
			const notifications = await dataApi.notifications.getNotifications();
			dispatch(syncNotificationsAction(notifications));
		} catch (e) {
			/**/
		} finally {
			await dispatch(endActivity({ uuid: activityId }));
		}
	}
};

export const hookNotificationsAction: ActionCreator<IHookNotificationsAction> = () => ({
	type: ActionTypes.HOOK_NOTIFICATIONS,
});

export const syncFriendRequestsAction: ActionCreator<ISyncFriendRequestsAction> = (
	friendRequests: IFriendRequest[],
) => ({
	type: ActionTypes.SYNC_FRIEND_REQUESTS,
	payload: friendRequests,
});

export const syncFriendResponsesAction: ActionCreator<ISyncFriendResponsesAction> = (
	friendResponses: IFriendResponse[],
) => ({
	type: ActionTypes.SYNC_FRIEND_RESPONSES,
	payload: friendResponses,
});

export const hookNotifications = (): IThunk => async (dispatch, getState, context) => {
	dispatch(hookNotificationsAction());
	const { dataApi } = context;
	dataApi.hooks.hookFriendRequests((friendRequests) =>
		dispatch(syncFriendRequestsAction(friendRequests)),
	);
	dataApi.hooks.hookFriendResponses((friendResponses) =>
		dispatch(syncFriendResponsesAction(friendResponses)),
	);
};
