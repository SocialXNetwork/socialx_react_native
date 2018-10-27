import * as React from 'react';
import { View } from 'react-native';

import { ISearchResultData, ITranslatedProps } from '../../types';
import { SearchResults } from './SearchResults';
import { SuggestedSearches } from './SuggestedSearches';

import styles from './SearchTabResults.style';

interface ISearchTabResultsProps extends ITranslatedProps {
	searchTermValue: string;
	searchResults: ISearchResultData[];
	suggestions: ISearchResultData[];
	searching: boolean;
	hasMoreResults: boolean;
	searchForMoreResults: () => void;
	onResultPress: (userId: string) => void;
}

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
	onResultPress,
	getText,
}) => (
	<View style={styles.container}>
		{searchTermValue.length === 0 && (
			<SuggestedSearches
				items={suggestions}
				onResultPress={(result) => onResultPress(result.userId)}
				getText={getText}
			/>
		)}
		{searchTermValue.length !== 0 && (
			<SearchResults
				searchResults={searchResults}
				searching={searching}
				onResultPress={(result) => onResultPress(result.userId)}
				hasMore={hasMoreResults}
				onLoadMore={() => onLoadMoreResultsHandler(searching, hasMoreResults, searchForMoreResults)}
				getText={getText}
			/>
		)}
	</View>
);
