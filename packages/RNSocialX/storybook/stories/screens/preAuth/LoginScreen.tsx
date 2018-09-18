import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {LoginScreenView} from '../../../../src/screens/preAuth/LoginScreen.view';

storiesOf('Screens/preAuth', module).add('LoginScreen', () => {
	return (
		<LoginScreenView
			getText={(text) => text}
			onStartLogin={(...args: any[]) => console.log('onStartLogin', args)}
			onNavigateToPasswordForgot={(...args: any[]) => console.log('onNavigateToPasswordForgot', args)}
			onNavigateToRegister={(...args: any[]) => console.log('onNavigateToRegister', args)}
			onNavigateToUploadKey={(...args: any[]) => console.log('onNavigateToUploadKey', args)}
		/>
	);
});
