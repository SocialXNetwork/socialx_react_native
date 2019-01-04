import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SearchResults } from '../../../../src/components/';
import { getTextMock } from '../../../../src/mocks';

const items: string[] = [];

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.add('SearchResults', () => {
		const searching = boolean('searching', false);
		const term = text('term', '');

		return (
			<SearchResults
				results={items}
				term={term}
				searching={searching}
				onResultPress={action('onResultPress')}
				getText={getTextMock}
			/>
		);
	});
