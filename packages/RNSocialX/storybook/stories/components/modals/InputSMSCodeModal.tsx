import {action} from '@storybook/addon-actions';
import {boolean, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {InputSMSCodeModal} from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/modals', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('InputSMSCodeModal', () => {
		const visible = boolean('visible', false);

		return (
			<InputSMSCodeModal
				visible={visible}
				phoneNumber={'0749 274 064'}
				errorMessage={null}
				resendingCode={false}
				confirmHandler={action('Confirm!')}
				declineHandler={action('Decline')}
				resendHandler={action('Resend!')}
				getText={(text) => text}
				marginBottom={120}
			/>
		);
	});
