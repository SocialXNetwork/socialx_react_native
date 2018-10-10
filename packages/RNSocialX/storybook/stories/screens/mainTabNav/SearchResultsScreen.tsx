import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { SearchResultsScreenView } from '../../../../src/screens/mainTabNav/SearchScreen/SearchResultsScreen.view';

storiesOf('Screens/mainTabNav', module).add('SearchResultsScreen', () => (
	<SearchResultsScreenView
		// @ts-ignore
		navigation={null}
		getText={getTextMock}
	/>
));
