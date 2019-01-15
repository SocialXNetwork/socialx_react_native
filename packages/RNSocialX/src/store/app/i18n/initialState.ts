import english from './data/dictionary.en';
import spanish from './data/dictionary.es';

import { IState, Locales } from './Types';

const initialState: IState = {
	currentLocale: Locales.EN,
	dictionary: {
		[Locales.EN]: english,
		// [Locales.ES]: spanish,
	},
	locale: Locales.EN,
};

export default initialState;
