import {action} from '@storybook/addon-actions';
import {boolean, text, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {SearchScreenView} from '../../../../src/screens/mainTabNav/SearchScreen/SearchScreen.view';
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

storiesOf('Screens/mainTabNav', module)
	.addDecorator(withKnobs)
	.add('SearchScreen', () => {
		const searchTermValue = text('searchTermValue', '');
		const searching = boolean('searching', false);
		const hasMoreResults = boolean('hasMoreResults', false);
		return (
			<SearchScreenView
				searching={searching}
				onAddFriend={action('onAddFriend')}
				searchResults={items}
				suggestions={items}
				searchTermValue={searchTermValue}
				onSearchTermChange={action('onSearchTermChange')}
				onResultPress={action('onResultPress')}
				onLoadMoreResults={action('onLoadMoreResults')}
				hasMoreResults={hasMoreResults}
				// @ts-ignore
				navigation={null}
			/>
		);
	});
