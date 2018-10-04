import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { beginActivity, endActivity } from '../../ui/activities';
import { ActionTypes, IAuthData, ISetAuthAction } from './Types';

const setAuthAction: ActionCreator<ISetAuthAction> = (
	authData: IAuthData | null,
) => ({
	type: ActionTypes.SET_AUTH,
	payload: authData,
});

export const setAuth = (authData: IAuthData): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(setAuthAction(authData));
	} catch (e) {
		/**/
	}
};

export const clearAuth = (): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();
	try {
		dispatch(setAuthAction(null));

		dispatch(
			beginActivity({
				type: 'RESET_DATABASE_AND_STORE',
				uuid: activityId,
			}),
		);

		const { dataApi } = context;
		await dataApi.resetDatabase();
	} catch (e) {
		/**/
	} finally {
		dispatch(
			endActivity({
				uuid: activityId,
			}),
		);

		// What to do in case of dataApi.resetDatabase() error? We certainly need
		// some form of cleanup and we do indeed need to reset the database!
		dispatch({
			type: 'RESET_STORE',
		});
	}
};
