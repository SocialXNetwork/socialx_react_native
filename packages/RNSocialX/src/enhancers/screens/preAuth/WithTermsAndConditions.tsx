import * as React from 'react';

import { IDictionary } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

export interface IWithTermsAndConditionsEnhancedData extends IDictionary {}

export interface IWithTermsAndConditionsEnhancedActions {}

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
		return (
			<WithI18n>
				{({ dictionary }) =>
					this.props.children({
						data: { dictionary },
						actions: {},
					})
				}
			</WithI18n>
		);
	}
}
