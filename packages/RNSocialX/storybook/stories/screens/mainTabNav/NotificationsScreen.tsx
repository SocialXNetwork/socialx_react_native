import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { NOTIFICATION_TYPES } from '../../../../src/environment/consts';
import { getTextMock } from '../../../../src/mocks';
import { NotificationsScreenView } from '../../../../src/screens/mainTabNav/NotificationsScreen.view';

const NOTIFICATION_CARDS = [
	{
		type: NOTIFICATION_TYPES.RECENT_COMMENT,
		avatar: 'https://placeimg.com/150/150/tech',
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
		requestId: '98132655216',
	},
	{
		type: NOTIFICATION_TYPES.FRIEND_REQUEST,
		avatar: 'https://placeimg.com/151/151/people',
		fullName: 'Teresa Lamb',
		username: 'terlamb',
		requestId: '981326537',
	},
	{
		type: NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE,
		avatar: 'https://placeimg.com/160/160/people',
		fullName: 'Teresa Lamb',
		username: 'terlamb',
		requestId: '981326538',
		text: 'Friend request accepted.',
	},
	{
		type: NOTIFICATION_TYPES.SUPER_LIKED,
		avatar: 'https://placeimg.com/152/152/tech',
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
		requestId: '26342126',
	},
	{
		type: NOTIFICATION_TYPES.GROUP_REQUEST,
		avatar: 'https://placeimg.com/150/150/tech',
		fullName: 'Claudia Kulmitzer',
		groupName: 'MfMJAkkAs2jLISYyv',
		requestId: '990325',
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
				onPostThumbPressed={action('onPostThumbPressed')}
				onSuperLikedPhotoPressed={action('onSuperLikedPhotoPressed')}
				onFriendRequestApproved={action('onFriendRequestApproved')}
				onFriendRequestDeclined={action('onFriendRequestDeclined')}
				onCheckNotification={action('onCheckNotification')}
				onViewUserProfile={action('onViewUserProfile')}
				showConfirm={action('showConfirm')}
				hideConfirm={action('hideConfirm')}
			/>
		);
	});
