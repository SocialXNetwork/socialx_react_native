import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

import { IMedia, IOptionsMenuItem } from '../../../types';
export { IOptionsMenuItem } from '../../../types';

export type IState = DeepReadonly<{
	optionsMenu: IOptionsMenuItem[];
	media: IMediaInput;
}>;

export const enum ActionTypes {
	SHOW_OPTIONS_MENU = 'ui/overlays/SHOW_OPTIONS_MENU',
	HIDE_OPTIONS_MENU = 'ui/overlays/HIDE_OPTIONS_MENU',
	SHOW_MEDIA = 'ui/overlays/SHOW_MEDIA',
	HIDE_MEDIA = 'ui/overlays/HIDE_MEDIA',
}

export interface IMediaInput {
	items: IMedia[];
	startIndex?: number;
	postId?: string;
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
	payload: IMediaInput;
}

export interface IHideMediaAction extends Action {
	type: ActionTypes.HIDE_MEDIA;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IShowOptionsMenuAction
	| IHideOptionsMenuAction
	| IShowMediaAction
	| IHideMediaAction
	| IResetStoreAction;
