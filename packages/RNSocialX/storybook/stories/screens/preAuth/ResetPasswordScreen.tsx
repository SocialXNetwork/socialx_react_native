import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { ResetPasswordScreenView } from '../../../../src/screens/preAuth/ResetPasswordScreen.view';

storiesOf('Screens/preAuth', module).add('ResetPasswordScreen', () => {
	return (
		<ResetPasswordScreenView
			onSetNewPassword={action('onSetNewPassword')}
			onGoBack={action('onGoBack')}
			getText={(value) => value}
		/>
	);
});
