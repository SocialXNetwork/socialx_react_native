import { Tab, Tabs } from 'native-base';
import * as React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { SearchContainer, SearchHeader } from '../../../components';
import { IDictionary, INavigationProps } from '../../../types';

import styles from './SearchScreen.style';

export const ComingSoon: React.SFC<{ message: string }> = ({ message }) => (
	<View style={styles.coming}>
		<Icon name="md-stopwatch" style={styles.icon} />
		<Text style={styles.text}>{message}</Text>
	</View>
);

interface IProps extends INavigationProps, IDictionary {
	term: string;
	results: string[];
	suggestions: string[];
	searching: boolean;
	onCancelSearch: () => void;
	onSearchTermChange: (value: string) => void;
	onResultPress: (alias: string) => void;
}

export const SearchScreenView: React.SFC<IProps> = ({
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
			cancel={false}
			autoFocus={false}
			navigation={navigation}
			onSearchTermChange={onSearchTermChange}
			onCancelSearch={onCancelSearch}
		/>
		<Tabs tabBarUnderlineStyle={styles.underline as ViewStyle}>
			<Tab
				heading={dictionary.screens.search.top}
				tabStyle={styles.tab as ViewStyle}
				activeTabStyle={styles.tab as ViewStyle}
				textStyle={styles.title as TextStyle}
				activeTextStyle={[styles.title, styles.active] as TextStyle}
			>
				<SearchContainer
					term={term}
					results={results}
					suggestions={suggestions}
					searching={searching}
					onResultPress={onResultPress}
					dictionary={dictionary}
				/>
			</Tab>
			<Tab
				heading={dictionary.screens.search.people}
				tabStyle={styles.tab as ViewStyle}
				activeTabStyle={styles.tab as ViewStyle}
				textStyle={styles.title as TextStyle}
				activeTextStyle={[styles.title, styles.active] as TextStyle}
			>
				<ComingSoon message={dictionary.screens.search.soon} />
			</Tab>
			<Tab
				heading={dictionary.screens.search.tags}
				tabStyle={styles.tab as ViewStyle}
				activeTabStyle={styles.tab as ViewStyle}
				textStyle={styles.title as TextStyle}
				activeTextStyle={[styles.title, styles.active] as TextStyle}
			>
				<ComingSoon message={dictionary.screens.search.soon} />
			</Tab>
			<Tab
				heading={dictionary.screens.search.places}
				tabStyle={styles.tab as ViewStyle}
				activeTabStyle={styles.tab as ViewStyle}
				textStyle={styles.title as TextStyle}
				activeTextStyle={[styles.title, styles.active] as TextStyle}
			>
				<ComingSoon message={dictionary.screens.search.soon} />
			</Tab>
		</Tabs>
	</View>
);
