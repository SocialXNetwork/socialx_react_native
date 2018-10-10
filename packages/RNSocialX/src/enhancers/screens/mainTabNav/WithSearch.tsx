/**
 * TODO list:
 * 1. Props data: searchResults, suggestions, searching, hasMoreResults
 * 2. Props actions: search, searchForMoreResults, addFriend
 * 3. We will have to use separate enhancers for each search tab!
 */

import * as React from 'react';

import { suggestedItems } from '../../../mocks';
import {
	INavigationParamsActions,
	ISearchResultData,
	ITranslatedProps,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithSearchEnhancedProps = {
	data: {
		searchResults: suggestedItems,
		suggestions: suggestedItems,
		searching: false,
		hasMoreResults: true,
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		searchForMoreResults: () => {
			/**/
		},
		addFriend: (userId: string) => {
			/**/
		},
		setNavigationParams: () => {
			/**/
		},
	},
};

export interface IWithSearchEnhancedData {
	searchResults: ISearchResultData[];
	suggestions: ISearchResultData[];
	searching: boolean;
	hasMoreResults: boolean;
}

export interface IWithSearchEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions {
	searchForMoreResults: () => void;
	addFriend: (userId: string) => void;
}

interface IWithSearchEnhancedProps {
	data: IWithSearchEnhancedData;
	actions: IWithSearchEnhancedActions;
}

interface IWithSearchProps {
	children(props: IWithSearchEnhancedProps): JSX.Element;
}

interface IWithSearchState {}

export class WithSearch extends React.Component<
	IWithSearchProps,
	IWithSearchState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) =>
					this.props.children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
