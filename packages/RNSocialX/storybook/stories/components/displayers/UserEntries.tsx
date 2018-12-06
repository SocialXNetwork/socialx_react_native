import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { UserEntries } from '../../../../src/components/';

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.add('UserEntries', () => {
		const hasMore = boolean('hasMore', true);

		return (
			<UserEntries
				aliases={['alias1', 'alias2']}
				hasMore={hasMore}
				onEntryPress={action('onEntryPress')}
				onLoadMore={action('onLoadMore')}
			/>
		);
	});
