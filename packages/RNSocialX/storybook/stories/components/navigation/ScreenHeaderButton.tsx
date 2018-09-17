import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Alert} from 'react-native';

import {ScreenHeaderButton} from '../../../../src/components';
import {Colors} from '../../../../src/environment/theme';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/navigation', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('ScreenHeaderButton', () => (
		// @ts-ignore
		<ScreenHeaderButton
			onPress={() => Alert.alert('Pressed!')}
			iconName={'ios-add-circle'}
			iconSize={50}
			iconColor={Colors.pink}
		/>
	));
