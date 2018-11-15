import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { UserEntries } from '../../../../src/components/';
import { FRIEND_TYPES, IUserEntry } from '../../../../src/types';

const items: IUserEntry[] = [
	{
		userId: '1',
		relationship: FRIEND_TYPES.NOT_FRIEND,
		fullName: 'Alex Sirbu',
		userName: 'alexsirbu',
		location: 'Timisoara',
		avatar: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
	{
		userId: '2',
		relationship: FRIEND_TYPES.MUTUAL,
		fullName: 'Alex Sirbu',
		userName: 'alexsirbu',
		location: 'Timisoara',
		avatar: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
	{
		userId: '3',
		relationship: FRIEND_TYPES.MUTUAL,
		fullName: 'Alex Sirbu',
		userName: 'alexsirbu',
		location: 'Timisoara',
		avatar: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
];

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.add('UserEntries', () => {
		const hasMore = boolean('hasMore', true);
		return (
			<UserEntries
				hasMore={hasMore}
				entries={items}
				onEntryPress={action('onResultPress')}
				onLoadMore={action('onLoadMore')}
			/>
		);
	});
