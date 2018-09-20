import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {ForgotPasswordScreenView} from '../../../../src/screens/preAuth/ForgotPasswordScreen.view';

storiesOf('Screens/preAuth', module).add('ForgotPasswordScreen', () => {
	return (
		<ForgotPasswordScreenView
			getText={(text) => text}
			onSendResetCode={action('onSendResetCode')}
			onGoBack={action('onGoBack')}
		/>
	);
});
