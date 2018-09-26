import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { LaunchScreenView } from '../../../../src/screens/preAuth/LaunchScreen.view';

storiesOf('Screens/preAuth', module).add('LaunchScreen', () => {
	return (
		<LaunchScreenView
			getText={(text) => text}
			navigateToRegisterScreen={(...args: any[]) =>
				console.log('navigateToRegisterScreen', args)
			}
			navigateToLoginScreen={(...args: any[]) =>
				console.log('navigateToLoginScreen', args)
			}
		/>
	);
});
