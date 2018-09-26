import dictionaryEN from './data/dictionary.en';
import dictionaryES from './data/dictionary.es';
import { AvailableLocales, IState } from './Types';

const initialState: IState = {
	currentLocale: AvailableLocales.EN,
	dictionary: {
		[AvailableLocales.EN]: dictionaryEN,
		[AvailableLocales.ES]: dictionaryES,
	},
};

export default initialState;
