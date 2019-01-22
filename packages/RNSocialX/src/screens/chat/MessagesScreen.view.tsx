import { Tab, Tabs } from 'native-base';
import * as React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import { SearchHeader, UserEntries } from '../../components';
import { INavigationProps } from '../../types';

import styles from './MessagesScreen.style';

interface IProps extends INavigationProps {
	term: string;
	messages: string[];
	people: string[];
	onChangeText: (term: string) => void;
	onChangeTab: () => void;
	onRemoveMessage: (alias: string) => void;
}

export const MessagesScreenView: React.SFC<IProps> = ({
	term,
	messages,
	people,
	navigation,
	onChangeText,
	onChangeTab,
	onRemoveMessage,
}) => (
	<View style={styles.container}>
		<SearchHeader
			term={term}
			back={true}
			cancel={true}
			navigation={navigation}
			onSearchTermChange={onChangeText}
		/>
		<Tabs tabBarUnderlineStyle={styles.underline as ViewStyle} onChangeTab={onChangeTab}>
			<Tab
				tabStyle={styles.tab as ViewStyle}
				activeTabStyle={styles.tab as ViewStyle}
				textStyle={styles.title as TextStyle}
				activeTextStyle={[styles.title, styles.active] as TextStyle}
				heading="Messages"
			>
				<View style={styles.entries}>
					<UserEntries
						aliases={messages}
						chat={true}
						removable={true}
						onEntryPress={() => undefined}
						onRemove={onRemoveMessage}
					/>
				</View>
			</Tab>
			<Tab
				tabStyle={styles.tab as ViewStyle}
				activeTabStyle={styles.tab as ViewStyle}
				textStyle={styles.title as TextStyle}
				activeTextStyle={[styles.title, styles.active] as TextStyle}
				heading="People"
			>
				<View style={styles.entries}>
					<UserEntries aliases={people} onEntryPress={() => undefined} />
				</View>
			</Tab>
		</Tabs>
	</View>
);
