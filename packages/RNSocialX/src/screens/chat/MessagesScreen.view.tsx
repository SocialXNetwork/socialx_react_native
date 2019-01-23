import { Tab, Tabs } from 'native-base';
import * as React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import { SearchHeader, UserEntries } from '../../components';
import { INavigationProps } from '../../types';

import styles from './MessagesScreen.style';

interface IProps extends INavigationProps {
	messages: string[];
	people: string[];
	onRemoveMessage: (alias: string) => void;
	onEntryPress: (alias: string) => void;
}

export const MessagesScreenView: React.SFC<IProps> = ({
	messages,
	people,
	navigation,
	onRemoveMessage,
	onEntryPress,
}) => (
	<View style={styles.container}>
		<SearchHeader cancel={false} overlay={true} back={true} navigation={navigation} />
		<Tabs tabBarUnderlineStyle={styles.underline as ViewStyle}>
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
						onEntryPress={onEntryPress}
						onRemove={onRemoveMessage}
					/>
				</View>
			</Tab>
			<Tab
				tabStyle={styles.tab as ViewStyle}
				activeTabStyle={styles.tab as ViewStyle}
				textStyle={styles.title as TextStyle}
				activeTextStyle={[styles.title, styles.active] as TextStyle}
				heading="Friends"
			>
				<View style={styles.entries}>
					<UserEntries aliases={people} onEntryPress={onEntryPress} />
				</View>
			</Tab>
		</Tabs>
	</View>
);
