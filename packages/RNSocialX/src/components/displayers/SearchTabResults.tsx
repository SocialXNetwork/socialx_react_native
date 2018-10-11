import * as React from 'react';
import { View } from 'react-native';

import { SCREENS } from '../../environment/consts';
import {
	INavigationParamsActions,
	INavigationProps,
	ISearchResultData,
	ITranslatedProps,
	SearchResultKind,
} from '../../types';
import { SearchResults } from './SearchResults';
import styles from './SearchTabResults.style';
import { SuggestedSearches } from './SuggestedSearches';

interface ISearchTabResultsProps
	extends INavigationProps,
		ITranslatedProps,
		INavigationParamsActions {
	searchTermValue: string;
	searchResults: ISearchResultData[];
	suggestions: ISearchResultData[];
	searching: boolean;
	hasMoreResults: boolean;
	searchForMoreResults: () => void;
	addFriend: (userId: string) => void;
}

const onResultPressHandler = (
	result: ISearchResultData,
	navigation: any,
	setNavigationParams: any,
) => {
	if (
		result.relationship === SearchResultKind.Friend ||
		result.relationship === SearchResultKind.NotFriend ||
		result.relationship === SearchResultKind.FriendRequestSent
	) {
		setNavigationParams({
			screenName: SCREENS.UserProfile,
			params: { userId: result.userId },
		});
		navigation.navigate(SCREENS.UserProfile);
	}
};

const onLoadMoreResultsHandler = (
	searching: boolean,
	hasMoreResults: boolean,
	searchForMoreResults: any,
) => {
	if (!searching && hasMoreResults) {
		searchForMoreResults();
	}
};

export const SearchTabResults: React.SFC<ISearchTabResultsProps> = ({
	searchTermValue,
	searchResults,
	suggestions,
	searching,
	hasMoreResults,
	addFriend,
	searchForMoreResults,
	getText,
	navigation,
	setNavigationParams,
}) => (
	<View style={styles.container}>
		{searchTermValue.length === 0 && (
			<SuggestedSearches
				items={suggestions}
				onAddFriend={addFriend}
				onResultPress={(result) =>
					onResultPressHandler(result, navigation, setNavigationParams)
				}
				getText={getText}
			/>
		)}
		{searchTermValue.length !== 0 && (
			<SearchResults
				searchResults={searchResults}
				searching={searching}
				onAddFriend={addFriend}
				onResultPress={(result) =>
					onResultPressHandler(result, navigation, setNavigationParams)
				}
				hasMore={hasMoreResults}
				onLoadMore={() =>
					onLoadMoreResultsHandler(
						searching,
						hasMoreResults,
						searchForMoreResults,
					)
				}
				getText={getText}
			/>
		)}
	</View>
);
