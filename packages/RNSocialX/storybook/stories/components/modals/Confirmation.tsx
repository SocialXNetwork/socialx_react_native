import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { Confirmation } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/modals', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('Confirmation', () => {
		const visible = boolean('visible', true);

		return (
			<Confirmation
				confirmActive={visible}
				title="Delete"
				message="Are you sure you want to delete?"
				confirmButton="Yes"
				cancelButton="No"
				onConfirm={action('Confirm!')}
				onDecline={action('Cancel!')}
			/>
		);
	});
