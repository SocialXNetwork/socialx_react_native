import { IPostReturnData } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import {
	ActionTypes,
	IGetUserEventsAction,
	IGetUserEventsInput,
	ISyncGetUserEventsAction,
	ISyncGetUserEventsInput,
} from './Types';

export const getUserEventsAction: ActionCreator<IGetUserEventsAction> = (
	getUserEventsInput: IGetUserEventsInput,
) => ({
	type: ActionTypes.GET_USER_EVENTS,
});

export const syncGetUserEventsAction: ActionCreator<ISyncGetUserEventsAction> = (
	syncGetUserEventsInput: ISyncGetUserEventsInput,
) => ({
	type: ActionTypes.SYNC_GET_USER_EVENTS,
	payload: syncGetUserEventsInput,
});

export const getUserEvents = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();

	try {
		dispatch(getUserEventsAction());
		await dispatch(
			beginActivity({
				type: ActionTypes.GET_USER_EVENTS,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const userPosts = await dataApi.notifications.getNotifications();
		dispatch(
			syncGetUserEventsAction({
				posts: userPosts,
				owner: getUserEventsInput.username,
			}),
		);
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SYNC_GET_USER_EVENTS,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

// TODO: reset user events
