import React from 'react';
import { FlatList, Image, ImageStyle, Text, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Header, Notification } from '../../components';
import { Icons } from '../../environment/theme';
import { IDictionary } from '../../types';
import styles from './NotificationsScreen.style';

const EmptyList: React.SFC<IDictionary> = ({ dictionary }) => (
	<View style={styles.empty}>
		<Image style={styles.icon as ImageStyle} source={Icons.noNotifications} resizeMode="contain" />
		<Text style={styles.text}>{dictionary.screens.notifications.empty}</Text>
	</View>
);

interface IProps extends IDictionary {
	ids: string[];
	refreshing: boolean;
	onRefresh: () => void;
	onWillFocus: () => void;
	onViewUserProfile: (alias: string) => void;
	onShowOptions: (id: string) => void;
}

export const NotificationsScreenView: React.SFC<IProps> = ({
	ids,
	dictionary,
	// refreshing,
	// onRefresh,
	onWillFocus,
	onViewUserProfile,
	onShowOptions,
}) => (
	<View style={styles.container}>
		<NavigationEvents onWillFocus={onWillFocus} />
		<Header title={dictionary.screens.notifications.title} />
		<FlatList
			data={ids}
			keyExtractor={(id) => id}
			renderItem={({ item }) => (
				<Notification
					id={item}
					dictionary={dictionary}
					onViewUserProfile={onViewUserProfile}
					onShowOptions={onShowOptions}
				/>
			)}
			ListEmptyComponent={<EmptyList dictionary={dictionary} />}
			// refreshing={refreshing}
			// onRefresh={onRefresh}
			contentContainerStyle={styles.list}
		/>
	</View>
);
