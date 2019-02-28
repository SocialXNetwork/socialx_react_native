import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import {
	ActionTypes,
	IDeleteMessageAction,
	IDeleteMessageInput,
	IGetMessagesAction,
	IMessages,
	ISendMessageAction,
	ISendMessageInput,
	ISyncGetMessagesAction,
	IUpdateMessageAction,
	IUpdateMessageInput,
} from './Types';

const getMessagesAction: ActionCreator<IGetMessagesAction> = () => ({
	type: ActionTypes.GET_MESSAGES,
});

const syncGetMessagesActions: ActionCreator<ISyncGetMessagesAction> = (messages: IMessages) => ({
	type: ActionTypes.SYNC_GET_MESSAGES,
	payload: messages,
});

export const getMessages = (): IThunk => async (dispatch) => {
	const activityId = uuid();

	try {
		dispatch(getMessagesAction());
		await dispatch(
			beginActivity({
				type: ActionTypes.GET_MESSAGES,
				uuid: activityId,
			}),
		);
		// GET MESSAGES
		dispatch(syncGetMessagesActions({}));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_MESSAGES,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

const sendMessageAction: ActionCreator<ISendMessageAction> = (input) => ({
	type: ActionTypes.SEND_MESSAGE,
	payload: input,
});

export const sendMessage = (input: ISendMessageInput): IThunk => async (dispatch) => {
	const activityId = uuid();

	try {
		dispatch(sendMessageAction(input));
		await dispatch(
			beginActivity({
				type: ActionTypes.SEND_MESSAGE,
				uuid: activityId,
			}),
		);
		// SEND MESSAGE
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SEND_MESSAGE,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

export const updateMessage: ActionCreator<IUpdateMessageAction> = (input: IUpdateMessageInput) => ({
	type: ActionTypes.UPDATE_MESSAGE,
	payload: input,
});

const deleteMessageAction: ActionCreator<IDeleteMessageAction> = (input) => ({
	type: ActionTypes.DELETE_MESSAGE,
	payload: input,
});

export const deleteMessage = (input: IDeleteMessageInput): IThunk => async (dispatch) => {
	const activityId = uuid();

	try {
		dispatch(deleteMessageAction(input));
		await dispatch(
			beginActivity({
				type: ActionTypes.DELETE_MESSAGE,
				uuid: activityId,
			}),
		);
		// DELETE MESSAGE
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.DELETE_MESSAGE,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};
