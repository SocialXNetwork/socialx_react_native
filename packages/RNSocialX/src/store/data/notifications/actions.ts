// todo @jake

import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import { ActionTypes, ICreateNotificationAction } from './Types';

const createNotificationAction: ActionCreator<
	ICreateNotificationAction
> = () => ({
	type: ActionTypes.CREATE_NOTIFICATION,
});

export const createNotification = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(createNotificationAction());
	} catch (e) {
		/**/
	}
};
