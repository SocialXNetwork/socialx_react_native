import * as React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { UserEntries } from '../../components';
import { IDictionary } from '../../types';

import styles from './SearchResults.style';

interface ISearchIndicator extends IDictionary {
	term: string;
}

const SearchIndicator: React.SFC<ISearchIndicator> = ({ term, dictionary }) => (
	<View style={styles.searchContainer}>
		<ActivityIndicator size="small" style={styles.spinner} />
		<Text style={styles.text}>{`${
			dictionary.components.displayers.search.indicator
		} "${term}"`}</Text>
	</View>
);

const NoResults: React.SFC<IDictionary> = ({ dictionary }) => (
	<View style={styles.results}>
		<Text style={styles.text}>{dictionary.components.displayers.search.results}</Text>
	</View>
);

interface ISearchResultsProps extends IDictionary {
	term: string;
	results: string[];
	searching: boolean;
	friends?: boolean;
	onResultPress: (alias: string) => void;
}

export const SearchResults: React.SFC<ISearchResultsProps> = ({
	term,
	searching,
	results,
	friends = true,
	onResultPress,
	dictionary,
}) => {
	const empty = !searching && term.length > 0 && results.length === 0;

	return (
		<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
			{empty && <NoResults dictionary={dictionary} />}
			{results.length > 0 && (
				<UserEntries
					aliases={results}
					friends={friends}
					scroll={false}
					onEntryPress={onResultPress}
				/>
			)}
			{searching && <SearchIndicator term={term} dictionary={dictionary} />}
		</ScrollView>
	);
};
