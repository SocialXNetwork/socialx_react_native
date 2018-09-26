import * as React from 'react';
import { Text, View } from 'react-native';

import { ITabMenuItem, TabButton } from './';
import styles from './NotificationsWithBadge.style';

interface INotificationsWithBadgeProps {
	item: ITabMenuItem;
	notifications: number;
	selectedTab: string;
	tabChange: (tab: string) => void;
}

export const NotificationsWithBadge: React.SFC<
	INotificationsWithBadgeProps
> = ({ item, notifications, selectedTab, tabChange }) => (
	<View style={styles.container}>
		<TabButton item={item} selectedTab={selectedTab} tabChange={tabChange} />

		{notifications > 0 ? (
			<View style={styles.background}>
				<Text style={styles.badge}>{notifications}</Text>
			</View>
		) : (
			<View />
		)}
	</View>
);
