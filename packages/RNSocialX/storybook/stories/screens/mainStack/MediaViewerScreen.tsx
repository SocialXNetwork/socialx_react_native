import { action } from '@storybook/addon-actions';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { Dimensions } from 'react-native';

import { DeviceOrientations } from '../../../../src/environment/consts';
import { getTextMock } from '../../../../src/mocks';
import { MediaViewerScreenView } from '../../../../src/screens/mainStack/MediaViewerScreen.view';
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
		const infoVisible = boolean('infoVisible', false);

		return (
			<MediaViewerScreenView
				media={generateMedia(10)}
				startIndex={7}
				orientation={DeviceOrientations.Portrait}
				activeSlide={activeSlide}
				likeDisabled={true}
				likedByCurrentUser={false}
				infoVisible={infoVisible}
				canReact={true}
				viewport={{
					width: Dimensions.get('window').width,
				}}
				onExitFullScreen={action('onExitFullScreen')}
				onClose={action('onClose')}
				onCommentPress={action('onCommentPress')}
				onLikePress={action('onLikePress')}
				onChangeSlide={action('onChangeSlide')}
				onLayout={action('onLayout')}
				onShowInfo={action('onShowInfo')}
				onCloseInfo={action('onCloseInfo')}
				getText={getTextMock}
			/>
		);
	});
