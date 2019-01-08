import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { currentUser, getTextMock } from '../../../../src/mocks';
import { SettingsScreenView } from '../../../../src/screens/myProfile/SettingsScreen.view';

storiesOf('Screens/myProfile', module).add('SettingsScreen', () => {
	return (
		<SettingsScreenView
			currentUser={currentUser}
			showOptionsMenu={action('showOptionsMenu')}
			onEditNodes={action('onEditNodes')}
			onSaveChanges={action('onSaveChanges')}
			onGoBack={action('onGoBack')}
			getText={getTextMock}
		/>
	);
});
