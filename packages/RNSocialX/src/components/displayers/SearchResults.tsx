import * as React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { SearchResultsList } from '../../components';
import { ISearchResultData, ITranslatedProps } from '../../types';
import styles from './SearchResults.style';

interface ISearchResultsProps extends ITranslatedProps {
	searching: boolean;
	searchResults: ISearchResultData[];
	onAddFriend: (value: string) => void;
	onResultPress: (result: ISearchResultData) => void;
	onLoadMore: () => void;
	hasMore: boolean;
}

// TODO: Add 'Searching' to the dictionary
const SearchingLoader: React.SFC<ITranslatedProps> = ({ getText }) => (
	<View style={styles.searchContainer}>
		<ActivityIndicator size={'small'} style={styles.spinner} />
		<Text style={styles.shortMessage}>Searching</Text>
	</View>
);

// TODO: Add 'No results found' to the dictionary
const SearchNoResults: React.SFC<ITranslatedProps> = ({ getText }) => (
	<View style={styles.messageContainer}>
		<Text style={styles.shortMessage}>No results found</Text>
	</View>
);

export const SearchResults: React.SFC<ISearchResultsProps> = ({
	searching,
	searchResults,
	onAddFriend,
	onResultPress,
	onLoadMore,
	hasMore,
	getText,
}) => (
	<View style={styles.container}>
		{searching && <SearchingLoader getText={getText} />}
		{!searching &&
			searchResults.length === 0 && <SearchNoResults getText={getText} />}
		{!searching &&
			searchResults.length > 0 && (
				<SearchResultsList
					searchResults={searchResults}
					onAddFriend={onAddFriend}
					onResultPress={onResultPress}
					onLoadMore={onLoadMore}
					hasMore={hasMore}
				/>
			)}
	</View>
);
