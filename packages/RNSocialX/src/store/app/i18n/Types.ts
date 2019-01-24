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
		login: {
			title: string;
			welcome: string;
			forgot: string;
			progress: string;
			account: string;
		};
		register: {
			title: string;
			progress: string;
			accept: string;
			terms: string;
		};
		settings: {
			title: string;
			progress: string;
			mining: {
				title: string;
				description: string;
			};
			share: {
				title: string;
				description: string;
			};
		};
		search: {
			top: string;
			people: string;
			tags: string;
			places: string;
			soon: string;
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
			login: string;
			signUp: string;
			register: string;
			saveChanges: string;
			editNodes: string;
			delete: string;
			cancel: string;
			send: string;
			view: string;
		};
		inputs: {
			placeholder: {
				caption: string;
				alias: string;
				password: string;
				confirm: string;
				email: string;
				name: string;
				description: string;
				comment: string;
			};
			email: {
				required: string;
				invalid: string;
			};
			name: {
				required: string;
				length: string;
			};
			alias: {
				required: string;
				length: string;
			};
			password: {
				required: string;
				length: string;
				mismatch: string;
			};
			description: {
				required: string;
				length: string;
			};
		};
		modals: {
			options: {
				gallery: string;
				camera: string;
				remove: string;
				copy: string;
				delete: string;
				block: string;
				report: string;
				deletePost: string;
			};
			report: {
				title: string;
				subject: {
					placeholder: string;
					required: string;
				};
				description: {
					placeholder: string;
					required: string;
				};
			};
			generic: {
				delete: {
					title: string;
					description: string;
				};
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
			wallPost: {
				other: string;
				others: string;
				liked: string;
				creating: string;
				more: string;
				and: string;
				like: string;
				unlike: string;
				warning: string;
				view: string;
				comments: string;
			};
			search: {
				indicator: string;
				suggested: string;
				results: string;
			};
		};
	};
}
