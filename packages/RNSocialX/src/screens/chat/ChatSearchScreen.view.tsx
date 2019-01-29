import React from 'react';
import { View } from 'react-native';

import { SearchContainer, SearchHeader } from '../../components';
import { IDictionary, INavigationProps } from '../../types';

import styles from './ChatSearchScreen.style';

interface IProps extends INavigationProps, IDictionary {
	term: string;
	results: string[];
	suggestions: string[];
	searching: boolean;
	onCancelSearch: () => void;
	onSearchTermChange: (value: string) => void;
	onResultPress: (alias: string) => void;
}

export const ChatSearchScreenView: React.SFC<IProps> = ({
	term,
	results,
	suggestions,
	searching,
	onCancelSearch,
	onResultPress,
	onSearchTermChange,
	navigation,
	dictionary,
}) => (
	<View style={styles.container}>
		<SearchHeader
			term={term}
			cancel={true}
			autoFocus={true}
			navigation={navigation}
			onSearchTermChange={onSearchTermChange}
			onCancelSearch={onCancelSearch}
		/>
		<SearchContainer
			term={term}
			results={results}
			suggestions={suggestions}
			searching={searching}
			friends={false}
			dictionary={dictionary}
			onResultPress={onResultPress}
		/>
	</View>
);
