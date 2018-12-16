import * as React from 'react';
import { FlatList, Image, Text, View } from 'react-native';

import { Header, Notification } from '../../components';
import { INotification, ITranslatedProps } from '../../types';

import styles, { Icon } from './NotificationsScreen.style';

interface INotificationsScreenViewProps extends ITranslatedProps {
	notifications: INotification[];
	refreshing: boolean;
	onRefresh: () => void;
	onViewUserProfile: (alias: string) => void;
	onShowOptions: (notificationId: string) => void;
}

const EmptyListComponent: React.SFC<ITranslatedProps> = ({ getText }) => (
	<View style={styles.empty}>
		<Image style={styles.icon} source={Icon} resizeMode="contain" />
		<Text style={styles.text}>{getText('notifications.empty.list')}</Text>
	</View>
);

export const NotificationsScreenView: React.SFC<INotificationsScreenViewProps> = ({
	notifications,
	refreshing,
	onRefresh,
	onViewUserProfile,
	onShowOptions,
	getText,
}) => (
	<View style={styles.container}>
		<Header title={getText('notifications.screen.title')} />
		<FlatList
			data={notifications}
			keyExtractor={(item: INotification) => item.id}
			renderItem={({ item }) => (
				<Notification
					notification={item}
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
