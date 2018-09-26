import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { RegisterScreenView } from '../../../../src/screens/preAuth/RegisterScreen.view';

storiesOf('Screens/preAuth', module)
	.addDecorator(withKnobs)
	.add('RegisterScreen', () => {
		const showModalForSMSCode = boolean('showModalForSMSCode', false);
		const resendingCode = boolean('resendingCode', false);

		return (
			<RegisterScreenView
				showModalForSMSCode={showModalForSMSCode}
				smsCodeErrorMessage={'Error'}
				resendingCode={resendingCode}
				onSmsCodeConfirmed={action('onSmsCodeConfirmed')}
				onSmsCodeDeclined={action('onSmsCodeDeclined')}
				onSmsCodeResend={action('onSmsCodeResend')}
				onStartRegister={action('onStartRegister')}
				onAlreadyHaveCode={action('onAlreadyHaveCode')}
				onNavigateToTermsAndConditions={action('onNavigateToTermsAndCond')}
				onGoBack={action('onGoBack')}
				getText={(value) => value}
			/>
		);
	});
