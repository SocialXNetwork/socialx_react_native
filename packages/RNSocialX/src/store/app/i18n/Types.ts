import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

export const enum Locales {
	EN = 'english',
	ES = 'spanish',
}

export type ILocales = Locales.EN | Locales.ES;

export interface IDictionary {
	[Locales.EN]: ILocaleDictionary;
	// [Locales.ES]: ILocaleDictionary;
}

export type IState = DeepReadonly<{
	currentLocale: ILocales;
	dictionary: IDictionary;
	locale: ILocales;
}>;

export const enum ActionTypes {
	SET_LOCALE = 'app/i18n/SET_LOCALE',
	REHYDRATE = 'persist/REHYDRATE', // just to keep TS clean we redefine this here, originally in "redux-persist"
}

export interface ISetLocaleInput {
	locale: ILocales;
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

export interface ILocaleDictionary {
	errors: {
		[key: string]: string;
	};
	screens: {
		loading: {
			[key: string]: string;
		};
		launch: {
			name: string;
			description: string;
			rewards: string;
			login: string;
			register: string;
		};
		createPost: {
			title: string;
		};
		userProfile: {
			title: string;
			posts: string;
			gallery: string;
		};
		myProfile: {
			title: string;
			posts: string;
			gallery: string;
			analytics: string;
			wallet: string;
			settings: string;
			logout: string;
		};
		friends: {
			title: string;
		};
		likes: {
			title: string;
		};
	};
	components: {
		buttons: {
			media: string;
			createPost: string;
			video: {
				replay: string;
			};
			seeAllFriends: string;
			editProfile: string;
			message: string;
		};
		inputs: {
			placeholders: {
				caption: string;
			};
		};
		modals: {
			options: {
				gallery: string;
				camera: string;
			};
		};
		displayers: {
			mediaInfo: {
				title: string;
				hash: string;
				size: string;
				type: string;
				video: string;
				photo: string;
			};
		};
	};
}
