import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { CheckboxButtonWithIcon } from '../../../../src/components';
import { Icons } from '../../../../src/environment/theme';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('CheckboxButtonWithIcon', () => (
		<CheckboxButtonWithIcon
			selected={true}
			onPress={() => {
				/**/
			}}
			iconSource={Icons.iconLocationPin}
			text={'Location'}
		/>
	));
