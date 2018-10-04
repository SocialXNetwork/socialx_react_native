import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';
import { IDotsMenuItem } from '../../../components';
import { ISetAuthAction } from '../../app/auth/Types';

export interface IMessage {
	text: string;
}

export interface IModal {
	title: string;
	type: string;
}

export interface IConfirmation {
	title: string;
	message: string;
	confirmButtonLabel: string;
	cancelButtonLabel: string;
}

export interface IOptionsMenu {
	items: IDotsMenuItem[];
}

export type IState = DeepReadonly<{
	message: IMessage | null;
	modal: IModal | null;
	confirmation: IConfirmation | null;
	optionsMenu: IOptionsMenu | null;
}>;

export const enum ActionTypes {
	SHOW_MESSAGE = 'ui/overlays/SHOW_MESSAGE',
	HIDE_MESSAGE = 'ui/overlays/HIDE_MESSAGE',
	SHOW_MODAL = 'ui/overlays/SHOW_MODAL',
	HIDE_MODAL = 'ui/overlays/HIDE_MODAL',
	SHOW_CONFIRMATION = 'ui/overlays/SHOW_CONFIRMATION',
	HIDE_CONFIRMATION = 'ui/overlays/HIDE_CONFIRMATION',
	SHOW_OPTIONS_MENU = 'ui/overlays/SHOW_OPTIONS_MENU',
	HIDE_OPTIONS_MENU = 'ui/overlays/HIDE_OPTIONS_MENU',
}

export interface IShowMessageAction extends Action {
	type: ActionTypes.SHOW_MESSAGE;
	payload: IMessage;
}

export interface IHideMessageAction extends Action {
	type: ActionTypes.HIDE_MESSAGE;
}

export interface IShowModalAction extends Action {
	type: ActionTypes.SHOW_MODAL;
	payload: IModal;
}

export interface IHideModalAction extends Action {
	type: ActionTypes.HIDE_MODAL;
}

export interface IShowConfirmationAction extends Action {
	type: ActionTypes.SHOW_CONFIRMATION;
	payload: IConfirmation;
}

export interface IHideConfirmationAction extends Action {
	type: ActionTypes.HIDE_CONFIRMATION;
}

export interface IShowOptionsMenuAction extends Action {
	type: ActionTypes.SHOW_OPTIONS_MENU;
	payload: IOptionsMenu;
}

export interface IHideOptionsMenuAction extends Action {
	type: ActionTypes.HIDE_OPTIONS_MENU;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IResetStoreAction
	| IShowMessageAction
	| IHideMessageAction
	| IShowModalAction
	| IHideModalAction
	| IShowConfirmationAction
	| IHideConfirmationAction
	| IShowOptionsMenuAction
	| IHideOptionsMenuAction;
