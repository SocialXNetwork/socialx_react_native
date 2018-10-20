import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export const enum AvailableLocales {
	EN = 'en',
	ES = 'es',
}

export type IAvailableLocales = AvailableLocales.EN | AvailableLocales.ES;

export interface ILocaleDictionary {
	[key: string]: string;
}

export interface IDictionary {
	[AvailableLocales.EN]: ILocaleDictionary;
	[AvailableLocales.ES]: ILocaleDictionary;
}

export type IState = DeepReadonly<{
	currentLocale: IAvailableLocales;
	dictionary: IDictionary;
}>;

export const enum ActionTypes {
	SET_LOCALE = 'app/i18n/SET_LOCALE',
	REHYDRATE = 'persist/REHYDRATE', // just to keep TS clean we redefine this here, originally in "redux-persist"
}

export interface ISetLocaleInput {
	locale: IAvailableLocales;
}

export interface ISetLocaleAction extends Action {
	type: ActionTypes.SET_LOCALE;
	payload: ISetLocaleInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}

interface IRehydrateAction {
	type: ActionTypes.REHYDRATE;
	payload: any;
}

export type IAction = IResetStoreAction | ISetLocaleAction | IRehydrateAction;
