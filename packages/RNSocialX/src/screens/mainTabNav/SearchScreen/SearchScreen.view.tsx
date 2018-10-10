import * as React from 'react';
import { View } from 'react-native';

import { SearchResults, SuggestedSearches } from '../../../components';
import { ISearchResultData, ITranslatedProps } from '../../../types';
import styles from './SearchScreen.style';

interface ISearchScreenViewProps extends ITranslatedProps {
	onAddFriend: (value: string) => void;
	searchResults: ISearchResultData[];
	suggestions: ISearchResultData[];
	onResultPress: (result: ISearchResultData) => void;
	searching: boolean;
	onLoadMoreResults: () => void;
	hasMoreResults: boolean;
	searchTermValue: string;
}

export const SearchScreenView: React.SFC<ISearchScreenViewProps> = ({
	onAddFriend,
	searchResults,
	suggestions,
	onResultPress,
	searching,
	onLoadMoreResults,
	hasMoreResults,
	searchTermValue,
	getText,
}) => (
	<View style={styles.container}>
		{searchTermValue.length === 0 && (
			<SuggestedSearches
				items={suggestions}
				onAddFriend={onAddFriend}
				onResultPress={onResultPress}
				getText={getText}
			/>
		)}
		{searchTermValue.length !== 0 && (
			<SearchResults
				searchResults={searchResults}
				searching={searching}
				onAddFriend={onAddFriend}
				onResultPress={onResultPress}
				hasMore={hasMoreResults}
				onLoadMore={onLoadMoreResults}
				getText={getText}
			/>
		)}
	</View>
);
