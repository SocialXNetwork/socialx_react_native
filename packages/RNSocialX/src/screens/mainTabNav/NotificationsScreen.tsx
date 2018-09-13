/**
 * TODO list:
 * 1. Props data: notifications, loading
 * 2. Props actions: loadNotifications, checkNotification, acceptFriendRequest, declineFriendRequest
 */

import * as React from 'react';
import {Alert} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';

import {NOTIFICATION_TYPES} from '../../environment/consts';
import {ITranslatedProps} from '../../types';
import {NotificationsScreenView} from './NotificationsScreen.view';

// TODO: used this until we have all type of activity cards from the backend!
const SAMPLE_ACTIVITY_CARDS = [
	{
		type: NOTIFICATION_TYPES.RECENT_COMMENT,
		avatarURL: 'https://placeimg.com/150/150/tech',
		fullName: 'Seth Saunders',
		timestamp: new Date(2018, 2, 12, 5, 51, 23),
		wallPosts: [
			{
				postThumbURL: 'https://placeimg.com/140/140/nature',
				postId: '11',
			},
			{
				postThumbURL: 'https://placeimg.com/141/141/nature',
				postId: '22',
			},
			{
				postThumbURL: 'https://placeimg.com/142/142/nature',
				postId: '33',
			},
			{
				postThumbURL: 'https://placeimg.com/143/143/nature',
				postId: '44',
			},
			{
				postThumbURL: 'https://placeimg.com/144/144/nature',
				postId: '55',
			},
		],
	},
	{
		type: NOTIFICATION_TYPES.FRIEND_REQUEST,
		avatarURL: 'https://placeimg.com/151/151/people',
		fullName: 'Teresa Lamb',
		userName: 'terlamb',
		requestId: '981326537',
	},
	{
		type: NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE,
		avatarURL: 'https://placeimg.com/160/160/people',
		fullName: 'Teresa Lamb',
		userName: 'terlamb',
		requestId: '981326538',
		text: 'Friend request accepted.',
	},
	{
		type: NOTIFICATION_TYPES.SUPER_LIKED,
		avatarURL: 'https://placeimg.com/152/152/tech',
		fullName: 'Cory Maxwell',
		timestamp: new Date(2018, 1, 24, 8, 23, 12),
		wallPosts: [
			{
				postThumbURL: 'https://placeimg.com/130/130/arch',
				postId: '130',
			},
			{
				postThumbURL: 'https://placeimg.com/131/131/arch',
				postId: '131',
			},
			{
				postThumbURL: 'https://placeimg.com/132/132/arch',
				postId: '132',
			},
			{
				postThumbURL: 'https://placeimg.com/133/133/arch',
				postId: '133',
			},
			{
				postThumbURL: 'https://placeimg.com/135/135/arch',
				postId: '134',
			},
		],
	},
	{
		type: NOTIFICATION_TYPES.GROUP_REQUEST,
		avatarURL: 'https://placeimg.com/150/150/tech',
		fullName: 'Claudia Kulmitzer',
		groupName: 'MfMJAkkAs2jLISYyv',
		requestId: '990325',
	},
];

interface INotificationsScreenProps extends ITranslatedProps {
	notifications: any;
	loading: boolean;
	loadNotifications: () => void;
	checkNotification: (requestId: string, failed: string) => void;
	acceptFriendRequest: (requestId: string, failed: string) => void;
	declineFriendRequest: (requestId: string, failed: string) => void;
	navigation: NavigationScreenProp<any>;
}

interface INotificationsScreenState {
	refreshing: boolean;
}

export class NotificationsScreen extends React.Component<INotificationsScreenProps, INotificationsScreenState> {
	public static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'ACTIVITY',
	};

	public state = {
		refreshing: false,
	};

	public render() {
		const {notifications, loading, getText} = this.props;

		return (
			<NotificationsScreenView
				isLoading={loading}
				notifications={notifications}
				refreshing={this.state.refreshing}
				onRefresh={this.onRefreshHandler}
				onPostThumbPressed={this.postThumbPressedHandler}
				onSuperLikedPhotoPressed={this.superLikedPhotoPressedHandler}
				onCheckNotification={this.checkNotification}
				onFriendRequestApproved={this.onFriendRequestApprovedHandler}
				onFriendRequestDeclined={this.onFriendRequestDeclinedHandler}
				// onGroupRequestApproved={this.groupRequestApprovedHandler}
				// onGroupRequestDeclined={this.onGroupRequestDeclinedHandler}
				onViewUserProfile={this.onViewUserProfile}
				getText={getText}
			/>
		);
	}

	private onRefreshHandler = async () => {
		this.setState({refreshing: true});
		this.props.loadNotifications();
		this.setState({refreshing: false});
	};

	private postThumbPressedHandler = (postId: string) => {
		Alert.alert('postThumbPressedHandler: ' + postId);
	};

	private superLikedPhotoPressedHandler = (postId: string) => {
		Alert.alert('superLikedPhotoPressedHandler: ' + postId);
	};

	private onFriendRequestApprovedHandler = async (requestId: string) => {
		const {acceptFriendRequest, getText} = this.props;
		acceptFriendRequest(requestId, getText('notifications.friend.request.accept.failed'));
	};

	private onFriendRequestDeclinedHandler = async (requestId: string) => {
		const {declineFriendRequest, getText} = this.props;
		declineFriendRequest(requestId, getText('notifications.friend.request.decline.failed'));
	};

	// private groupRequestApprovedHandler = (requestId: string) => {
	// 	Alert.alert('groupRequestApprovedHandler: ' + requestId);
	// };

	// private onGroupRequestDeclinedHandler = (requestId: string) => {
	// 	Alert.alert('onGroupRequestDeclinedHandler: ' + requestId);
	// };

	private checkNotification = async (requestId: string) => {
		const {checkNotification, getText} = this.props;
		checkNotification(requestId, getText('notifications.check.failed'));
	};

	private onViewUserProfile = (userId: string) => {
		this.props.navigation.navigate('UserProfileScreen', {userId});
	};
}
