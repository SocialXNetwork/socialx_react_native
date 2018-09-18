import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {IntroScreenView} from '../../../../src/screens/intro/IntroScreen.view';

storiesOf('Screens/into', module).add('IntroScreen', () => {
	return (
		<IntroScreenView
			getText={(text) => text}
			doneButtonHandler={(...args: any[]) => console.log('doneButtonHandler', args)}
			skipButtonHandler={(...args: any[]) => console.log('skipButtonHandler', args)}
		/>
	);
});
