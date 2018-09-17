import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Alert} from 'react-native';

import {VideoPlayer} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const video = 'http://techslides.com/demos/sample-videos/small.mp4';

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('VideoPlayer', () => <VideoPlayer videoURL={video} />);
