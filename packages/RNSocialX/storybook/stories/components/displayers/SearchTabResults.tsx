import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SearchTabResults } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import { FRIEND_TYPES, IUserEntry } from '../../../../src/types';
import CenterView from '../../../helpers/CenterView';

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
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('SearchTabResults', () => {
		const searchTermValue = text('searchTermValue', '');
		const searching = boolean('searching', false);
		const hasMoreResults = boolean('hasMoreResults', false);
		return (
			<SearchTabResults
				getText={getTextMock}
				searching={searching}
				searchResults={items}
				suggestions={items}
				searchTermValue={searchTermValue}
				hasMoreResults={hasMoreResults}
				searchForMoreResults={action('searchForMoreResults')}
				onResultPress={action('onResultPress')}
				// @ts-ignore
				navigation={null}
			/>
		);
	});
