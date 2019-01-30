import { debounce } from 'lodash';
import * as React from 'react';

import { WithNavigationHandlers } from '../../../enhancers/intermediary';
import {
	IWithSearchEnhancedActions,
	IWithSearchEnhancedData,
	WithSearch,
} from '../../../enhancers/screens';

import { INavigationProps } from '../../../types';
import { SearchScreenView } from './SearchScreen.view';
const SEARCH_DEBOUNCE_TIME = 300;

interface IProps extends INavigationProps, IWithSearchEnhancedData, IWithSearchEnhancedActions {
	onViewUserProfile: (alias: string) => void;
}

interface IState {
	term: string;
	suggestions: string[];
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		term: '',
		suggestions: [],
	};

	private search = debounce((term: string) => {
		this.props.search(term, 10);
	}, SEARCH_DEBOUNCE_TIME);

	public componentDidMount() {
		if (this.state.suggestions.length === 0) {
			this.setState({ suggestions: this.props.suggestions });
		}
	}

	public render() {
		const { results, searching, navigation, dictionary } = this.props;

		return (
			<SearchScreenView
				results={results}
				term={this.state.term}
				suggestions={this.state.suggestions}
				searching={searching}
				onCancelSearch={this.onCancelSearchHandler}
				onSearchTermChange={this.onSearchTermChangeHandler}
				onResultPress={(alias) => this.props.onViewUserProfile(alias)}
				navigation={navigation}
				dictionary={dictionary}
			/>
		);
	}

	private onSearchTermChangeHandler = (term: string) => {
		const { previousTerms, searchLocally } = this.props;

		this.setState({ term });
		searchLocally(term);
		if (term.length > 2 && !previousTerms[term]) {
			this.search(term);
		}
	};

	private onCancelSearchHandler = () => {
		if (this.state.term.length > 0) {
			this.setState({ term: '' }, () => this.props.clearSearchResults());
		}
	};
}

export const SearchScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{({ actions }) => (
			<WithSearch>
				{(search) => (
					<Screen
						{...props}
						{...search.data}
						{...search.actions}
						onViewUserProfile={actions.onViewUserProfile}
					/>
				)}
			</WithSearch>
		)}
	</WithNavigationHandlers>
);
