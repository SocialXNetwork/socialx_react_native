import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { AdsManagementOverviewScreenView } from '../../../../src/screens/adsManagementStack/AdsManagementOverviewScreen.view';

const mockAdCards = [
	{
		url: 'https://placeimg.com/300/300/any',
		title: 'Lorem ipsum dolor 1',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipi. And some more text on first paragraph\n' +
			'Elit, sed do eiusmod tempor incididunt ut labore',
		id: '1',
	},
	{
		url: 'https://placeimg.com/301/301/any',
		title: 'Using SOCX within our Ecosystem',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipi.\n' +
			'Second line text goes here',
		id: '2',
	},
	{
		url: 'https://placeimg.com/302/302/any',
		title: 'Lorem ipsum dolor 2',
		description: 'Our token will allow you to interact within your friends.',
		id: '3',
	},
];

const spentValues = [
	{
		value: 12,
		date: new Date(2018, 3, 10),
	},
	{
		value: 13,
		date: new Date(2018, 3, 11),
	},
	{
		value: 11,
		date: new Date(2018, 3, 12),
	},
	{
		value: 16,
		date: new Date(2018, 3, 13),
	},
	{
		value: 9,
		date: new Date(2018, 3, 14),
	},
	{
		value: 3,
		date: new Date(2018, 3, 15),
	},
	{
		value: 17,
		date: new Date(2018, 3, 16),
	},
];

storiesOf('Screens/adsManagementStack', module).add(
	'AdsManagementOverviewScreen',
	() => {
		return (
			<AdsManagementOverviewScreenView
				spentValues={spentValues}
				impressionsValues={spentValues}
				peopleReachedValues={spentValues}
				currentWeek={'Mar 10, 2018 - Mar 16,2018'}
				currentDate={'Mar 17, 2018'}
				ads={mockAdCards}
				getText={getTextMock}
				onClose={action('onClose')}
				onCreateAd={action('onCreateAd')}
				onEditAd={action('onEditAd')}
				onSeePastPerformance={action('onSeePastPerformance')}
				lastSevenDays={'Mar 10, 2018 - Mar 16,2018'}
			/>
		);
	},
);
