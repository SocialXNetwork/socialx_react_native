import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

import { SearchResultsItem } from '../../components';
import { ISearchResultData } from '../../types';

import styles from './SearchResultsList.style';

interface IPaginatedList {
	hasMore: boolean;
}

interface ISearchResultsListProps extends IPaginatedList {
	searchResults: ISearchResultData[];
	onResultPress: (result: ISearchResultData) => void;
	onLoadMore: () => void;
}

const LoadingFooter: React.SFC<IPaginatedList> = ({ hasMore }) => {
	if (hasMore) {
		return (
			<View style={styles.bottomLoadingContainer}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	return null;
};

const renderItem = (
	item: ISearchResultData,
	onResultPress: (result: ISearchResultData) => void,
) => (
	<SearchResultsItem
		key={item.userId}
		item={item}
		onResultPress={() => onResultPress(item)}
	/>
);

const keyExtractor = (item: ISearchResultData) => item.userId; // TODO: enable later!

export const SearchResultsList: React.SFC<ISearchResultsListProps> = ({
	searchResults,
	onResultPress,
	onLoadMore,
	hasMore,
}) => (
	<FlatList
		data={searchResults}
		renderItem={({ item }) => renderItem(item, onResultPress)}
		style={styles.resultsContainer}
		keyboardShouldPersistTaps="handled"
		keyExtractor={keyExtractor}
		onEndReachedThreshold={0.5}
		alwaysBounceVertical={false}
		onEndReached={onLoadMore}
		ListFooterComponent={<LoadingFooter hasMore={hasMore} />}
	/>
);
