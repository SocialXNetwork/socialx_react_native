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

const SearchingLoader: React.SFC<{ message: string }> = ({ message }) => (
	<View style={styles.searchContainer}>
		<ActivityIndicator size={'small'} style={styles.spinner} />
		<Text style={styles.shortMessage}>{message}</Text>
	</View>
);

const SearchNoResults: React.SFC<{ message: string }> = ({ message }) => (
	<View style={styles.messageContainer}>
		<Text style={styles.shortMessage}>{message}</Text>
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
		{searching && (
			<SearchingLoader message={getText('searching.loader.text')} />
		)}
		{!searching &&
			searchResults.length === 0 && (
				<SearchNoResults message={'search.no.results.text'} />
			)}
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
