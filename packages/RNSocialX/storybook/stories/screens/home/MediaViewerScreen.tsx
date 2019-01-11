import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { MediaViewerScreenView } from '../../../../src/screens/home/MediaViewerScreen.view';
import { MediaTypeImage } from '../../../../src/types';

const generateMedia = (limit: number) =>
	new Array(limit).fill(0).map(() => ({
		url: `https://placeimg.com/${Math.round(Math.random() * 200 + 200)}/${Math.round(
			Math.random() * 150 + 200,
		)}/any`,
		hash: 'q89235y7jfa' + Math.random(),
		type: MediaTypeImage,
		extension: 'jpg',
		size: Math.round(Math.random() * 9999999),
		numberOfLikes: Math.round(Math.random() * 100),
		numberOfComments: Math.round(Math.random() * 10),
	}));

storiesOf('Screens/mainStack', module)
	.addDecorator(withKnobs)
	.add('MediaViewerScreen', () => {
		const activeSlide = number('activeSlide', 5);

		return (
			<MediaViewerScreenView
				media={generateMedia(10)}
				startIndex={7}
				activeSlide={activeSlide}
				likedByCurrentUser={false}
				isInfoVisible={false}
				isOverlayVisible={false}
				defaultScale={true}
				opacity={1}
				onImagePress={action('onImagePress')}
				onExit={action('onExit')}
				onMove={action('onMove')}
				onCommentPress={action('onCommentPress')}
				onLikePress={action('onLikePress')}
				onChangeSlide={action('onChangeSlide')}
				onShowInfo={action('onShowInfo')}
				onCloseInfo={action('onCloseInfo')}
				getText={getTextMock}
			/>
		);
	});
