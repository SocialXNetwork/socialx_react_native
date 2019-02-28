import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';
import { MESSAGE_TYPES } from '../../../types';

export interface IMessage {
	id: string;
	type: MESSAGE_TYPES;
	content: string;
	timestamp: number;
	self?: boolean;
	seen?: boolean;
	sent?: boolean;
	consecutive: {
		first: boolean;
		middle: boolean;
		last: boolean;
	};
}

export interface IMessages {
	[alias: string]: IMessage[];
}

export type IState = DeepReadonly<{
	messages: IMessages;
}>;

export const enum ActionTypes {
	GET_MESSAGES = 'data/messages/GET_MESSAGES',
	SYNC_GET_MESSAGES = 'data/messages/SYNC_GET_MESSAGES',
	SEND_MESSAGE = 'data/messages/SEND_MESSAGE',
	UPDATE_MESSAGE = 'data/messages/UPDATE_MESSAGE',
	DELETE_MESSAGE = 'data/messages/DELETE_MESSAGE',
}

export interface ISendMessageInput {
	alias: string;
	message: IMessage;
}

export interface IUpdateMessageInput {
	id: string;
	alias: string;
	consecutive: {
		first?: boolean;
		middle?: boolean;
		last?: boolean;
	};
}

export interface IDeleteMessageInput {
	id: string;
	alias: string;
}

export interface IGetMessagesAction extends Action {
	type: ActionTypes.GET_MESSAGES;
}

export interface ISyncGetMessagesAction extends Action {
	type: ActionTypes.SYNC_GET_MESSAGES;
	payload: IMessages;
}

export interface ISendMessageAction extends Action {
	type: ActionTypes.SEND_MESSAGE;
	payload: ISendMessageInput;
}

export interface IUpdateMessageAction extends Action {
	type: ActionTypes.UPDATE_MESSAGE;
	payload: IUpdateMessageInput;
}

export interface IDeleteMessageAction extends Action {
	type: ActionTypes.DELETE_MESSAGE;
	payload: IDeleteMessageInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}

export type IAction =
	| IGetMessagesAction
	| ISyncGetMessagesAction
	| ISendMessageAction
	| IUpdateMessageAction
	| IDeleteMessageAction
	| IResetStoreAction;
