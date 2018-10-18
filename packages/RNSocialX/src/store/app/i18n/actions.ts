import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { setError } from '../../ui/activities';
import {
	ActionTypes,
	IAvailableLocales,
	ISetLocaleAction,
	ISetLocaleInput,
} from './Types';

const setLocaleAction: ActionCreator<ISetLocaleAction> = (
	locale: IAvailableLocales,
) => ({
	type: ActionTypes.SET_LOCALE,
	payload: {
		locale,
	},
});

export const setLocale = (setLocaleInput: ISetLocaleInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(setLocaleAction(setLocaleInput));
	} catch (e) {
		dispatch(
			await setError({
				type: ActionTypes.SET_LOCALE,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};
