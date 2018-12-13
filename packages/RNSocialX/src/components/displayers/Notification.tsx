import moment from 'moment';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AvatarImage, ButtonSizes, PrimaryButton } from '../../components';
import { NOTIFICATION_TYPES } from '../../environment/consts';
import { INotificationData, ITranslatedProps } from '../../types';

import { IWithFriendsEnhancedActions, WithFriends } from '../../enhancers/intermediary';

import styles, { colors } from './Notification.style';

interface INotificationProps extends ITranslatedProps {
	notification: INotificationData;
	onViewUserProfile: (userId: string) => void;
	onShowOptions: (notificationId: string) => void;
}

interface IProps extends INotificationProps, IWithFriendsEnhancedActions {
	request: {
		accepting: boolean;
		rejecting: boolean;
	};
}

const Component: React.SFC<IProps> = ({
	notification,
	request,
	onViewUserProfile,
	onShowOptions,
	onAcceptFriendRequest,
	onDeclineFriendRequest,
	getText,
}) => {
	const { id, userId, avatar, fullName, userName, type, timestamp } = notification;

	let text = '';
	let buttons = false;

	switch (type) {
		case NOTIFICATION_TYPES.FRIEND_REQUEST:
			text = getText('notifications.friend.request.sent');
			buttons = true;
			break;
		case NOTIFICATION_TYPES.GROUP_REQUEST:
			text = getText('notifications.group.request.sent');
			buttons = true;
			break;
		case NOTIFICATION_TYPES.FRIEND_RESPONSE_ACCEPTED:
			text = getText('notifications.friend.request.accepted');
			break;
		case NOTIFICATION_TYPES.FRIEND_RESPONSE_DECLINED:
			text = getText('notifications.friend.request.declined');
			break;
		case NOTIFICATION_TYPES.SUPER_LIKED:
			text = getText('notifications.super.liked');
			break;
		case NOTIFICATION_TYPES.RECENT_COMMENT:
			text = getText('notifications.recent.comment');
			break;
		default:
			break;
	}

	return (
		<TouchableOpacity
			onPress={() => onViewUserProfile(userId)}
			onLongPress={() => onShowOptions(id)}
			activeOpacity={1}
			style={styles.container}
		>
			<AvatarImage image={avatar} style={styles.avatarImage} />
			<View style={[styles.details, { justifyContent: !buttons ? 'center' : 'flex-start' }]}>
				<Text>
					<Text style={styles.fullName}>{fullName}</Text>
					<Text style={styles.text}>{' ' + text}</Text>
				</Text>
				{buttons && (
					<View style={styles.buttons}>
						<PrimaryButton
							autoWidth={true}
							label={getText('button.accept')}
							loading={request.accepting}
							size={ButtonSizes.Small}
							borderColor={colors.pink}
							textColor={colors.white}
							containerStyle={styles.button}
							onPress={() => onAcceptFriendRequest(userName!)}
						/>
						<PrimaryButton
							autoWidth={true}
							label={getText('button.decline')}
							loading={request.rejecting}
							size={ButtonSizes.Small}
							borderColor={colors.pink}
							textColor={colors.pink}
							containerStyle={styles.ghostButton}
							onPress={() => onDeclineFriendRequest(userName!)}
						/>
					</View>
				)}
			</View>
			<View style={{ justifyContent: !buttons ? 'center' : 'flex-start' }}>
				<Text style={styles.timestamp}>{moment(timestamp).fromNow()}</Text>
			</View>
		</TouchableOpacity>
	);
};

export const Notification: React.SFC<INotificationProps> = (props) => (
	<WithFriends>
		{({ data, actions }) => <Component {...props} request={data.request} {...actions} />}
	</WithFriends>
);
