import * as React from 'react';
import { debounce } from 'throttle-debounce';

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

const SEARCH_DEBOUNCE_TIME_MS = 300;
const TabsByIndex = [SearchTabs.Top, SearchTabs.People, SearchTabs.Tags, SearchTabs.Places];

type ISearchScreenProps = INavigationProps &
	IWithSearchEnhancedData &
	IWithSearchEnhancedActions &
	IWithNavigationHandlersEnhancedActions;

interface IISearchScreenState {
	loadedTabs: number[];
	term: string;
	selectedTab: number;
}

class Screen extends React.Component<ISearchScreenProps, IISearchScreenState> {
	public state = {
		loadedTabs: [0],
		term: '',
		selectedTab: 0,
	};

	private debounceSearch = debounce(SEARCH_DEBOUNCE_TIME_MS, (term: string) => {
		this.props.search(term, TabsByIndex[this.state.selectedTab]);
	});

	public componentDidMount() {
		this.props.findFriendsSuggestions();
	}

	public render() {
		const {
			navigation,
			results,
			suggestions,
			searching,
			hasMoreResults,
			searchForMoreResults,
			getText,
		} = this.props;
		const { loadedTabs, term } = this.state;

		return (
			<SearchScreenView
				navigation={navigation}
				loadedTabs={loadedTabs}
				results={results}
				suggestions={suggestions}
				searching={searching}
				hasMoreResults={hasMoreResults}
				searchForMoreResults={searchForMoreResults}
				onTabIndexChanged={this.onTabIndexChangedHandler}
				onSearchTermChange={this.onSearchTermChangeHandler}
				onResultPress={(userId) => this.props.onViewUserProfile(userId)}
				searchTermValue={term}
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
		this.debounceSearch(term);
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
