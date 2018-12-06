import { debounce } from 'lodash';
import * as React from 'react';

import {
	IWithNavigationHandlersEnhancedActions,
	WithNavigationHandlers,
} from '../../../enhancers/intermediary';
import {
	IWithSearchEnhancedActions,
	IWithSearchEnhancedData,
	WithSearch,
} from '../../../enhancers/screens';

import { INavigationProps, SearchTabs } from '../../../types';
import { SearchScreenView } from './SearchScreen.view';

const SEARCH_DEBOUNCE_TIME = 500;
const tabs = [SearchTabs.Top, SearchTabs.People, SearchTabs.Tags, SearchTabs.Places];

type ISearchScreenProps = INavigationProps &
	IWithSearchEnhancedData &
	IWithSearchEnhancedActions &
	IWithNavigationHandlersEnhancedActions;

interface IISearchScreenState {
	term: string;
	loadedTabs: number[];
	selectedTab: number;
	suggestions: string[];
}

class Screen extends React.Component<ISearchScreenProps, IISearchScreenState> {
	public state = {
		term: '',
		loadedTabs: [0],
		selectedTab: 0,
		suggestions: [],
	};

	private debounceSearch = debounce((term: string) => {
		this.props.search(term, tabs[this.state.selectedTab]);
	}, SEARCH_DEBOUNCE_TIME);

	public componentDidMount() {
		if (this.state.suggestions.length === 0) {
			this.setState({ suggestions: this.props.suggestions });
		}
	}

	public render() {
		const { navigation, results, suggestions, searching, hasMoreResults, getText } = this.props;
		const { loadedTabs, term } = this.state;

		return (
			<SearchScreenView
				term={term}
				results={results}
				suggestions={this.state.suggestions}
				loadedTabs={loadedTabs}
				searching={searching}
				hasMoreResults={hasMoreResults}
				onTabIndexChanged={this.onTabIndexChangedHandler}
				onSearchTermChange={this.onSearchTermChangeHandler}
				onResultPress={(alias) => this.props.onViewUserProfile(alias)}
				navigation={navigation}
				getText={getText}
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
		this.setState({ term });
		if (term.length === 1) {
			this.props.search(term, tabs[this.state.selectedTab]);
		} else {
			this.debounceSearch(term);
		}
	};
}

export const SearchScreen = (props: INavigationProps) => (
	<WithNavigationHandlers navigation={props.navigation}>
		{(nav) => (
			<WithSearch>
				{(search) => <Screen {...props} {...search.data} {...search.actions} {...nav.actions} />}
			</WithSearch>
		)}
	</WithNavigationHandlers>
);
