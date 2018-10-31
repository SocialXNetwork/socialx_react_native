import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SearchResultsList } from '../../../../src/components/';
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

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.add('SearchResultsList', () => {
		const hasMore = boolean('hasMore', true);
		return (
			<SearchResultsList
				hasMore={hasMore}
				searchResults={items}
				onResultPress={action('onResultPress')}
				onLoadMore={action('onLoadMore')}
			/>
		);
	});
