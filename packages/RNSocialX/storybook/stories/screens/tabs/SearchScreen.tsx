import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { SearchScreenView } from '../../../../src/screens/tabs/SearchScreen/SearchScreen.view';

storiesOf('Screens/mainTabNav', module)
	.addDecorator(withKnobs)
	.add('SearchScreenView', () => {
		const searching = boolean('searching', false);
		const hasMoreResults = boolean('hasMoreResults', false);
		const items: string[] = [];

		return (
			<SearchScreenView
				loadedTabs={[0, 1, 2, 3]}
				searchTermValue=""
				results={items}
				suggestions={items}
				searching={searching}
				hasMoreResults={hasMoreResults}
				onResultPress={action('onResultPress')}
				onTabIndexChanged={action('onTabIndexChanged')}
				onSearchTermChange={action('onSearchTermChange')}
				searchForMoreResults={action('searchForMoreResults')}
				addFriend={action('addFriend')}
				// @ts-ignore
				navigation={null}
				setNavigationParams={() => undefined}
				getText={getTextMock}
			/>
		);
	});
