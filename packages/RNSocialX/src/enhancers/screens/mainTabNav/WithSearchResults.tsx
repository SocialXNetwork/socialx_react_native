import * as React from 'react';

import { ITranslatedProps, SearchTabs } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithSearchResultsEnhancedProps = {
	data: {},
	actions: {
		search: (term: string, tab: SearchTabs) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithSearchResultsEnhancedData {}

export interface IWithSearchResultsEnhancedActions extends ITranslatedProps {
	search: (term: string, tab: SearchTabs) => void;
}

interface IWithSearchResultsEnhancedProps {
	data: IWithSearchResultsEnhancedData;
	actions: IWithSearchResultsEnhancedActions;
}

interface IWithSearchResultsProps {
	children(props: IWithSearchResultsEnhancedProps): JSX.Element;
}

interface IWithSearchResultsState {}

export class WithSearchResults extends React.Component<
	IWithSearchResultsProps,
	IWithSearchResultsState
> {
	render() {
		const { children } = this.props;
		return (
			<WithI18n>
				{(i18nProps) =>
					children({
						data: mock.data,
						actions: {
							...mock.actions,
							getText: i18nProps.getText,
						},
					})
				}
			</WithI18n>
		);
	}
}
