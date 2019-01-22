import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

import { IMedia, IOptionsMenuItem, MODAL_TYPES } from '../../../types';

export interface IMediaOverlay {
	items: IMedia[];
	startIndex?: number;
	postId?: string;
}

export interface IModalOverlay {
	type: MODAL_TYPES | null;
	payload?: string;
}

export type IState = DeepReadonly<{
	modal: IModalOverlay;
	optionsMenu: IOptionsMenuItem[];
	media: IMediaOverlay;
}>;

export const enum ActionTypes {
	SHOW_MODAL = 'ui/overlays/SHOW_MODAL',
	HIDE_MODAL = 'ui/overlays/HIDE_MODAL',
	SHOW_OPTIONS_MENU = 'ui/overlays/SHOW_OPTIONS_MENU',
	HIDE_OPTIONS_MENU = 'ui/overlays/HIDE_OPTIONS_MENU',
	SHOW_MEDIA = 'ui/overlays/SHOW_MEDIA',
	HIDE_MEDIA = 'ui/overlays/HIDE_MEDIA',
}

export interface IShowModalAction extends Action {
	type: ActionTypes.SHOW_MODAL;
	payload: IModalOverlay;
}

export interface IHideModalAction extends Action {
	type: ActionTypes.HIDE_MODAL;
}

export interface IShowOptionsMenuAction extends Action {
	type: ActionTypes.SHOW_OPTIONS_MENU;
	payload: IOptionsMenuItem[];
}

export interface IHideOptionsMenuAction extends Action {
	type: ActionTypes.HIDE_OPTIONS_MENU;
}

export interface IShowMediaAction extends Action {
	type: ActionTypes.SHOW_MEDIA;
	payload: IMediaOverlay;
}

export interface IHideMediaAction extends Action {
	type: ActionTypes.HIDE_MEDIA;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IShowModalAction
	| IHideModalAction
	| IShowOptionsMenuAction
	| IHideOptionsMenuAction
	| IShowMediaAction
	| IHideMediaAction
	| IResetStoreAction;
