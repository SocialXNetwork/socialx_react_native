import moment from 'moment';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { AvatarImage, ButtonSizes, PrimaryButton } from '../../components';
import { NOTIFICATION_TYPES } from '../../environment/consts';
import { INotification, ITranslatedProps } from '../../types';

import { IWithFriendsEnhancedActions, WithFriends } from '../../enhancers/intermediary';
import { IApplicationState, selectNotification } from '../../store/selectors';

import styles, { colors } from './Notification.style';

interface INotificationProps extends ITranslatedProps {
	id: string;
	onViewUserProfile: (alias: string) => void;
	onShowOptions: (id: string) => void;
}

interface IProps extends INotificationProps, IWithFriendsEnhancedActions {
	notification: INotification;
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
	const {
		id,
		avatar,
		fullName,
		owner: { alias },
		timestamp,
		type,
	} = notification;

	let text = '';
	let buttons = false;

	switch (type) {
		case NOTIFICATION_TYPES.FRIEND_REQUEST:
			text = getText('notifications.friend.request');
			buttons = true;
			break;
		case NOTIFICATION_TYPES.FRIEND_RESPONSE_ACCEPTED:
			text = getText('notifications.friend.request.accepted');
			break;
		case NOTIFICATION_TYPES.FRIEND_RESPONSE_DECLINED:
			text = getText('notifications.friend.request.declined');
			break;
		default:
			break;
	}

	return (
		<TouchableOpacity
			onPress={() => onViewUserProfile(alias)}
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
							onPress={() => onAcceptFriendRequest(alias!)}
						/>
						<PrimaryButton
							autoWidth={true}
							label={getText('button.decline')}
							loading={request.rejecting}
							size={ButtonSizes.Small}
							borderColor={colors.pink}
							textColor={colors.pink}
							containerStyle={styles.ghostButton}
							onPress={() => onDeclineFriendRequest(alias!)}
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

export const EnhancedComponent: React.SFC<IProps> = (props) => (
	<WithFriends>
		{({ data, actions }) => <Component {...props} request={data.request} {...actions} />}
	</WithFriends>
);

const mapStateToProps = (state: IApplicationState, props: INotificationProps) => ({
	notification: selectNotification(state, props),
});

export const Notification = connect(mapStateToProps)(EnhancedComponent as any);
