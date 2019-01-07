import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { AvatarImage } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';
import Provider from '../../../helpers/Provider';

const image = 'QmeRnhzwARzbdU8bHXMvsbHuV4Jhs6HBBvAUdjCMQMup1m';

storiesOf('Components/avatar', module)
	.addDecorator((story) => (
		<Provider>
			<CenterView>{story()}</CenterView>
		</Provider>
	))
	.add('AvatarImage', () => (
		<AvatarImage image={image} style={{ width: 200, height: 200, borderRadius: 10 }} />
	));
