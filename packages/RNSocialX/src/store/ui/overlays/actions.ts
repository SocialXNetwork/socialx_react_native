import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { IThunk } from '../../types';
import { setError } from '../../ui/activities';
import {
	ActionTypes,
	IHideMediaAction,
	IHideOptionsMenuAction,
	IMediaInput,
	IOptionsMenuItem,
	IShowMediaAction,
	IShowOptionsMenuAction,
} from './Types';

const showOptionsMenuAction: ActionCreator<IShowOptionsMenuAction> = (
	items: IOptionsMenuItem[],
) => ({
	type: ActionTypes.SHOW_OPTIONS_MENU,
	payload: items,
});

export const showOptionsMenu = (items: IOptionsMenuItem[]): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(showOptionsMenuAction(items));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SHOW_OPTIONS_MENU,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};

const hideOptionsMenuAction: ActionCreator<IHideOptionsMenuAction> = () => ({
	type: ActionTypes.HIDE_OPTIONS_MENU,
});

export const hideOptionsMenu = (): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(hideOptionsMenuAction());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.HIDE_OPTIONS_MENU,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};

const showMediaAction: ActionCreator<IShowMediaAction> = (input: IMediaInput) => ({
	type: ActionTypes.SHOW_MEDIA,
	payload: input,
});

export const showMedia = (input: IMediaInput): IThunk => async (dispatch) => {
	try {
		dispatch(showMediaAction(input));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SHOW_MEDIA,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};

const hideMediaAction: ActionCreator<IHideMediaAction> = () => ({
	type: ActionTypes.HIDE_MEDIA,
});

export const hideMedia = (): IThunk => async (dispatch) => {
	try {
		dispatch(hideMediaAction());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.HIDE_MEDIA,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};
