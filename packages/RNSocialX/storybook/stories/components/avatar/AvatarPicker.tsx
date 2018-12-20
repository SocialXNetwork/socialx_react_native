import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { AvatarPicker } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';
import Provider from '../../../helpers/Provider';

const image = 'QmeRnhzwARzbdU8bHXMvsbHuV4Jhs6HBBvAUdjCMQMup1m';

storiesOf('Components/avatar', module)
	.addDecorator((getStory: any) => (
		<Provider>
			<CenterView>{getStory()}</CenterView>
		</Provider>
	))
	.add('AvatarPicker', () => (
		<AvatarPicker
			image={image}
			hash={true}
			afterImagePick={action('afterImagePick')}
			showOptionsMenu={action('showOptionsMenu')}
			getText={getTextMock}
		/>
	));
