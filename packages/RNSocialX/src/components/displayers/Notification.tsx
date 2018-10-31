import moment from 'moment';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AvatarImage, ButtonSizes, PrimaryButton } from '../../components';
import { NOTIFICATION_TYPES } from '../../environment/consts';
import { INotificationData, ITranslatedProps } from '../../types';

import styles, { buttonWidth, colors } from './Notification.style';

interface INotificationProps extends ITranslatedProps {
	notification: INotificationData;
	onViewUserProfile: (userId: string) => void;
	onFriendRequestApprove: (friendshipId: string, userName: string) => void;
	onFriendRequestDecline: (friendshipId: string, userName: string, notificationId: string) => void;
	onGroupRequestApprove: (notificationId: string) => void;
	onGroupRequestDecline: (notificationId: string) => void;
}

export const Notification: React.SFC<INotificationProps> = ({
	notification,
	onFriendRequestApprove,
	onFriendRequestDecline,
	onGroupRequestApprove,
	onGroupRequestDecline,
	onViewUserProfile,
	getText,
}) => {
	const {
		notificationId,
		userId,
		avatar,
		fullName,
		userName,
		type,
		timestamp,
		groupName,
		friendshipId,
	} = notification;

	let text = '';
	let buttons = false;

	switch (type) {
		case NOTIFICATION_TYPES.FRIEND_REQUEST:
			text = getText('notifications.card.friend.request.title');
			buttons = true;
			break;
		case NOTIFICATION_TYPES.GROUP_REQUEST:
			text = getText('notifications.card.group.request.title');
			buttons = true;
			break;
		case NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE:
			text = getText('notifications.friend.request.accepted');
			break;
		case NOTIFICATION_TYPES.SUPER_LIKED:
			text = getText('notifications.card.super.liked');
			break;
		case NOTIFICATION_TYPES.RECENT_COMMENT:
			text = getText('notifications.card.recent.comment.title');
			break;
		default:
			break;
	}

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<TouchableOpacity style={styles.row} onPress={() => onViewUserProfile(userId)}>
					<AvatarImage image={avatar} style={styles.avatarImage} />
					<View style={{ flex: 1 }}>
						<Text style={[styles.fullName, { paddingBottom: groupName ? 5 : 0 }]}>{fullName}</Text>
						{userName && <Text style={styles.userName}>{'@' + userName}</Text>}
						<Text style={styles.text}>{text}</Text>
						{groupName && <Text style={styles.userName}>{'@' + groupName}</Text>}
						<Text style={styles.timestamp}>{moment(timestamp).fromNow()}</Text>
					</View>
					{buttons && (
						<View style={styles.buttons}>
							<PrimaryButton
								width={buttonWidth}
								label={getText('button.accept')}
								size={ButtonSizes.Small}
								borderColor={colors.pink}
								textColor={colors.white}
								containerStyle={styles.button}
								onPress={
									groupName
										? () => onGroupRequestApprove(notificationId)
										: () => onFriendRequestApprove(friendshipId!, userName!)
								}
							/>
							<PrimaryButton
								width={buttonWidth}
								label={getText('button.decline')}
								size={ButtonSizes.Small}
								borderColor={colors.pink}
								textColor={colors.pink}
								containerStyle={styles.ghostButton}
								onPress={
									groupName
										? () => onGroupRequestDecline(notificationId)
										: () => onFriendRequestDecline(friendshipId!, userName!, notificationId)
								}
							/>
						</View>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};
