import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { PrimaryTextInput, TKeyboardKeys, TRKeyboardKeys } from '../../../../src/components';
import { Colors } from '../../../../src/environment/theme';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/inputs', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('PrimaryTextInput', () => (
		<PrimaryTextInput
			onChangeText={action('onChangeText')}
			placeholder="Sample input"
			placeholderColor={Colors.green}
			returnKeyType={TRKeyboardKeys.next}
			keyboardType={TKeyboardKeys.emailAddress}
			value="Test 123"
		/>
	));
