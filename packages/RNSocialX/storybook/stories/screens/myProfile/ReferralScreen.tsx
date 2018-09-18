import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {ReferralScreenView} from '../../../../src/screens/myProfile/ReferralScreen.view';

storiesOf('Screens/myProfile', module).add('ReferralScreen', () => (
	<ReferralScreenView onShare={action('onShare')} copyToClipboard={action('copyToClipboard')} />
));
