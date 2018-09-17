import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Alert} from 'react-native';

import {ButtonSizes, PrimaryButton} from '../../../../src/components';
import {Colors} from '../../../../src/environment/theme';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/interaction', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('PrimaryButton', () => (
		// @ts-ignore
		<PrimaryButton
			label={'Button (Surprising, I know)'}
			disabled={false}
			onPress={() => Alert.alert('Pressed!')}
			size={ButtonSizes.Normal}
			autoWidth={true}
			borderColor={Colors.pink}
			textColor={Colors.pink}
			loading={false}
			containerStyle={{backgroundColor: Colors.transparent, borderRadius: 10}}
		/>
	));
