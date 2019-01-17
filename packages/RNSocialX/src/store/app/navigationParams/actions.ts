import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import { ActionTypes, ISetNavigationParamsAction, ISetNavigationParamsInput } from './Types';

const setNavigationParamsAction: ActionCreator<ISetNavigationParamsAction> = (
	input: ISetNavigationParamsInput,
) => ({
	type: ActionTypes.SET_NAVIGATION_PARAMS,
	payload: input,
});

export const setNavigationParams = (input: ISetNavigationParamsInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(setNavigationParamsAction(input));
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
