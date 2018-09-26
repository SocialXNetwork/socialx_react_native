import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { VideoPlayer } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const VIDEO_URL =
	'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_5mb.mp4';

storiesOf('Components/interaction', module)
	.addDecorator(withKnobs)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('VideoPlayer', () => {
		const paused = boolean('paused', true);
		const muted = boolean('muted', false);
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
				onPressVideo={action('onPressVideo')}
				onMuteVideo={action('onMuteVideo')}
				onUpdateResizeMode={action('onUpdateResizeMode')}
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
				onPressVideo={action('onPressVideo')}
			/>
		);
	});
