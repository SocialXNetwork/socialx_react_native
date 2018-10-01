import * as React from 'react';
import { debounce } from 'throttle-debounce';

import {
	IWithSearchEnhancedActions,
	IWithSearchEnhancedData,
} from '../../../enhancers/screens';
import { SCREENS } from '../../../environment/consts';
import {
	INavigationProps,
	ISearchResultData,
	SearchResultKind,
	SearchTabs,
} from '../../../types';
import { SearchScreenView } from './SearchScreen.view';

const SEARCH_DEBOUNCE_TIME_MS = 300;

export interface ISearchProps {
	tab: SearchTabs;
}

type ISearchScreenProps = INavigationProps &
	ISearchProps &
	IWithSearchEnhancedActions &
	IWithSearchEnhancedData;

interface ISearchScreenState {
	term: string;
}

export class Screen extends React.Component<
	ISearchScreenProps,
	ISearchScreenState
> {
	public state = {
		term: '',
	};

	private debounceSearch = debounce(SEARCH_DEBOUNCE_TIME_MS, (term: string) => {
		this.props.search(term, this.props.tab);
	});

	public render() {
		return (
			<SearchScreenView
				onAddFriend={this.onAddFriendHandler}
				searchResults={this.props.searchResults}
				suggestions={this.props.suggestions}
				onResultPress={this.onResultPressHandler}
				searching={this.props.searching}
				hasMoreResults={this.props.hasMoreResults}
				onLoadMoreResults={this.onLoadMoreResultsHandler}
				onSearchTermChange={this.onSearchTermChangeHandler}
				searchTermValue={this.state.term}
				navigation={this.props.navigation}
				getText={this.props.getText}
			/>
		);
	}

	private onSearchTermChangeHandler = (term: string) => {
		this.debounceSearch(term);
		this.setState({ term });
	};

	private onAddFriendHandler = (userId: string) => {
		this.props.addFriend(userId);
	};

	private onResultPressHandler = (result: ISearchResultData) => {
		if (
			result.relationship === SearchResultKind.Friend ||
			result.relationship === SearchResultKind.NotFriend ||
			result.relationship === SearchResultKind.FriendRequestSent
		) {
			const { navigation, setNavigationParams } = this.props;
			setNavigationParams({
				screenName: SCREENS.UserProfile,
				params: { userId: result.userId },
			});
			navigation.navigate(SCREENS.UserProfile);
		}
	};

	private onLoadMoreResultsHandler = () => {
		if (!this.props.searching && this.props.hasMoreResults) {
			this.props.searchForMoreResults();
		}
	};
}
