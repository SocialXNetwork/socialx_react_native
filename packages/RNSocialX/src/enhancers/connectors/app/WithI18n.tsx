import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import { getText, IAvailableLocales, ISetLocaleInput, setLocale } from '../../../store/app/i18n';
import { ILocaleDictionary } from '../../../store/app/i18n/Types';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	currentLocale: IAvailableLocales;
}

interface IActionProps {
	setLocale: (setLocaleInput: ISetLocaleInput) => void;
	getText: (key: string, ...args: Array<string | number>) => string;
}

type IProps = IDataProps & IActionProps;

interface IChildren {
	children: (props: IProps) => JSX.Element;
}

class Enhancer extends React.Component<IProps & IChildren> {
	render() {
		const { children, ...props } = this.props;
		return children(props);
	}
}

const selectCurrentLocale = createSelector(
	(state: IApplicationState) => state.app.i18n.currentLocale,
	(currentLocale) => currentLocale,
);

const selectCurrentDictionary = createSelector(
	selectCurrentLocale,
	(state: IApplicationState) => state.app.i18n.dictionary,
	(currentLocale, dictionary) => dictionary[currentLocale],
);

const mapStateToProps = (state: IApplicationState) => ({
	currentLocale: selectCurrentLocale(state),
	currentDictionary: selectCurrentDictionary(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	setLocale: (setLocaleInput: ISetLocaleInput) => dispatch(setLocale(setLocaleInput)),
});

export const WithI18n: ConnectedComponentClass<JSX.Element, IChildren> = compose(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withHandlers({
		getText: ({ currentDictionary }: { currentDictionary: ILocaleDictionary }) => (
			key: string,
			...args: Array<string | number>
		) => getText(currentDictionary, key, ...args),
	}),
	mapProps(({ currentDictionary, ...props }: any) => ({ ...props })),
)(Enhancer as any) as any;
