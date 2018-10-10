import * as React from 'react';
import { debounce } from 'throttle-debounce';

import {
	IWithSearchResultsEnhancedActions,
	IWithSearchResultsEnhancedData,
	WithSearchResults,
} from '../../../enhancers/screens';
import { INavigationProps, SearchTabs } from '../../../types';
import { SearchResultsScreenView } from './SearchResultsScreen.view';

const SEARCH_DEBOUNCE_TIME_MS = 300;

const TabsByIndex = [
	SearchTabs.Top,
	SearchTabs.People,
	SearchTabs.Tags,
	SearchTabs.Places,
];

type ISearchResultsScreenProps = INavigationProps &
	IWithSearchResultsEnhancedData &
	IWithSearchResultsEnhancedActions;

interface IISearchResultsScreenState {
	loadedTabs: number[];
	term: string;
	selectedTab: number;
}
class Screen extends React.Component<
	ISearchResultsScreenProps,
	IISearchResultsScreenState
> {
	public state = {
		loadedTabs: [0],
		term: '',
		selectedTab: 0,
	};

	private debounceSearch = debounce(SEARCH_DEBOUNCE_TIME_MS, (term: string) => {
		this.props.search(term, TabsByIndex[this.state.selectedTab]);
	});

	public render() {
		const { navigation, getText } = this.props;
		const { loadedTabs, term } = this.state;
		return (
			<SearchResultsScreenView
				navigation={navigation}
				getText={getText}
				loadedTabs={loadedTabs}
				onTabIndexChanged={this.onTabIndexChangedHandler}
				onSearchTermChange={this.onSearchTermChangeHandler}
				searchTermValue={term}
			/>
		);
	}

	private onTabIndexChangedHandler = (value: { i: number }) => {
		if (!this.state.loadedTabs.includes(value.i)) {
			this.setState({
				selectedTab: value.i,
				loadedTabs: [...this.state.loadedTabs, value.i],
			});
		}
	};

	private onSearchTermChangeHandler = (term: string) => {
		this.debounceSearch(term);
		this.setState({ term });
	};
}

export const SearchResultsScreen = (navProps: INavigationProps) => (
	<WithSearchResults>
		{({ data, actions }) => <Screen {...data} {...actions} {...navProps} />}
	</WithSearchResults>
);
