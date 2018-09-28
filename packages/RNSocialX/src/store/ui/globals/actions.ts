import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import { ActionTypes, IGlobal, ISetGlobalAction } from './Types';

const setGlobalAction: ActionCreator<ISetGlobalAction> = (global: IGlobal) => ({
	type: ActionTypes.SET_GLOBAL,
	payload: global,
});

export const setGlobal = (global: IGlobal): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(setGlobalAction(global));
	} catch (e) {
		/**/
	}
};
