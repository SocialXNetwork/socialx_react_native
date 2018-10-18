import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { setError } from '../../ui/activities';
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
		await dispatch(
			setError({
				type: ActionTypes.SET_GLOBAL,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};
