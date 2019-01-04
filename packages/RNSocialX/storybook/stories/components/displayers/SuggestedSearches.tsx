import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SuggestedSearches } from '../../../../src/components/';
import { getTextMock } from '../../../../src/mocks';

const suggestions: string[] = [];

storiesOf('Components/displayers', module).add('SuggestedSearches', () => (
	<SuggestedSearches
		suggestions={suggestions}
		onResultPress={action('onResultPress')}
		getText={getTextMock}
	/>
));
