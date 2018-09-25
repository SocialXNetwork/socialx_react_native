import * as React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {SearchResultsList} from '../../components';
import {ISearchResultData} from '../../types';
import styles from './SearchResults.style';

interface ISearchResultsProps {
	searching: boolean;
	searchResults: ISearchResultData[];
	onAddFriend: (value: string) => void;
	onResultPress: (result: ISearchResultData) => void;
	onLoadMore: () => void;
	hasMore: boolean;
}

const SearchingLoader: React.SFC = () => (
	<View style={styles.searchContainer}>
		<ActivityIndicator size={'small'} style={styles.spinner} />
		<Text style={styles.shortMessage}>Searching</Text>
	</View>
);

const SearchNoResults: React.SFC = () => (
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
}) => (
	<View style={styles.container}>
		{searching && <SearchingLoader />}
		{!searching && searchResults.length === 0 && <SearchNoResults />}
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
