import * as React from 'react';

import {
	IWithSearchEnhancedActions,
	IWithSearchEnhancedData,
} from '../../../enhancers/screens';
import { SCREENS } from '../../../environment/consts';
import {
	INavigationProps,
	ISearchResultData,
	SearchResultKind,
} from '../../../types';
import { SearchScreenView } from './SearchScreen.view';

interface IWithSearchTerm {
	searchTermValue: string;
}

type ISearchScreenProps = INavigationProps &
	IWithSearchTerm &
	IWithSearchEnhancedActions &
	IWithSearchEnhancedData;

export class SearchScreen extends React.Component<ISearchScreenProps> {
	public render() {
		const {
			searchTermValue,
			searchResults,
			suggestions,
			searching,
			hasMoreResults,
			getText,
		} = this.props;
		return (
			<SearchScreenView
				onAddFriend={this.onAddFriendHandler}
				searchResults={searchResults}
				suggestions={suggestions}
				onResultPress={this.onResultPressHandler}
				searching={searching}
				hasMoreResults={hasMoreResults}
				onLoadMoreResults={this.onLoadMoreResultsHandler}
				searchTermValue={searchTermValue}
				getText={getText}
			/>
		);
	}

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
