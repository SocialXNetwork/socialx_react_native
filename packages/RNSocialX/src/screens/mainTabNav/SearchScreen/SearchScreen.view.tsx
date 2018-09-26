import * as React from 'react';
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import {
	SearchHeader,
	SearchResults,
	SuggestedSearches,
} from '../../../components';
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
	onSearchTermChange: (term: string) => void;
	searchTermValue: string;
	navigation: NavigationScreenProp<any>;
}

export const SearchScreenView: React.SFC<ISearchScreenViewProps> = ({
	onAddFriend,
	searchResults,
	suggestions,
	onResultPress,
	searching,
	onLoadMoreResults,
	hasMoreResults,
	onSearchTermChange,
	searchTermValue,
	navigation,
	getText,
}) => (
	<View style={styles.container}>
		<SearchHeader
			navigation={navigation}
			onSearchTermChange={onSearchTermChange}
			searchTermValue={searchTermValue}
			cancel={true}
		/>
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
