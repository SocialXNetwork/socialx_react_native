import moment from 'moment';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { IWithFriendsEnhancedActions, WithFriends } from '../../enhancers/intermediary';
import { IApplicationState, selectNotification } from '../../store/selectors';

import { AvatarImage, ButtonSizes, PrimaryButton } from '../../components';
import { NOTIFICATION_TYPES } from '../../environment/consts';
import { Colors } from '../../environment/theme';
import { IDictionary, INotification } from '../../types';
import styles from './Notification.style';

interface INotificationProps extends IDictionary {
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
	dictionary,
	onViewUserProfile,
	onShowOptions,
	onAcceptFriendRequest,
	onDeclineFriendRequest,
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
			text = dictionary.components.displayers.notification.request;
			buttons = true;
			break;
		case NOTIFICATION_TYPES.FRIEND_RESPONSE_ACCEPTED:
			text = dictionary.components.displayers.notification.accepted;
			break;
		case NOTIFICATION_TYPES.FRIEND_RESPONSE_DECLINED:
			text = dictionary.components.displayers.notification.declined;
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
							label={dictionary.components.buttons.accept}
							loading={request.accepting}
							size={ButtonSizes.Small}
							borderColor={Colors.pink}
							textColor={Colors.white}
							containerStyle={styles.button}
							onPress={() => onAcceptFriendRequest(alias, id)}
						/>
						<PrimaryButton
							autoWidth={true}
							label={dictionary.components.buttons.decline}
							loading={request.rejecting}
							size={ButtonSizes.Small}
							borderColor={Colors.pink}
							textColor={Colors.pink}
							containerStyle={styles.ghostButton}
							onPress={() => onDeclineFriendRequest(alias, id)}
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

const EnhancedComponent: React.SFC<IProps> = (props) => (
	<WithFriends>
		{({ data, actions }) => <Component {...props} request={data.request} {...actions} />}
	</WithFriends>
);

const mapStateToProps = (state: IApplicationState, props: INotificationProps) => ({
	notification: selectNotification(state.data.notifications, props.id),
});

export const Notification = connect(mapStateToProps)(EnhancedComponent as any);
