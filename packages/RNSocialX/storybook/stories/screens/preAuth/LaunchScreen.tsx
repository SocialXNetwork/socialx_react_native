import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { LaunchScreenView } from '../../../../src/screens/preAuth/LaunchScreen.view';

storiesOf('Screens/preAuth', module).add('LaunchScreen', () => {
	return (
		<LaunchScreenView
			getText={getTextMock}
			navigateToRegisterScreen={action('navigateToRegisterScreen')}
			navigateToLoginScreen={action('navigateToLoginScreen')}
		/>
	);
});
