import { Tab, Tabs } from 'native-base';
import * as React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { SearchHeader, SearchTabResults } from '../../../components';
import {
	INavigationParamsActions,
	INavigationProps,
	ISearchResultData,
	ITranslatedProps,
} from '../../../types';
import styles from './SearchScreen.style';

const ComingSoon: React.SFC<{ message: string }> = ({ message }) => (
	<View style={styles.comingSoonContainer}>
		<Icon name="md-stopwatch" style={styles.comingSoonIcon} />
		<Text style={styles.comingSoonText}>{message}</Text>
	</View>
);

interface ISearchScreenViewProps
	extends INavigationProps,
		ITranslatedProps,
		INavigationParamsActions {
	loadedTabs: number[];
	searchTermValue: string;
	topSearchResults: ISearchResultData[];
	topSuggestions: ISearchResultData[];
	topSearching: boolean;
	topHasMoreResults: boolean;
	onTabIndexChanged: (value: { i: number }) => void;
	onSearchTermChange: (value: string) => void;
	searchForMoreResults: () => void;
	addFriend: (userId: string) => void;
}

export const SearchScreenView: React.SFC<ISearchScreenViewProps> = ({
	navigation,
	getText,
	loadedTabs,
	searchTermValue,
	onTabIndexChanged,
	onSearchTermChange,
	topSearchResults,
	topSuggestions,
	topHasMoreResults,
	topSearching,
	searchForMoreResults,
	addFriend,
	setNavigationParams,
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
			locked={false} // allow swipe to change tabs
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
						navigation={navigation}
						searchResults={topSearchResults}
						suggestions={topSuggestions}
						searching={topSearching}
						hasMoreResults={topHasMoreResults}
						addFriend={addFriend}
						searchForMoreResults={searchForMoreResults}
						getText={getText}
						setNavigationParams={setNavigationParams}
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
