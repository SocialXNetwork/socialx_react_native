import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
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
		/**/
	}
};
