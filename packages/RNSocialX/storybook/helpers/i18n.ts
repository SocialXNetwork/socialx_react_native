import dictionaryEN from '../../src/store/app/i18n/data/dictionary.en';
import { getText } from '../../src/store/app/i18n/helpers';

export const mockGetText = (key: string, ...args: Array<string | number>) => {
	return getText(dictionaryEN, key, ...args);
};
