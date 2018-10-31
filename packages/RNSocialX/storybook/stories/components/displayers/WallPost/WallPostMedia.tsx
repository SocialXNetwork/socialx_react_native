import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { WallPostMedia } from '../../../../../src/components/displayers/WallPost';
import { getTextMock } from '../../../../../src/mocks';
import { MediaTypeImage } from '../../../../../src/types';
import CenterView from '../../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('WallPostMedia single photo', () => (
		<WallPostMedia
			onMediaObjectView={action('onMediaObjectView')}
			onLikeButtonPressed={action('onLikeButtonPressed')}
			mediaObjects={[
				{
					url: 'https://avatars2.githubusercontent.com/u/212',
					extension: 'jpg',
					hash: 'dadsdas',
					type: MediaTypeImage,
					size: 12315,
					numberOfLikes: 0,
					numberOfComments: 0,
				},
			]}
			getText={getTextMock}
		/>
	))
	.add('WallPostMedia dual photo', () => (
		<WallPostMedia
			onMediaObjectView={action('onMediaObjectView')}
			onLikeButtonPressed={action('onLikeButtonPressed')}
			mediaObjects={[
				{
					url: 'https://avatars2.githubusercontent.com/u/212',
					extension: 'jpg',
					hash: 'dadsdas',
					type: MediaTypeImage,
					size: 12315,
					numberOfLikes: 0,
					numberOfComments: 0,
				},
				{
					url: 'https://avatars2.githubusercontent.com/u/212',
					extension: 'jpg',
					hash: 'dadsdas',
					type: MediaTypeImage,
					size: 12315,
					numberOfLikes: 0,
					numberOfComments: 0,
				},
			]}
			getText={getTextMock}
		/>
	))
	.add('WallPostMedia 3+ photos', () => (
		<WallPostMedia
			onMediaObjectView={action('onMediaObjectView')}
			onLikeButtonPressed={action('onLikeButtonPressed')}
			mediaObjects={[
				{
					url: 'https://avatars2.githubusercontent.com/u/212',
					extension: 'jpg',
					hash: 'dadsdas',
					type: MediaTypeImage,
					size: 12315,
					numberOfLikes: 0,
					numberOfComments: 0,
				},
				{
					url: 'https://avatars2.githubusercontent.com/u/212',
					extension: 'jpg',
					hash: 'dadsdas',
					type: MediaTypeImage,
					size: 12315,
					numberOfLikes: 0,
					numberOfComments: 0,
				},
				{
					url: 'https://avatars2.githubusercontent.com/u/212',
					extension: 'jpg',
					hash: 'dadsdas',
					type: MediaTypeImage,
					size: 12315,
					numberOfLikes: 0,
					numberOfComments: 0,
				},
			]}
			getText={getTextMock}
		/>
	));
