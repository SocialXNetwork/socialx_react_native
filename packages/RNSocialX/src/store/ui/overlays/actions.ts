import { ActionCreator } from 'redux';
import { IThunk } from '../../types';
import {
	ActionTypes,
	IConfirmation,
	IHideConfirmationAction,
	IHideMessageAction,
	IHideModalAction,
	IMessage,
	IModal,
	IShowConfirmationAction,
	IShowMessageAction,
	IShowModalAction,
} from './Types';

const showModalAction: ActionCreator<IShowModalAction> = (modal: IModal) => ({
	type: ActionTypes.SHOW_MODAL,
	payload: modal,
});

export const showModal = (modal: IModal): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(showModalAction(modal));
	} catch (e) {
		/**/
	}
};

const hideModalAction: ActionCreator<IHideModalAction> = () => ({
	type: ActionTypes.HIDE_MODAL,
});

export const hideModal = (): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(hideModalAction());
	} catch (e) {
		/**/
	}
};

const showConfirmationAction: ActionCreator<IShowConfirmationAction> = (
	confirmation: IConfirmation,
) => ({
	type: ActionTypes.SHOW_CONFIRMATION,
	payload: confirmation,
});

export const showConfirmation = (modal: IConfirmation): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(showConfirmationAction(modal));
	} catch (e) {
		/**/
	}
};

const hideConfirmationAction: ActionCreator<IHideConfirmationAction> = () => ({
	type: ActionTypes.HIDE_CONFIRMATION,
});

export const hideConfirmation = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(hideConfirmationAction());
	} catch (e) {
		/**/
	}
};

// This can be converted to an array instead of an object, similar to
// ui/activities so that messages can be stacked and dismissed separately
// and even auto dismissed after T seconds!
const showMessageAction: ActionCreator<IShowMessageAction> = (
	message: IMessage,
) => ({
	type: ActionTypes.SHOW_MESSAGE,
	payload: message,
});

export const showMessage = (modal: IMessage): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(showMessageAction(modal));
	} catch (e) {
		/**/
	}
};

const hideMessageAction: ActionCreator<IHideMessageAction> = () => ({
	type: ActionTypes.HIDE_MESSAGE,
});

export const hideMessage = (): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(hideMessageAction());
	} catch (e) {
		/**/
	}
};
