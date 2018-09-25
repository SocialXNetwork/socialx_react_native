import {action} from '@storybook/addon-actions';
import {boolean, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {SearchResults} from '../../../../src/components/';
import {ISearchResultData, SearchResultKind} from '../../../../src/types';

const items: ISearchResultData[] = [
	{
		userId: '1',
		relationship: SearchResultKind.NotFriend,
		fullName: 'Alex Sirbu',
		userName: 'alexsirbu',
		location: 'Timisoara',
		avatarURL: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
	{
		userId: '2',
		relationship: SearchResultKind.Friend,
		fullName: 'Alex Sirbu',
		userName: 'alexsirbu',
		location: 'Timisoara',
		avatarURL: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
	{
		userId: '3',
		relationship: SearchResultKind.Friend,
		fullName: 'Alex Sirbu',
		userName: 'alexsirbu',
		location: 'Timisoara',
		avatarURL: 'https://www.w3schools.com/w3css/img_lights.jpg',
	},
];

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.add('SearchResults', () => {
		const searching = boolean('searching', true);
		const hasMore = boolean('hasMore', false);

		return (
			<SearchResults
				searching={searching}
				hasMore={hasMore}
				searchResults={items}
				onAddFriend={action('onAddFriend')}
				onResultPress={action('onResultPress')}
				onLoadMore={action('onLoadMore')}
			/>
		);
	});
