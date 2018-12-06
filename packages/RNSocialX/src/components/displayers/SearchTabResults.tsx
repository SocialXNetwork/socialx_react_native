import * as React from 'react';
import { View } from 'react-native';

import { ITranslatedProps } from '../../types';
import { SearchResults } from './SearchResults';
import { SuggestedSearches } from './SuggestedSearches';

import styles from './SearchTabResults.style';

interface ISearchTabResultsProps extends ITranslatedProps {
	term: string;
	results: string[];
	suggestions: string[];
	searching: boolean;
	hasMoreResults: boolean;
	onResultPress: (alias: string) => void;
}

export const SearchTabResults: React.SFC<ISearchTabResultsProps> = ({
	term,
	results,
	suggestions,
	searching,
	hasMoreResults,
	onResultPress,
	getText,
}) => (
	<View style={styles.container}>
		{term.length === 0 && (
			<SuggestedSearches
				suggestions={suggestions}
				onResultPress={onResultPress}
				onLoadMore={() => undefined}
				getText={getText}
			/>
		)}
		{term.length !== 0 && (
			<SearchResults
				term={term}
				results={results}
				searching={searching}
				hasMore={hasMoreResults}
				onLoadMore={() => undefined}
				onResultPress={onResultPress}
				getText={getText}
			/>
		)}
	</View>
);
