import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { AddFriendsList } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const taggedFriends = [
	{
		id: '1',
		fullName: 'Alex Sirbu',
		location: 'Timisoara',
		avatar: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
	{
		id: '2',
		fullName: 'Alex Sirbu',
		location: 'Timisoara',
		avatar: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
];

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('AddFriendsList', () => (
		<AddFriendsList
			showTagFriendsModal={action('showTagFriendsModal')}
			taggedFriends={taggedFriends}
		/>
	));
