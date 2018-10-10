import { Tab, Tabs } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';

import { SearchHeader } from '../../../components';
import { INavigationProps, ITranslatedProps } from '../../../types';
import { PeopleTab } from './PeopleTab';
import { PlacesTab } from './PlacesTab';
import styles from './SearchResultsScreen.style';
import { TagsTab } from './TagsTab';
import { TopTab } from './TopTab';

interface ISearchResultsScreenViewProps
	extends INavigationProps,
		ITranslatedProps {
	loadedTabs: number[];
	searchTermValue: string;
	onTabIndexChanged: (value: { i: number }) => void;
	onSearchTermChange: (value: string) => void;
}

export class SearchResultsScreenView extends React.Component<
	ISearchResultsScreenViewProps
> {
	public render() {
		const {
			navigation,
			getText,
			loadedTabs,
			searchTermValue,
			onTabIndexChanged,
			onSearchTermChange,
		} = this.props;
		return (
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
							<TopTab
								navigation={navigation}
								searchTermValue={searchTermValue}
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
							<PeopleTab
								navigation={navigation}
								searchTermValue={searchTermValue}
							/>
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
							<TagsTab
								navigation={navigation}
								searchTermValue={searchTermValue}
							/>
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
							<PlacesTab
								navigation={navigation}
								searchTermValue={searchTermValue}
							/>
						)}
					</Tab>
				</Tabs>
			</View>
		);
	}
}
