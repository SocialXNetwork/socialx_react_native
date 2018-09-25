/**
 * TODO list:
 * 1. Props data: searchResults, suggestions, searching, hasMoreResults
 * 2. Props actions: search, searchForMoreResults, addFriend
 */

import * as React from 'react';

import {suggestedItems} from '../../../mocks';
import {ISearchResultData, ITranslatedProps, SearchTabs} from '../../../types';

const mock: IWithSearchEnhancedProps = {
	data: {
		searchResults: suggestedItems,
		suggestions: suggestedItems,
		searching: false,
		hasMoreResults: true,
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		search: (term: string, tab: SearchTabs) => {
			/**/
		},
		searchForMoreResults: () => {
			/**/
		},
		addFriend: (userId: string) => {
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

export interface IWithSearchEnhancedActions extends ITranslatedProps {
	search: (term: string, tab: SearchTabs) => void;
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

export class WithSearch extends React.Component<IWithSearchProps, IWithSearchState> {
	render() {
		return this.props.children({data: mock.data, actions: mock.actions});
	}
}
