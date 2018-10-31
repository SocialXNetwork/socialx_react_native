import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { LoginScreenView } from '../../../../src/screens/preAuth/LoginScreen.view';

storiesOf('Screens/preAuth', module).add('LoginScreen', () => {
	return (
		<LoginScreenView
			errors={[]}
			onLogin={action('onLogin')}
			onNavigateToPasswordForgot={action('onNavigateToPasswordForgot')}
			onNavigateToRegister={action('onNavigateToRegister')}
			onNavigateToUploadKey={action('onNavigateToUploadKey')}
			onGoBack={action('onGoBack')}
			getText={getTextMock}
		/>
	);
});
