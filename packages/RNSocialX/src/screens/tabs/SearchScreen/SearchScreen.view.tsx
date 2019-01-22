import { Tab, Tabs } from 'native-base';
import * as React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { SearchHeader, SearchTabResults } from '../../../components';
import { INavigationProps, ITranslatedProps } from '../../../types';

import styles from './SearchScreen.style';

export const ComingSoon: React.SFC<{ message: string }> = ({ message }) => (
	<View style={styles.coming}>
		<Icon name="md-stopwatch" style={styles.text} />
		<Text style={styles.icon}>{message}</Text>
	</View>
);

interface ISearchScreenViewProps extends INavigationProps, ITranslatedProps {
	term: string;
	results: string[];
	suggestions: string[];
	loadedTabs: number[];
	searching: boolean;
	onCancelSearch: () => void;
	onTabIndexChanged: (value: { i: number }) => void;
	onSearchTermChange: (value: string) => void;
	onResultPress: (alias: string) => void;
}

export const SearchScreenView: React.SFC<ISearchScreenViewProps> = ({
	term,
	results,
	suggestions,
	loadedTabs,
	searching,
	onCancelSearch,
	onResultPress,
	onTabIndexChanged,
	onSearchTermChange,
	navigation,
	getText,
}) => (
	<View style={styles.container}>
		<SearchHeader
			term={term}
			cancel={true}
			autoFocus={false}
			navigation={navigation}
			onSearchTermChange={onSearchTermChange}
			onCancelSearch={onCancelSearch}
		/>
		<Tabs
			locked={false}
			tabBarUnderlineStyle={styles.underline as ViewStyle}
			onChangeTab={onTabIndexChanged}
		>
			<Tab
				tabStyle={styles.tab as ViewStyle}
				activeTabStyle={styles.tab as ViewStyle}
				textStyle={styles.title as TextStyle}
				activeTextStyle={[styles.title, styles.active] as TextStyle}
				heading={getText('search.screen.results.tab.top.title')}
			>
				{loadedTabs.includes(0) && (
					<SearchTabResults
						term={term}
						results={results}
						suggestions={suggestions}
						searching={searching}
						onResultPress={onResultPress}
						getText={getText}
					/>
				)}
			</Tab>
			<Tab
				tabStyle={styles.tab as ViewStyle}
				activeTabStyle={styles.tab as ViewStyle}
				textStyle={styles.title as TextStyle}
				activeTextStyle={[styles.title, styles.active] as TextStyle}
				heading={getText('search.screen.results.tab.people.title')}
			>
				{loadedTabs.includes(1) && (
					<ComingSoon message={getText('search.screen.results.coming.soon')} />
				)}
			</Tab>
			<Tab
				tabStyle={styles.tab as ViewStyle}
				activeTabStyle={styles.tab as ViewStyle}
				textStyle={styles.title as TextStyle}
				activeTextStyle={[styles.title, styles.active] as TextStyle}
				heading={getText('search.screen.results.tab.tags.title')}
			>
				{loadedTabs.includes(2) && (
					<ComingSoon message={getText('search.screen.results.coming.soon')} />
				)}
			</Tab>
			<Tab
				tabStyle={styles.tab as ViewStyle}
				activeTabStyle={styles.tab as ViewStyle}
				textStyle={styles.title as TextStyle}
				activeTextStyle={[styles.title, styles.active] as TextStyle}
				heading={getText('search.screen.results.tab.places.title')}
			>
				{loadedTabs.includes(3) && (
					<ComingSoon message={getText('search.screen.results.coming.soon')} />
				)}
			</Tab>
		</Tabs>
	</View>
);
