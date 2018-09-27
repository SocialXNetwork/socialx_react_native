import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { ReferralScreenView } from '../../../../src/screens/myProfile/ReferralScreen.view';

storiesOf('Screens/myProfile', module).add('ReferralScreen', () => (
	<ReferralScreenView
		referrals="18"
		socx="13,048"
		code="5H91BGD34"
		url="http://www.lorem.ipsum.com"
		onShare={async () => action('onShare')}
		copyToClipboard={action('copyToClipboard')}
		onGoBack={action('onGoBack')}
	/>
));
