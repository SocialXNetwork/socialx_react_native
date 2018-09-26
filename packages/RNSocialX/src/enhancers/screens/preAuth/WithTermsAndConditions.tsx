/**
 * TODO list:
 * 1. Props actions: getText
 */

import * as React from 'react';

import { ITranslatedProps } from '../../../types';

const mock: IWithTermsAndConditionsEnhancedProps = {
	data: {},
	actions: {
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithTermsAndConditionsEnhancedData {}

export interface IWithTermsAndConditionsEnhancedActions
	extends ITranslatedProps {}

interface IWithTermsAndConditionsEnhancedProps {
	data: IWithTermsAndConditionsEnhancedData;
	actions: IWithTermsAndConditionsEnhancedActions;
}

interface IWithTermsAndConditionsProps {
	children(props: IWithTermsAndConditionsEnhancedProps): JSX.Element;
}

interface IWithTermsAndConditionsState {}

export class WithTermsAndConditions extends React.Component<
	IWithTermsAndConditionsProps,
	IWithTermsAndConditionsState
> {
	render() {
		return this.props.children({ data: mock.data, actions: mock.actions });
	}
}
