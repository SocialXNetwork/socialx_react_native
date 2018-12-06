import * as React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { UserEntries } from '../../components';
import { ITranslatedProps } from '../../types';

import styles from './SearchResults.style';

interface ISearchResultsProps extends ITranslatedProps {
	term: string;
	results: string[];
	searching: boolean;
	hasMore: boolean;
	onResultPress: (alias: string) => void;
	onLoadMore: () => void;
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
	<View style={styles.textContainer}>
		<Text style={styles.text}>{getText('search.no.results')}</Text>
	</View>
);

export const SearchResults: React.SFC<ISearchResultsProps> = ({
	term,
	searching,
	results,
	onResultPress,
	onLoadMore,
	hasMore,
	getText,
}) => {
	const empty = !searching && term.length > 0 && results.length === 0;
	const found = !searching && results.length > 0;

	return (
		<View style={styles.container}>
			{searching && <SearchIndicator term={term} getText={getText} />}
			{empty && <NoResults getText={getText} />}
			{found && (
				<UserEntries
					aliases={results}
					onEntryPress={onResultPress}
					onLoadMore={onLoadMore}
					hasMore={hasMore}
				/>
			)}
		</View>
	);
};
