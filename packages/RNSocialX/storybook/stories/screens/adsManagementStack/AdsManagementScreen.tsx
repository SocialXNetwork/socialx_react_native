import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { AdsManagementScreenView } from '../../../../src/screens/adsManagementStack/AdsManagementScreen.view';

storiesOf('Screens/adsManagementStack', module).add('AdsManagementScreen', () => {
	return (
		<AdsManagementScreenView
			onGoBack={action('onGoBack')}
			avatarURL="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png"
			fullName="Alex Sirbu"
			userName="alexsirbu"
			getText={getTextMock}
		/>
	);
});
