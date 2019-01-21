import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import { ActionTypes, IGetMessagesAction, IMessages, ISyncGetMessagesAction } from './Types';

const getMessagesAction: ActionCreator<IGetMessagesAction> = () => ({
	type: ActionTypes.GET_MESSAGES,
});

const syncGetMessagesActions: ActionCreator<ISyncGetMessagesAction> = (messages: IMessages) => ({
	type: ActionTypes.SYNC_GET_MESSAGES,
	payload: messages,
});

export const getMessages = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuid();

	try {
		dispatch(getMessagesAction());
		await dispatch(
			beginActivity({
				type: ActionTypes.GET_MESSAGES,
				uuid: activityId,
			}),
		);
		// GET MESSAGES
		dispatch(syncGetMessagesActions({}));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_MESSAGES,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};
