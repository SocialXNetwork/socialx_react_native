import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { AvatarImage } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const image = 'https://www.w3schools.com/w3css/img_lights.jpg';

storiesOf('Components/avatar', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('AvatarImage', () => (
		<AvatarImage image={image} style={{ width: 200, height: 200, borderRadius: 10 }} />
	));
