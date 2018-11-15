import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SuggestedSearches } from '../../../../src/components/';
import { getTextMock } from '../../../../src/mocks';
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

storiesOf('Components/displayers', module).add('SuggestedSearches', () => (
	<SuggestedSearches items={items} onResultPress={action('onResultPress')} getText={getTextMock} />
));
