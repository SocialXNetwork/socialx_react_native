import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { RecentLikes } from '../../../../../src/components/displayers/WallPost';
import { getTextMock } from '../../../../../src/mocks';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('RecentLikes 1 like', () => (
		<RecentLikes
			recentLikes={{
				first: 'alex1',
				second: null,
				total: 1,
			}}
			onUserPress={action('onUserPress')}
			getText={getTextMock}
		/>
	))
	.add('RecentLikes 2 likes', () => (
		<RecentLikes
			recentLikes={{
				first: 'alex1',
				second: 'alex2',
				total: 2,
			}}
			onUserPress={action('onUserPress')}
			getText={getTextMock}
		/>
	))
	.add('RecentLikes 3+ likes', () => (
		<RecentLikes
			recentLikes={{
				first: 'alex1',
				second: 'alex2',
				total: 3,
			}}
			onUserPress={action('onUserPress')}
			getText={getTextMock}
		/>
	));
