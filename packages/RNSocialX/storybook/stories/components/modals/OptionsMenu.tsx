import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { OptionsMenu } from '../../../../src/components';

storiesOf('Components/modals', module)
	.addDecorator(withKnobs)
	.add('OptionsMenu', () => {
		const visible = boolean('visible', true);
		const menuItems = [
			{
				label: 'Test item 1',
				icon: 'ios-settings',
				actionHandler: action('Test item 1'),
			},
			{
				label: 'Test item 2',
				icon: 'ios-boat',
				actionHandler: action('Test item 2'),
			},
			{
				label: 'Test item 3',
				icon: 'logo-ionic',
				actionHandler: action('Test item 3'),
			},
		];
		return (
			<OptionsMenu
				visible={visible}
				items={menuItems}
				onBackdropPress={action('onBackdropPress')}
			/>
		);
	});
