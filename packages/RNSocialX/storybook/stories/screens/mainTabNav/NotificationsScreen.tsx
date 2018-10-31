import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { NOTIFICATION_TYPES } from '../../../../src/environment/consts';
import { getTextMock } from '../../../../src/mocks';
import { NotificationsScreenView } from '../../../../src/screens/mainTabNav/NotificationsScreen.view';

const NOTIFICATION_CARDS = [
	{
		notificationId: 'id1',
		userId: 'userId',
		type: NOTIFICATION_TYPES.RECENT_COMMENT,
		avatar: 'https://placeimg.com/150/150/tech',
		fullName: 'Seth Saunders',
		timestamp: new Date(2018, 2, 12, 5, 51, 23),
	},
	{
		notificationId: 'id1',
		userId: 'userId',
		type: NOTIFICATION_TYPES.FRIEND_REQUEST,
		avatar: 'https://placeimg.com/151/151/people',
		fullName: 'Teresa Lamb',
	},
	{
		notificationId: 'id1',
		userId: 'userId',
		type: NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE,
		avatar: 'https://placeimg.com/160/160/people',
		fullName: 'Teresa Lamb',
	},
	{
		notificationId: 'id1',
		userId: 'userId',
		type: NOTIFICATION_TYPES.SUPER_LIKED,
		avatar: 'https://placeimg.com/152/152/tech',
		fullName: 'Cory Maxwell',
		timestamp: new Date(2018, 1, 24, 8, 23, 12),
	},
	{
		notificationId: 'id1',
		userId: 'userId',
		type: NOTIFICATION_TYPES.GROUP_REQUEST,
		avatar: 'https://placeimg.com/150/150/tech',
		fullName: 'Claudia Kulmitzer',
		groupName: 'MfMJAkkAs2jLISYyv',
	},
];

storiesOf('Screens/mainTabNav', module)
	.addDecorator(withKnobs)
	.add('NotificationsScreen', () => {
		const refreshing = boolean('refreshing', false);
		return (
			<NotificationsScreenView
				getText={getTextMock}
				notifications={NOTIFICATION_CARDS}
				refreshing={refreshing}
				onRefresh={action('onRefresh')}
				onSuperLikedPhotoPressed={action('onSuperLikedPhotoPressed')}
				onFriendRequestApprove={action('onFriendRequestApprove')}
				onGroupRequestApprove={action('onGroupRequestApprove')}
				onFriendRequestDecline={action('onFriendRequestDecline')}
				onGroupRequestDecline={action('onGroupRequestDecline')}
				onViewUserProfile={action('onViewUserProfile')}
			/>
		);
	});
