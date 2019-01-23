import * as React from 'react';
import { FlatList, Image, ImageStyle, Text, View } from 'react-native';

import { Header, Notification } from '../../components';
import { Icons } from '../../environment/theme';
import { ITranslatedProps } from '../../types';

import styles from './NotificationsScreen.style';

interface INotificationsScreenViewProps extends ITranslatedProps {
	ids: string[];
	refreshing: boolean;
	onRefresh: () => void;
	onViewUserProfile: (alias: string) => void;
	onShowOptions: (id: string) => void;
}

const EmptyListComponent: React.SFC<ITranslatedProps> = ({ getText }) => (
	<View style={styles.empty}>
		<Image style={styles.icon as ImageStyle} source={Icons.noNotifications} resizeMode="contain" />
		<Text style={styles.text}>{getText('notifications.empty.list')}</Text>
	</View>
);

export const NotificationsScreenView: React.SFC<INotificationsScreenViewProps> = ({
	ids,
	refreshing,
	onRefresh,
	onViewUserProfile,
	onShowOptions,
	getText,
}) => (
	<View style={styles.container}>
		<Header title={getText('notifications.screen.title')} />
		<FlatList
			data={ids}
			keyExtractor={(id) => id}
			renderItem={({ item }) => (
				<Notification
					id={item}
					onViewUserProfile={onViewUserProfile}
					onShowOptions={onShowOptions}
					getText={getText}
				/>
			)}
			ListEmptyComponent={<EmptyListComponent getText={getText} />}
			refreshing={false}
			// onRefresh={onRefresh}
			contentContainerStyle={styles.list}
		/>
	</View>
);
