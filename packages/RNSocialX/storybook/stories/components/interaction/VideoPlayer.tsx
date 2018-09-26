import {boolean, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {VideoPlayer} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const VIDEO_URL = 'https://clips.vorwaerts-gmbh.de/VfE_html5.mp4';

storiesOf('Components/interaction', module)
	.addDecorator(withKnobs)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('VideoPlayer', () => {
		const paused = boolean('paused', false);
		const muted = boolean('muted', false);
		const resizeToChangeAspectRatio = boolean('resizeToChangeAspectRatio', true);
		return (
			<VideoPlayer
				videoURL={VIDEO_URL}
				containerStyle={{
					width: '100%',
					height: 250,
				}}
				paused={paused}
				muted={muted}
				resizeMode={'cover'}
				thumbOnly={false}
				resizeToChangeAspectRatio={resizeToChangeAspectRatio}
			/>
		);
	})
	.add('VideoPlayer thumbnail', () => {
		return (
			<VideoPlayer
				videoURL={VIDEO_URL}
				containerStyle={{
					width: '100%',
					height: 250,
				}}
				resizeMode={'contain'}
				paused={true}
				thumbOnly={true}
				onPressVideo={() => console.log('onPressVideo, show full screen screen')}
			/>
		);
	});
