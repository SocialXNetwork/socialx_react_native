import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {ForgotPasswordScreenView} from '../../../../src/screens/preAuth/ForgotPasswordScreen.view';

storiesOf('Screens/preAuth', module).add('ForgotPasswordScreen', () => {
	return (
		<ForgotPasswordScreenView
			getText={(text) => text}
			onSendResetCode={(...args: any[]) => console.log('onSendResetCode', args)}
		/>
	);
});
