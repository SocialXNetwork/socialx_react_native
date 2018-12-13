import * as React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { UserEntries } from '../../components';
import { ITranslatedProps } from '../../types';

import styles from './SearchResults.style';

interface ISearchResultsProps extends ITranslatedProps {
	term: string;
	results: string[];
	searching: boolean;
	onResultPress: (alias: string) => void;
}

interface ISearchIndicator extends ITranslatedProps {
	term: string;
}

const SearchIndicator: React.SFC<ISearchIndicator> = ({ term, getText }) => (
	<View style={styles.searchContainer}>
		<ActivityIndicator size="small" style={styles.spinner} />
		<Text style={styles.text}>{`${getText('search.indicator')} "${term}"`}</Text>
	</View>
);

const NoResults: React.SFC<ITranslatedProps> = ({ getText }) => (
	<Text style={styles.text}>{getText('search.no.results')}</Text>
);

export const SearchResults: React.SFC<ISearchResultsProps> = ({
	term,
	searching,
	results,
	onResultPress,
	getText,
}) => {
	const empty = !searching && term.length > 0 && results.length === 0;

	return (
		<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
			{empty && <NoResults getText={getText} />}
			{results.length > 0 && (
				<UserEntries aliases={results} scroll={false} onEntryPress={onResultPress} />
			)}
			{searching && <SearchIndicator term={term} getText={getText} />}
		</ScrollView>
	);
};
