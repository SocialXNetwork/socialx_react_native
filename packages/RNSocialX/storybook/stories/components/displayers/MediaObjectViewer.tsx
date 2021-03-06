import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { MediaObjectViewer } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const image = 'https://clips.vorwaerts-gmbh.de/VfE_html5.mp4';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('MediaObjectViewer', () => (
		<MediaObjectViewer
			hash={image}
			extension="mp4"
			resizeMode="contain"
			style={{ width: 300, height: 300 }}
		/>
	));
