import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { View } from 'react-native';

import { SuggestionsCarousel } from '../../../../src/components';
import { SearchResultKind } from '../../../../src/types';
import CenterView from '../../../helpers/CenterView';

const MOCK_SUGGESTED = [
	{
		userId: '101',
		fullName: 'test user 1',
		userName: 'testname',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '102',
		fullName: 'test user 2',
		userName: 'testname',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
	{
		userId: '103',
		fullName: 'test user 3',
		userName: 'testname',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '104',
		fullName: 'test user 4',
		userName: 'testname',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '105',
		fullName: 'test user 5',
		userName: 'testname',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
	{
		userId: '106',
		fullName: 'test user 6',
		userName: 'testname',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
];

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('SuggestionsCarousel', () => (
		<View style={{ height: 325 }}>
			<SuggestionsCarousel
				items={MOCK_SUGGESTED.map((mockData) => ({
					...mockData,
					relationship: SearchResultKind.Friend,
				}))}
				getText={(text) => text}
			/>
		</View>
	));
