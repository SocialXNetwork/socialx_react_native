import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import { ActionTypes, ISetNavigationParamsAction, ISetNavigationParamsInput } from './Types';

const setNavigationParamsAction: ActionCreator<ISetNavigationParamsAction> = (
	setNavigationParamsInput: ISetNavigationParamsInput,
) => ({
	type: ActionTypes.SET_NAVIGATION_PARAMS,
	payload: setNavigationParamsInput,
});

export const setNavigationParams = (
	setNavigationParamsInput: ISetNavigationParamsInput,
): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(setNavigationParamsAction(setNavigationParamsInput));
	} catch (e) {
		/**/
	}
};

export const clearNavigationParams = ({ screenName }: { screenName: string }): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		await dispatch(setNavigationParams({ screenName, params: {} }));
	} catch (e) {
		/**/
	}
};
