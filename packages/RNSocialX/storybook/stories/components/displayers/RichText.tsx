// TODO: @Ionut, please check this one

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { RichText } from '../../../../src/components/';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('RichText', () => {
		return (
			// @ts-ignore
			<RichText onPress={action('Pressed')} style={{ textAlign: 'center' }} />
		);
	});
