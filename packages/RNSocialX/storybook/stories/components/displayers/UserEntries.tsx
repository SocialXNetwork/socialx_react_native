import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { UserEntries } from '../../../../src/components/';

storiesOf('Components/displayers', module).add('UserEntries', () => {
	return <UserEntries aliases={['alias1', 'alias2']} onEntryPress={action('onEntryPress')} />;
});
