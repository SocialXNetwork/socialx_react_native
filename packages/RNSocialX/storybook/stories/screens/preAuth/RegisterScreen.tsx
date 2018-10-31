import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { RegisterScreenView } from '../../../../src/screens/preAuth/RegisterScreen.view';

storiesOf('Screens/preAuth', module)
	.addDecorator(withKnobs)
	.add('RegisterScreen', () => (
		<RegisterScreenView
			onNavigateToTermsAndConditions={action('onNavigateToTermsAndCond')}
			onGoBack={action('onGoBack')}
			onRegister={action('onRegister')}
			showOptionsMenu={action('showOptionsMenu')}
			getText={getTextMock}
		/>
	));
