import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {TextGradient} from '../../../../src/components/';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('TextGradient', () => (
		<TextGradient text={'This is some text'} colors={['red', 'blue']} style={{textAlign: 'center'}} />
	));
