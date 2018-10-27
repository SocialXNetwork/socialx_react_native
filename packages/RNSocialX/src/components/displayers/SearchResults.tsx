import * as React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { SearchResultsList } from '../../components';
import { ISearchResultData, ITranslatedProps } from '../../types';

import styles from './SearchResults.style';

interface ISearchResultsProps extends ITranslatedProps {
	searching: boolean;
	searchResults: ISearchResultData[];
	onResultPress: (result: ISearchResultData) => void;
	onLoadMore: () => void;
	hasMore: boolean;
}

const SearchingLoader: React.SFC<ITranslatedProps> = ({ getText }) => (
	<View style={styles.searchContainer}>
		<ActivityIndicator size="small" style={styles.spinner} />
		<Text style={styles.text}>{getText('search.loader.text')}</Text>
	</View>
);

const SearchNoResults: React.SFC<ITranslatedProps> = ({ getText }) => (
	<View style={styles.textContainer}>
		<Text style={styles.text}>{getText('search.no.results.text')}</Text>
	</View>
);

export const SearchResults: React.SFC<ISearchResultsProps> = ({
	searching,
	searchResults,
	onResultPress,
	onLoadMore,
	hasMore,
	getText,
}) => (
	<View style={styles.container}>
		{searching && <SearchingLoader getText={getText} />}
		{!searching && searchResults.length === 0 && <SearchNoResults getText={getText} />}
		{!searching &&
			searchResults.length > 0 && (
				<SearchResultsList
					searchResults={searchResults}
					onResultPress={onResultPress}
					onLoadMore={onLoadMore}
					hasMore={hasMore}
				/>
			)}
	</View>
);
