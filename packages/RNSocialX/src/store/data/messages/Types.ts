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
	consecutive?: {
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
}

export interface IGetMessagesAction extends Action {
	type: ActionTypes.GET_MESSAGES;
}

export interface ISyncGetMessagesAction extends Action {
	type: ActionTypes.SYNC_GET_MESSAGES;
	payload: IMessages;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}

export type IAction = IGetMessagesAction | ISyncGetMessagesAction | IResetStoreAction;
