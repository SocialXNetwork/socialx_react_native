import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { ConfirmationModal } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/modals', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('ConfirmationModal', () => {
		const visible = boolean('visible', false);

		return (
			<ConfirmationModal
				confirmActive={visible}
				title={'Delete'}
				message={'Are you sure you want to delete?'}
				confirmButton={'Yes'}
				cancelButton={'No'}
				confirmHandler={action('Confirm!')}
				declineHandler={action('Cancel!')}
				getText={(text) => text}
			/>
		);
	});
