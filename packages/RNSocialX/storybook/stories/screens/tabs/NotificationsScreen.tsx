import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { NOTIFICATION_TYPES } from '../../../../src/environment/consts';
import { getTextMock } from '../../../../src/mocks';
import { NotificationsScreenView } from '../../../../src/screens/tabs/NotificationsScreen.view';

const NOTIFICATION_CARDS = [
	{
		notificationId: 'id1',
		alias: 'alias',
		type: NOTIFICATION_TYPES.RECENT_COMMENT,
		avatar: 'https://placeimg.com/150/150/tech',
		fullName: 'Seth Saunders',
		timestamp: new Date(2018, 2, 12, 5, 51, 23),
		seen: false,
	},
	{
		notificationId: 'id1',
		alias: 'alias',
		type: NOTIFICATION_TYPES.FRIEND_REQUEST,
		avatar: 'https://placeimg.com/151/151/people',
		fullName: 'Teresa Lamb',
		seen: false,
	},
	{
		notificationId: 'id1',
		alias: 'alias',
		type: NOTIFICATION_TYPES.FRIEND_RESPONSE_ACCEPTED,
		avatar: 'https://placeimg.com/160/160/people',
		fullName: 'Teresa Lamb',
		seen: false,
	},
	{
		notificationId: 'id1',
		alias: 'alias',
		type: NOTIFICATION_TYPES.FRIEND_RESPONSE_DECLINED,
		avatar: 'https://placeimg.com/152/152/tech',
		fullName: 'Cory Maxwell',
		timestamp: new Date(2018, 1, 24, 8, 23, 12),
	},
	{
		notificationId: 'id1',
		alias: 'alias',
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
				ids={[]}
				refreshing={refreshing}
				onRefresh={action('onRefresh')}
				onViewUserProfile={action('onViewUserProfile')}
				onShowOptions={action('onShowOptions')}
				getText={getTextMock}
			/>
		);
	});
