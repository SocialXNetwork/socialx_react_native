import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
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
	try {
		dispatch(setAuthAction(null));
	} catch (e) {
		/**/
	}
};
