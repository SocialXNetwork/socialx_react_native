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
) => <SearchResultsItem item={item} onResultPress={() => onResultPress(item)} />;

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
		keyExtractor={(item: ISearchResultData) => item.userId}
		alwaysBounceVertical={false}
		// onEndReached={onLoadMore}
		// onEndReachedThreshold={0.5}
		ListFooterComponent={<LoadingFooter hasMore={hasMore} />}
	/>
);
