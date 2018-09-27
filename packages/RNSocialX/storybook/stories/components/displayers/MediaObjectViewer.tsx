import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { MediaObjectViewer } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

const image = 'https://clips.vorwaerts-gmbh.de/VfE_html5.mp4';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('MediaObjectViewer', () => (
		<MediaObjectViewer
			extension={'mp4'}
			uri={image}
			style={{ width: 300, height: 300 }}
			resizeMode={'contain'}
			getText={getTextMock}
		/>
	));
