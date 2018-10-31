import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SuggestedSearches } from '../../../../src/components/';
import { getTextMock } from '../../../../src/mocks';
import { ISearchResultData, SearchResultKind } from '../../../../src/types';

const items: ISearchResultData[] = [
	{
		userId: '1',
		relationship: SearchResultKind.NotFriend,
		fullName: 'Alex Sirbu',
		userName: 'alexsirbu',
		location: 'Timisoara',
		avatar: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
	{
		userId: '2',
		relationship: SearchResultKind.Friend,
		fullName: 'Alex Sirbu',
		userName: 'alexsirbu',
		location: 'Timisoara',
		avatar: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
	{
		userId: '3',
		relationship: SearchResultKind.Friend,
		fullName: 'Alex Sirbu',
		userName: 'alexsirbu',
		location: 'Timisoara',
		avatar: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
];

storiesOf('Components/displayers', module).add('SuggestedSearches', () => (
	<SuggestedSearches items={items} onResultPress={action('onResultPress')} getText={getTextMock} />
));
