import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { IconButton } from '../../../../src/components';
import { Colors } from '../../../../src/environment/theme';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('IconButton', () => (
		<IconButton
			label="Button (Surprising, I know)"
			onPress={action('Pressed!')}
			iconType="io"
			iconSource="ios-add-circle"
			iconStyle={{ fontSize: 25, color: Colors.pink }}
			textStyle={{ color: Colors.pink }}
			containerStyle={{
				borderRadius: 5,
				borderWidth: 1,
				borderColor: Colors.pink,
			}}
		/>
	));
