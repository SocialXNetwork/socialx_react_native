import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../environment/theme';
import { IDictionary } from '../../types';
import { SearchResults } from './SearchResults';
import { SuggestedSearches } from './SuggestedSearches';

interface IProps extends IDictionary {
	term: string;
	results: string[];
	suggestions: string[];
	searching: boolean;
	friends?: boolean;
	onResultPress: (alias: string) => void;
}

export const SearchContainer: React.SFC<IProps> = ({
	term,
	results,
	suggestions,
	searching,
	friends,
	dictionary,
	onResultPress,
}) => (
	<View style={styles.container}>
		{term.length === 0 && (
			<SuggestedSearches
				suggestions={suggestions}
				friends={friends}
				onResultPress={onResultPress}
				dictionary={dictionary}
			/>
		)}
		{term.length !== 0 && (
			<SearchResults
				term={term}
				results={results}
				searching={searching}
				friends={friends}
				onResultPress={onResultPress}
				dictionary={dictionary}
			/>
		)}
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
});
