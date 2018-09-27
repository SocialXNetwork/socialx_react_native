import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { MaintenanceScreenView } from '../../../../src/screens/primaryNav/MaintenanceScreen.view';

storiesOf('Screens/primaryNav', module).add('MaintenanceScreen', () => {
	return <MaintenanceScreenView getText={getTextMock} />;
});
