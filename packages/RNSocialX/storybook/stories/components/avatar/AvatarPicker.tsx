import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { AvatarPicker } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const image =
	'https://cariera.ejobs.ro/wp-content/uploads/2013/11/avatar-placeholder-300x284.png';

storiesOf('Components/avatar', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('AvatarPicker', () => (
		<AvatarPicker
			avatarImage={image}
			afterImagePick={() => {
				/**/
			}}
			avatarSize={200}
			getText={(text) => text}
		/>
	));
