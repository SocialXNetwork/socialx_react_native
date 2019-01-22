import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { IOptionsMenuItem } from '../../../types';
import { IThunk } from '../../types';
import { setError } from '../../ui/activities';
import {
	ActionTypes,
	IHideMediaAction,
	IHideModalAction,
	IHideOptionsMenuAction,
	IMediaOverlay,
	IModalOverlay,
	IShowMediaAction,
	IShowModalAction,
	IShowOptionsMenuAction,
} from './Types';

const showModalAction: ActionCreator<IShowModalAction> = (input: IModalOverlay) => ({
	type: ActionTypes.SHOW_MODAL,
	payload: input,
});

export const showModal = (input: IModalOverlay): IThunk => async (dispatch) => {
	try {
		dispatch(showModalAction(input));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SHOW_MODAL,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};

const hideModalAction: ActionCreator<IHideModalAction> = () => ({
	type: ActionTypes.HIDE_MODAL,
});

export const hideModal = (): IThunk => async (dispatch) => {
	try {
		dispatch(hideModalAction());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.HIDE_MODAL,
				error: e.message,
				uuid: uuid(),
			}),
		);
	}
};

const showOptionsMenuAction: ActionCreator<IShowOptionsMenuAction> = (
	items: IOptionsMenuItem[],
) => ({
	type: ActionTypes.SHOW_OPTIONS_MENU,
	payload: items,
});

export const showOptionsMenu = (items: IOptionsMenuItem[]): IThunk => async (dispatch) => {
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

export const hideOptionsMenu = (): IThunk => async (dispatch) => {
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

const showMediaAction: ActionCreator<IShowMediaAction> = (input: IMediaOverlay) => ({
	type: ActionTypes.SHOW_MEDIA,
	payload: input,
});

export const showMedia = (input: IMediaOverlay): IThunk => async (dispatch) => {
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
