import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { AvatarPicker } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

const image = 'https://cariera.ejobs.ro/wp-content/uploads/2013/11/avatar-placeholder-300x284.png';

storiesOf('Components/avatar', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('AvatarPicker', () => (
		<AvatarPicker
			image={image}
			afterImagePick={action('afterImagePick')}
			showOptionsMenu={action('showOptionsMenu')}
			getText={getTextMock}
		/>
	));
