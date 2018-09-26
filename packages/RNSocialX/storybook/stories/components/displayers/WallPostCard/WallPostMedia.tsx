import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { WallPostMedia } from '../../../../../src/components/displayers/WallPostCard';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('WallPostMedia single photo', () => (
		// @ts-ignore
		<WallPostMedia
			onMediaObjectView={action('onMediaObjectView')}
			noInteraction={false}
			onLikeButtonPressed={action('onLikeButtonPressed')}
			// @ts-ignore
			mediaObjects={[
				{
					url: 'https://avatars2.githubusercontent.com/u/212',
					extension: 'jpg',
				},
			]}
		/>
	))
	.add('WallPostMedia dual photo', () => (
		// @ts-ignore
		<WallPostMedia
			onMediaObjectView={action('onMediaObjectView')}
			noInteraction={false}
			// @ts-ignore
			mediaObjects={[
				{
					url: 'https://avatars2.githubusercontent.com/u/212',
					extension: 'jpg',
				},
				{
					url: 'https://avatars2.githubusercontent.com/u/213',
					extension: 'jpg',
				},
			]}
		/>
	))
	.add('WallPostMedia 3+ photos', () => (
		// @ts-ignore
		<WallPostMedia
			onMediaObjectView={action('onMediaObjectView')}
			noInteraction={false}
			// @ts-ignore
			mediaObjects={[
				{
					url: 'https://avatars2.githubusercontent.com/u/212',
					extension: 'jpg',
				},
				{
					url: 'https://avatars2.githubusercontent.com/u/214',
					extension: 'jpg',
				},
				{
					url: 'https://avatars2.githubusercontent.com/u/213',
					extension: 'jpg',
				},
				{
					url: 'https://avatars2.githubusercontent.com/u/215',
					extension: 'jpg',
				},
			]}
		/>
	));
