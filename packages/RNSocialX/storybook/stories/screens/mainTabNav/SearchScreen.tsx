import {action} from '@storybook/addon-actions';
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

storiesOf('Screens/mainTabNav', module).add('SearchScreen', () => (
	<SearchScreenView
		searching={false}
		onAddFriend={action('onAddFriend')}
		searchResults={items}
		onResultPress={action('onResultPress')}
		onLoadMoreResults={action('onLoadMoreResults')}
		hasMoreResults={false}
		// @ts-ignore
		navigation={null}
	/>
));
