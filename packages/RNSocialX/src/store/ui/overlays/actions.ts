import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { setError } from '../../ui/activities';
import {
	ActionTypes,
	IConfirmation,
	IHideConfirmationAction,
	IHideMessageAction,
	IHideModalAction,
	IHideOptionsMenuAction,
	IMessage,
	IModal,
	IOptionsMenu,
	IShowConfirmationAction,
	IShowMessageAction,
	IShowModalAction,
	IShowOptionsMenuAction,
} from './Types';

const showModalAction: ActionCreator<IShowModalAction> = (modal: IModal) => ({
	type: ActionTypes.SHOW_MODAL,
	payload: modal,
});

export const showModal = (modal: IModal): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(showModalAction(modal));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SHOW_MODAL,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};

const hideModalAction: ActionCreator<IHideModalAction> = () => ({
	type: ActionTypes.HIDE_MODAL,
});

export const hideModal = (): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(hideModalAction());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.HIDE_MODAL,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};

const showConfirmationAction: ActionCreator<IShowConfirmationAction> = (
	confirmation: IConfirmation,
) => ({
	type: ActionTypes.SHOW_CONFIRMATION,
	payload: confirmation,
});

export const showConfirmation = (confirmation: IConfirmation): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(showConfirmationAction(confirmation));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SHOW_CONFIRMATION,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};

const hideConfirmationAction: ActionCreator<IHideConfirmationAction> = () => ({
	type: ActionTypes.HIDE_CONFIRMATION,
});

export const hideConfirmation = (): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(hideConfirmationAction());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.HIDE_CONFIRMATION,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};

// This can be converted to an array instead of an object, similar to
// ui/activities so that messages can be stacked and dismissed separately
// and even auto dismissed after T seconds!
const showMessageAction: ActionCreator<IShowMessageAction> = (message: IMessage) => ({
	type: ActionTypes.SHOW_MESSAGE,
	payload: message,
});

export const showMessage = (message: IMessage): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(showMessageAction(message));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SHOW_MESSAGE,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};

const hideMessageAction: ActionCreator<IHideMessageAction> = () => ({
	type: ActionTypes.HIDE_MESSAGE,
});

export const hideMessage = (): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(hideMessageAction());
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.HIDE_MESSAGE,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	}
};

const showOptionsMenuAction: ActionCreator<IShowOptionsMenuAction> = (
	optionsMenu: IOptionsMenu,
) => ({
	type: ActionTypes.SHOW_OPTIONS_MENU,
	payload: optionsMenu,
});

export const showOptionsMenu = (optionsMenu: IOptionsMenu): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(showOptionsMenuAction(optionsMenu));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SHOW_OPTIONS_MENU,
				error: e.message,
				uuid: uuidv4(),
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
				uuid: uuidv4(),
			}),
		);
	}
};
