import * as React from 'react';
import {FlatList, Image, Text, View} from 'react-native';

import {
	ActivityFriendRequestCard,
	ActivityGenericCard,
	ActivityRecentCommentCard,
	ActivitySuperLikedCard,
} from '../../components';
import {IWithLoaderProps, WithInlineLoader} from '../../components/inlineLoader';
import {NOTIFICATION_TYPES} from '../../environment/consts';
import {IConfirmActions, ITranslatedProps} from '../../types';
import styles, {emptyListIcon} from './NotificationsScreen.style';

interface INotificationsScreenViewProps extends IWithLoaderProps, ITranslatedProps, IConfirmActions {
	notifications: any[];
	refreshing: boolean;
	onRefresh: () => void;
	onPostThumbPressed: (postId: string) => void;
	onSuperLikedPhotoPressed: (postId: string) => void;
	onFriendRequestApproved: (requestId: string) => void;
	onFriendRequestDeclined: (requestId: string) => void;
	// onGroupRequestConfirmed: (requestId: string) => void;
	// onGroupRequestDeclined: (requestId: string) => void;
	onCheckNotification: (requestId: string) => void;
	onViewUserProfile: (userId: string) => void;
}

interface IActivityCardsProps extends ITranslatedProps, IConfirmActions {
	data: any;
	onPostThumbPressed: (postId: string) => void;
	onSuperLikedPhotoPressed: (postId: string) => void;
	onFriendRequestApproved: (requestId: string) => void;
	onFriendRequestDeclined: (requestId: string) => void;
	// onGroupRequestConfirmed: (requestId: string) => void;
	// onGroupRequestDeclined: (requestId: string) => void;
	onCheckNotification: (requestId: string) => void;
	onViewUserProfile: (userId: string) => void;
}

const EmptyListComponent: React.SFC<ITranslatedProps> = ({getText}) => (
	<View style={styles.emptyContainer}>
		<Image style={styles.noNotificationsIcon} source={emptyListIcon} resizeMode={'contain'} />
		<Text style={styles.noNotificationsText}>{getText('notifications.empty.list')}</Text>
	</View>
);

const ActivityCard: React.SFC<IActivityCardsProps> = ({
	data,
	onPostThumbPressed,
	onFriendRequestApproved,
	onFriendRequestDeclined,
	onViewUserProfile,
	onCheckNotification,
	onSuperLikedPhotoPressed,
	showConfirm,
	hideConfirm,
	getText,
	// onGroupRequestConfirmed,
	// onGroupRequestDeclined,
}) => {
	const {requestId} = data;

	if (data.type === NOTIFICATION_TYPES.RECENT_COMMENT) {
		return <ActivityRecentCommentCard {...data} onThumbPress={onPostThumbPressed} getText={getText} />;
	} else if (data.type === NOTIFICATION_TYPES.FRIEND_REQUEST) {
		return (
			<ActivityFriendRequestCard
				{...data}
				onRequestConfirmed={() => onFriendRequestApproved(requestId)}
				onRequestDeclined={() => onFriendRequestDeclined(requestId)}
				onViewUserProfile={onViewUserProfile}
				getText={getText}
			/>
		);
	} else if (data.type === NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE) {
		return (
			<ActivityGenericCard
				{...data}
				onCheckNotification={onCheckNotification}
				onViewUserProfile={onViewUserProfile}
				getText={getText}
				showConfirm={showConfirm}
				hideConfirm={hideConfirm}
			/>
		);
		/*} else if (data.type === NOTIFICATION_TYPES.GROUP_REQUEST) {
			return (
				<GroupRequest
					{...data}
					onGroupConfirmed={() => onGroupRequestConfirmed(requestId)}
					onGroupDeclined={() => onGroupRequestDeclined(requestId)}
				/>
			);*/
	} else if (data.type === NOTIFICATION_TYPES.SUPER_LIKED) {
		return <ActivitySuperLikedCard {...data} onThumbPress={onSuperLikedPhotoPressed} getText={getText} />;
	}
	return null;
};

export const NotificationsScreenView: React.SFC<INotificationsScreenViewProps> = ({
	notifications,
	refreshing,
	onRefresh,
	onPostThumbPressed,
	onSuperLikedPhotoPressed,
	onFriendRequestApproved,
	onFriendRequestDeclined,
	// onGroupRequestConfirmed,
	// onGroupRequestDeclined,
	onCheckNotification,
	onViewUserProfile,
	showConfirm,
	hideConfirm,
	isLoading,
	getText,
}) => (
	<WithInlineLoader isLoading={isLoading}>
		<View style={styles.container}>
			<FlatList
				data={notifications}
				keyExtractor={(item: any) => item.requestId}
				renderItem={(data) => (
					<ActivityCard
						getText={getText}
						data={data.item}
						onPostThumbPressed={onPostThumbPressed}
						onFriendRequestApproved={onFriendRequestApproved}
						onFriendRequestDeclined={onFriendRequestDeclined}
						onViewUserProfile={onViewUserProfile}
						onCheckNotification={onCheckNotification}
						onSuperLikedPhotoPressed={onSuperLikedPhotoPressed}
						hideConfirm={hideConfirm}
						showConfirm={showConfirm}
						// onGroupRequestConfirmed={onGroupRequestConfirmed}
						// onGroupRequestDeclined={onGroupRequestDeclined}
					/>
				)}
				ListEmptyComponent={<EmptyListComponent getText={getText} />}
				refreshing={refreshing}
				onRefresh={onRefresh}
			/>
		</View>
	</WithInlineLoader>
);
