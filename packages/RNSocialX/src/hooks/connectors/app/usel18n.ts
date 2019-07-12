import { useDispatch, useSelector } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import { getText, ILocales, ISetLocaleInput, setLocale } from '../../../store/app/i18n';
import { ILocaleDictionary, Locales } from '../../../store/app/i18n/Types';

const selectCurrentLocale = createSelector(
	(state: IApplicationState) => state.app.i18n.currentLocale,
	(currentLocale) => currentLocale,
);

const selectCurrentDictionary = createSelector(
	selectCurrentLocale,
	(state: IApplicationState) => state.app.i18n.dictionary,
	(currentLocale, dictionary) => dictionary[currentLocale as Locales.EN],
);

const selectDictionary = createSelector(
	(state: IApplicationState) => state.app.i18n.dictionary[state.app.i18n.locale as Locales.EN],
	// (state: IApplicationState) => state.app.i18n.dictionary[state.app.i18n.locale],
	(dictionary) => dictionary,
);

export const usel18nData = () => ({
	currentLocale: useSelector(selectCurrentLocale),
	currentDictionary: useSelector(selectCurrentDictionary),
	dictionary: useSelector(selectDictionary),
});

export const usel18nActions = () => {
	const dispatch = useDispatch();

	return {
		setLocale: (setLocaleInput: ISetLocaleInput) => dispatch(setLocale(setLocaleInput)),
	};
};
