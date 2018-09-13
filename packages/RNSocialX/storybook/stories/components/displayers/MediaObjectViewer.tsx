import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {MediaObjectViewer} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const image = 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('MediaObjectViewer', () => (
		// @ts-ignore
		<MediaObjectViewer uri={image} style={{width: 300, height: 300}} resizeMode={'contain'} />
	));
