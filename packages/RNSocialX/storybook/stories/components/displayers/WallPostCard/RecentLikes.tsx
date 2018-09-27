import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { RecentLikes } from '../../../../../src/components/displayers/WallPostCard';
import { getTextMock } from '../../../../../src/mocks';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('RecentLikes 1 like', () => (
		<RecentLikes
			likes={[
				{
					userName: 'ionut11',
					userId: 'user11',
				},
			]}
			onUserPress={action('onUserPress')}
			getText={getTextMock}
		/>
	))
	.add('RecentLikes 2 likes', () => (
		<RecentLikes
			likes={[
				{
					userName: 'ionut11',
					userId: 'user11',
				},
				{
					userName: 'ionut22',
					userId: 'user22',
				},
			]}
			onUserPress={action('onUserPress')}
			getText={getTextMock}
		/>
	))
	.add('RecentLikes 3+ likes', () => (
		<RecentLikes
			likes={[
				{
					userName: 'ionut11',
					userId: 'user11',
				},
				{
					userName: 'ionut22',
					userId: 'user22',
				},
				{
					userName: 'ionut33',
					userId: 'user33',
				},
			]}
			onUserPress={action('onUserPress')}
			getText={getTextMock}
		/>
	));
