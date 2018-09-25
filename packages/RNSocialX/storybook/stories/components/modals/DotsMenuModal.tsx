import {boolean, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {DotsMenuModal} from '../../../../src/components';

storiesOf('Components/modals', module)
	.addDecorator(withKnobs)
	.add('DotsMenuModal', () => {
		const visible = boolean('visible', true);
		const menuItems = [
			{
				label: 'Test item 1',
				icon: 'ios-settings',
				actionHandler: () => console.log('Test item 1'),
			},
			{
				label: 'Test item 2',
				icon: 'ios-boat',
				actionHandler: () => console.log('Test item 2'),
			},
			{
				label: 'Test item 3',
				icon: 'logo-ionic',
				actionHandler: () => console.log('Test item 3'),
			},
		];
		return <DotsMenuModal visible={visible} items={menuItems} onBackdropPress={() => console.log('onBackdropPress')} />;
	});
