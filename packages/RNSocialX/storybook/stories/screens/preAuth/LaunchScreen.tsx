import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {LaunchScreenView} from '../../../../src/screens/preAuth/LaunchScreen.view';

storiesOf('Screens/preAuth', module).add('LaunchScreen', () => {
	return (
		<LaunchScreenView
			getText={(text) => text}
			navigateToSignUpScreen={(...args: any[]) => console.log('navigateToSignUpScreen', args)}
			navigateToLoginScreen={(...args: any[]) => console.log('navigateToLoginScreen', args)}
		/>
	);
});
