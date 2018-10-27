import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { DotsMenuButton } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('DotsMenuButton', () => (
		<DotsMenuButton iconColor="black" iconName="ios-more" onPress={action('onPress')} />
	));
