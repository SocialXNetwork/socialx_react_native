import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

export interface IWithTermsAndConditionsEnhancedData {}

export interface IWithTermsAndConditionsEnhancedActions extends ITranslatedProps {}

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
				{({ getText }) =>
					this.props.children({
						data: {},
						actions: { getText },
					})
				}
			</WithI18n>
		);
	}
}
