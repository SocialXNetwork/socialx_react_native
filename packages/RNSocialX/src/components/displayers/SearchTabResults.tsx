import * as React from 'react';
import { View } from 'react-native';

import { SCREENS } from '../../environment/consts';
import {
	INavigationParamsActions,
	INavigationProps,
	ISearchResultData,
	ITranslatedProps,
} from '../../types';
import { SearchResults } from './SearchResults';
import { SuggestedSearches } from './SuggestedSearches';

import styles from './SearchTabResults.style';

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
}

const onResultPressHandler = (
	result: ISearchResultData,
	navigation: any,
	setNavigationParams: any,
) => {
	setNavigationParams({
		screenName: SCREENS.UserProfile,
		params: { userId: result.userId },
	});
	navigation.navigate(SCREENS.UserProfile);
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
	searchForMoreResults,
	getText,
	navigation,
	setNavigationParams,
}) => (
	<View style={styles.container}>
		{searchTermValue.length === 0 && (
			<SuggestedSearches
				items={suggestions}
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
