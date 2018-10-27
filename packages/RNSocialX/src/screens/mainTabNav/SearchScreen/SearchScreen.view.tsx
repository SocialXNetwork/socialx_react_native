import { Tab, Tabs } from 'native-base';
import * as React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { SearchHeader, SearchTabResults } from '../../../components';
import { INavigationProps, ISearchResultData, ITranslatedProps } from '../../../types';

import styles from './SearchScreen.style';

export const ComingSoon: React.SFC<{ message: string }> = ({ message }) => (
	<View style={styles.comingSoonContainer}>
		<Icon name="md-stopwatch" style={styles.comingSoonIcon} />
		<Text style={styles.comingSoonText}>{message}</Text>
	</View>
);

interface ISearchScreenViewProps extends INavigationProps, ITranslatedProps {
	loadedTabs: number[];
	searchTermValue: string;
	results: ISearchResultData[];
	suggestions: ISearchResultData[];
	searching: boolean;
	hasMoreResults: boolean;
	onTabIndexChanged: (value: { i: number }) => void;
	onSearchTermChange: (value: string) => void;
	onResultPress: (userId: string) => void;
	searchForMoreResults: () => void;
}

export const SearchScreenView: React.SFC<ISearchScreenViewProps> = ({
	navigation,
	loadedTabs,
	searchTermValue,
	onTabIndexChanged,
	onSearchTermChange,
	results,
	suggestions,
	hasMoreResults,
	searching,
	searchForMoreResults,
	onResultPress,
	getText,
}) => (
	<View style={styles.container}>
		<SearchHeader
			navigation={navigation}
			onSearchTermChange={onSearchTermChange}
			searchTermValue={searchTermValue}
			cancel={true}
			autoFocus={true}
		/>
		<Tabs
			locked={false}
			tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
			onChangeTab={onTabIndexChanged}
		>
			<Tab
				tabStyle={styles.tabStyle}
				activeTabStyle={styles.tabStyle}
				textStyle={styles.tabTitleTextInactive}
				activeTextStyle={styles.tabTitleTextActive}
				heading={getText('search.screen.results.tab.top.title')}
			>
				{loadedTabs.includes(0) && (
					<SearchTabResults
						searchTermValue={searchTermValue}
						searchResults={results}
						suggestions={suggestions}
						searching={searching}
						hasMoreResults={hasMoreResults}
						searchForMoreResults={searchForMoreResults}
						onResultPress={onResultPress}
						getText={getText}
					/>
				)}
			</Tab>
			<Tab
				tabStyle={styles.tabStyle}
				activeTabStyle={styles.tabStyle}
				textStyle={styles.tabTitleTextInactive}
				activeTextStyle={styles.tabTitleTextActive}
				heading={getText('search.screen.results.tab.people.title')}
			>
				{loadedTabs.includes(1) && (
					<ComingSoon message={getText('search.screen.results.coming.soon')} />
				)}
			</Tab>
			<Tab
				tabStyle={styles.tabStyle}
				activeTabStyle={styles.tabStyle}
				textStyle={styles.tabTitleTextInactive}
				activeTextStyle={styles.tabTitleTextActive}
				heading={getText('search.screen.results.tab.tags.title')}
			>
				{loadedTabs.includes(2) && (
					<ComingSoon message={getText('search.screen.results.coming.soon')} />
				)}
			</Tab>
			<Tab
				tabStyle={styles.tabStyle}
				activeTabStyle={styles.tabStyle}
				textStyle={styles.tabTitleTextInactive}
				activeTextStyle={styles.tabTitleTextActive}
				heading={getText('search.screen.results.tab.places.title')}
			>
				{loadedTabs.includes(3) && (
					<ComingSoon message={getText('search.screen.results.coming.soon')} />
				)}
			</Tab>
		</Tabs>
	</View>
);
