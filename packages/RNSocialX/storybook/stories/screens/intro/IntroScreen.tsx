import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { IntroScreenView } from '../../../../src/screens/intro/IntroScreen.view';

storiesOf('Screens/into', module).add('IntroScreen', () => {
	return (
		<IntroScreenView
			getText={getTextMock}
			doneButtonHandler={action('doneButtonHandler')}
			skipButtonHandler={action('skipButtonHandler')}
		/>
	);
});
